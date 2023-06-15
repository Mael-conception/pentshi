import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'
import colors from '../../styles/colors';
import { Ionicons, Feather } from '@expo/vector-icons';
import getBlobFromUri from '../documents/getBlobFromUri';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function ScanScreen({ navigation }) {
    
    const [scannedImage, setScannedImage] = useState([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [URLs, setURLs] = React.useState([]);
    const [error, setError] = React.useState(null);
    const storage = getStorage();

    const scanDocument = async () => {
        const { scannedImages } = await DocumentScanner.scanDocument()

        if (scannedImages.length > 0) {
            setScannedImage(scannedImages)
            console.log(' ==> ' + scannedImages);
        }
    }

    const handleCloudImageUpload = () => {
        const promises = []

        setIsUploading(true)
        scannedImage.map(async (file) => {
            console.log('loop');

            const blob = await getBlobFromUri(file);
            const storageRef = ref(storage, `/documents/${+ new Date().getTime()}`);

            const uploadTask = uploadBytesResumable(storageRef, blob);

            promises.push(uploadTask)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                (error) => setError(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setURLs(prevState => [...prevState, downloadURLs])
                        console.log("File available at", downloadURLs);
                    });
                }
            );
        })
        Promise.all(promises)
            .then(() => {
                console.log('All images uploaded');
                setIsUploading(false);
                navigation.navigate("FileInfos", { url: URLs, fileType: 'images' });
            })
            .then(err => setError(error))
    }


    return (
        <View style={styles.container}>

            {error && <Text style={styles.textError}> Une erreur a ete rencontrer: {error}</Text>}

            {isUploading && (
                <View style={styles.uploadProgressContainer}>
                    <Text> Chargement {progress} / 100% </Text>
                </View>
            )}

            {scannedImage.length == 0 && (
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                        scanDocument()
                    }}
                >
                    <Text style={styles.actionText}>
                        Commencer a scanner
                        <Ionicons name="md-reload" size={24} color={colors.white} />
                    </Text>
                </TouchableOpacity>
            )}

            {scannedImage.length > 0 && (
                <>
                    <Text style={styles.textInfo}>
                        Vous avez scanner {scannedImage.length} images
                    </Text>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => {
                            handleCloudImageUpload()
                        }}
                    >
                        {isUploading && <ActivityIndicator color={colors.white} size={'small'} />}
                        {!isUploading && (
                            <Text style={styles.actionText}>
                                Envoyer au serveur
                                <Feather
                                    name="upload-cloud"
                                    size={30}
                                    color={colors.white}
                                />
                            </Text>
                        )}
                    </TouchableOpacity>
                </>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtn: {
        padding: 10,
        backgroundColor: colors.chamoisee,
        borderRadius: 5,
    },
    actionText: {
        fontSize: 25,
        fontWeight: '800',
        color: colors.white,
    },
    textInfo: {
        color: colors.gunmetal,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textError: {
        color: colors.warning,
        marginVertical: 10,
        fontSize: 15,
        flexWrap: 'wrap'
    }
});
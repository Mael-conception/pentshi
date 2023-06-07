import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import colors from "../../styles/colors";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage"

export default function UploadFile({ navigation, route }) {
    const { fileType } = route.params;
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [percent, setPercent] = useState(0);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const storage = getStorage();

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: fileType });
        console.log(result);

        if (result.type == "success") {
            result.path = result.uri;
            setFile(result);
        }
    };

    uploadToCloud = () => {
        const storageRef = ref(storage, `/documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file.uri);

        setUploadInProgress(true);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setUrl(url);
                });
            }
        );
        setUploadInProgress(false);
        navigation.navigate("FileInfos", { url, fileType });
    }

    if (file === null) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                        pickDocument()
                    }}
                >
                    <Feather name="upload" size={100} color={colors.chamoisee} />
                    <Text style={styles.actionText}>Choisir le fichier</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (file) {
        return (
            <View style={styles.container}>
                <Ionicons name="md-cloud-upload-outline" size={100} color={colors.gunmetal} />
                <Text style={styles.fileName}>
                    {file.name}
                </Text>

                {
                    uploadInProgress ? (
                        <>
                            <ActivityIndicator size={'large'} color={colors.chamoisee} />
                            <Text style={styles.fileName}>{percent}</Text>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => {
                                uploadToCloud()
                            }}
                        >
                            <Text style={styles.uploadText}>Continuer</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    actionText: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 5,
        color: colors.chamoisee
    },
    fileName: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 5,
        color: colors.gunmetal
    },
    uploadBtn: {
        backgroundColor: colors.chamoisee,
        height: 50,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 5
    },
    uploadText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white
    },
});
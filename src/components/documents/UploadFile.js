import React, { useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import colors from "../../styles/colors";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import manageFileUpload from "./manageFileUpload";
import getBlobFromUri from "./getBlobFromUri";

export default function UploadFile({ navigation, route }) {
    const { fileType } = route.params;
    const [file, setFile] = useState(null);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const storage = getStorage();

    const [isUploading, setIsUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [remoteURL, setRemoteURL] = React.useState("");
    const [error, setError] = React.useState(null);

    const { width } = useWindowDimensions();

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: fileType });
        console.log(result);

        if (result.type == "success") {
            setFile(result);
        }
    };

    uploadToCloud = () => {

        const storageRef = ref(storage, `/documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, result);

        setUploadInProgress(true);
        uploadTask.on(
            "state_changed",
            null,
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('url', url);
                    setUploadInProgress(false);
                    navigation.navigate("FileInfos", { url, fileType });
                });
            }
        );
    }

    const onStart = () => {
        setIsUploading(true);
    };

    const onProgress = (progress) => {
        setProgress(progress);
    };
    const onComplete = (url) => {
        setRemoteURL(url);
        setIsUploading(false);
        navigation.navigate("FileInfos", { url, fileType });
    };

    const onFail = (error) => {
        setError(error);
        setIsUploading(false);
    };

    const handleCloudImageUpload = async () => {
        if (!file) return;

        let fileToUpload = null;

        const blob = await getBlobFromUri(file.uri);

        await manageFileUpload(blob, fileType, file, { onStart, onProgress, onComplete, onFail });
    };

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
                <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
                <Ionicons name="md-cloud-upload-outline" size={100} color={colors.gunmetal} />
                <Text style={styles.fileName}>
                    {file.name}
                </Text>

                {isUploading && (
                    <View style={styles.uploadProgressContainer}>
                        <Text> Chargement {progress} sur 100% </Text>
                    </View>
                )}

                {Boolean(file) && (
                    <TouchableOpacity
                        style={[styles.uploadBtn, {
                            width: width - width / 5
                        }]}
                        onPress={handleCloudImageUpload}
                    >
                        <Text style={styles.uploadText}>Continuer </Text>
                        <Feather
                            name="upload-cloud"
                            size={30}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                )}
            </View >
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
        flexDirection: 'row',
        backgroundColor: colors.chamoisee,
        height: 50,
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
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebase";
import { TextInput } from 'react-native-paper';
import colors from "../../styles/colors";

export default function Create({ navigation, route }) {
    const { url, fileType } = route.params;
    const [document, setDocument] = useState({
        name: '',
        course: '',
        faculty: '',
        departement: '',
        sector: '',
        university: '',
        type: '',
        url: url,
        fileType: fileType
    });

    function addDocument() {
        const documentDb = collection(db, "documents");
        addDoc(documentDb, {
            name: document.name,
            course: document.course,
            faculty: document.faculty,
            departement: document.departement,
            sector: document.sector,
            university: document.university,
            type: document.type,
            url: document.url,
            fileType: document.fileType
        });

        navigation.navigate("Feed");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compléter les infos du document</Text>

            <TextInput
                type="outlined"
                label="nom du fichier"
                value={document.name}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, name: text })}
            />

            <TextInput
                label="nom du courslogique de pro"
                value={document.course}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, course: text })}
            />

            <TextInput
                label="Faculte"
                value={document.faculty}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, faculty: text })}
            />

            <TextInput
                label="Departement"
                value={document.departement}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, departement: text })}
            />

            <TextInput
                label="Filiere"
                value={document.sector}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, sector: text })}
            />

            <TextInput
                label="universite"
                value={document.university}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, university: text })}
            />

            <TextInput
                label="Type de document"
                value={document.type}
                style={styles.inputText}
                onChangeText={text => setDocument({ ...document, type: text })}
            />

            <TouchableOpacity
                onPress={addDocument}
                style={styles.actionBtn}
            >
                <Text style={styles.actionBtnText}>Confirmer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: colors.gunmetal,
        textAlign: 'center'
    },
    inputText: {
        marginBottom: 5
    },
    actionBtn: {
        backgroundColor: colors.chamoisee,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 5
    },
    actionBtnText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white
    },
});
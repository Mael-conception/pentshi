import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../config/firebase";

export default function Create() {
    const [document, setDocument] = useState({ name: '', course: 'textCourse' });

    function addDocument() {
        const documentDb = collection(db, "documents");
        addDoc(documentDb, {
            name: document.name,
            course: document.course
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="name of file"
                value={document.name}
                onChangeText={(text) => setDocument({ ...document, name: text })}
            />
            <Pressable onPress={addDocument}>
                <Text>create document</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { db } from "../../config/firebase";

export default function Delete({id}) {

    function deleteDocument() {
        const document = doc(db, "documents", id);
        deleteDoc(document);
    }

    return (
        <View>
            <Pressable onPress={deleteDocument}>
                <Text>x</Text>
            </Pressable>
        </View>
    )
}
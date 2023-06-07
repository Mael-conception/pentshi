import firebase, { onLog } from 'firebase/app';
import { collection, onSnapshot, query, orderBy, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/firebase";
import colors from "../styles/colors";
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];


export default function Show({ navigation, route }) {

    const { document } = route.params;

    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const Error = () => (
        <View>
            <MaterialIcons name="error-outline" size={24} color="red" />
            <Text>Nous rencontrons un problème pour récupérer les données, veuillez réessayer ultérieurement !</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>{document.name} </Text>
            <Text style={styles.appIntro}>
                {document.course}
            </Text>

            <DataTable style={styles.table}>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Nom du Cours</DataTable.Cell>
                    <DataTable.Cell>{ document.course }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Filière</DataTable.Cell>
                    <DataTable.Cell>{ document.sector }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Département</DataTable.Cell>
                    <DataTable.Cell>{ document.departement }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Faculté</DataTable.Cell>
                    <DataTable.Cell>{ document.faculty }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Université</DataTable.Cell>
                    <DataTable.Cell>{ document.university }</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>Type de fichier</DataTable.Cell>
                    <DataTable.Cell>{ document.type }</DataTable.Cell>
                </DataTable.Row>
            </DataTable>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Reader", { "url": document.url })
                }}
                style={styles.actionBtn}
            >
                <Text style={styles.actionBtnText}>Lire le document</Text>
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
    appName: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.charcoal,
        textTransform: 'capitalize',
        color: colors.chamoisee
    },
    appIntro: {
        fontSize: 18,
        fontWeight: '300',
        color: colors.gunmetal,
        marginVertical: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.gunmetal
    },
    table: {
        borderWidth: 2,
        borderColor: colors.gray
    },
    tableRow: {
        borderWidth: 2,
        borderColor: colors.gray,
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
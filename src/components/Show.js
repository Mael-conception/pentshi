import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar } from "react-native";
import colors from "../styles/colors";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];


export default function Show({ navigation, route }) {

    const { document } = route.params;


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
            <ScrollView>
                <Text style={styles.appName}>{document.name} </Text>
                <Text style={styles.appIntro}>
                    {document.course}
                </Text>

                <DataTable style={styles.table}>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Nom du Cours</DataTable.Title>
                        <DataTable.Cell>
                            {document.course}
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Filière</DataTable.Title>
                        <DataTable.Cell>{document.sector}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Département</DataTable.Title>
                        <DataTable.Cell>{document.departement}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Faculté</DataTable.Title>
                        <DataTable.Cell>{document.faculty}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Université</DataTable.Title>
                        <DataTable.Cell>{document.university}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Title>Type de fichier</DataTable.Title>
                        <DataTable.Cell>{document.type}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Reader", { "url": document.url, "name": document.name })
                    }}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionBtnText}>Lire le document</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 5,
        backgroundColor: colors.white
    },
    appName: {
        fontSize: 25,
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
    tableCell: {
        flexWrap: 'wrap',
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
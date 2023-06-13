import { collection, addDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebase";
import { TextInput } from 'react-native-paper';
import colors from "../../styles/colors";
import { StatusBar } from "expo-status-bar";
import { useValidation } from 'react-native-form-validator';


export default function Create({ navigation, route }) {
    const { url, fileType } = route.params;

    const [type, setType] = useState('');
    const [course, setCourse] = useState('');
    const [faculty, setFaculty] = useState('');
    const [departement, setDepartement] = useState('');
    const [sector, setSector] = useState('');
    const [university, setUniversity] = useState('Unilu');

    const ref_course = useRef();
    const ref_faculty = useRef();
    const ref_departement = useRef();
    const ref_sector = useRef();
    const ref_university = useRef();

    const { validate, isFieldInError, getErrorsInField, isFormValid } =
        useValidation({
            state: { course, faculty, departement, sector, university, type },
            deviceLocale: 'fr'
        });

    const _onPressButton = () => {
        const isValid = validate({
            course: { minlength: 3, maxlength: 25, required: true },
            faculty: { minlength: 3, maxlength: 25, required: true },
            departement: { minlength: 3, maxlength: 25, required: true },
            sector: { minlength: 3, maxlength: 25 },
            university: { minlength: 3, maxlength: 25, required: true },
            type: { minlength: 3, maxlength: 25, required: true }
        });

        if (isValid) {
            alert('valid form');
            addDocument();
        }
    };

    function addDocument() {

        const documentDb = collection(db, "documents");

        addDoc(documentDb, {
            course: course,
            faculty: faculty,
            departement: departement,
            sector: sector,
            university: university,
            type: type,
            url,
            fileType,
            created_at: Date()
        });

        navigation.navigate("Feed");
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
            <Text style={styles.title}>Compléter les infos du document</Text>

            <TextInput
                label="Type de l'épreuve"
                value={type}
                style={styles.inputText}
                onChangeText={setType}
                keyboardType='ascii-capable'
                returnKeyType="next"
                onSubmitEditing={() => ref_course.current.focus()}
                blurOnSubmit={false}
            />
            <View style={styles.errorBox}>
                {isFieldInError('type') &&
                    getErrorsInField('type').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            <TextInput
                label="Nom du cours"
                value={course}
                style={styles.inputText}
                onChangeText={setCourse}
                ref={ref_course}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => ref_faculty.current.focus()}
            />
            <View style={styles.errorBox}>
                {isFieldInError('course') &&
                    getErrorsInField('course').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            <TextInput
                label="Faculté"
                value={faculty}
                style={styles.inputText}
                onChangeText={setFaculty}
                ref={ref_faculty}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => ref_departement.current.focus()}
            />
            <View style={styles.errorBox}>
                {isFieldInError('faculty') &&
                    getErrorsInField('faculty').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            <TextInput
                label="Département"
                value={departement}
                style={styles.inputText}
                onChangeText={setDepartement}
                ref={ref_departement}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => ref_sector.current.focus()}
            />
            <View style={styles.errorBox}>
                {isFieldInError('departement') &&
                    getErrorsInField('departement').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            <TextInput
                label="Filière"
                value={sector}
                style={styles.inputText}
                onChangeText={setSector}
                ref={ref_sector}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => ref_university.current.focus()}
            />
            <View style={styles.errorBox}>
                {isFieldInError('sector') &&
                    getErrorsInField('sector').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            <TextInput
                label="Université"
                value={university}
                style={styles.inputText}
                onChangeText={setUniversity}
                ref={ref_university}
                returnKeyType="done"
            />
            <View style={styles.errorBox}>
                {isFieldInError('university') &&
                    getErrorsInField('university').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

            {/* <Text>{getErrorMessages()}</Text> */}

            <TouchableOpacity
                onPress={_onPressButton}
                style={styles.actionBtn}
            >
                <Text style={styles.actionBtnText}>Confirmer</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15,
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
        marginVertical: 25,
        borderRadius: 5
    },
    actionBtnText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white
    },
    errorBox: {
        paddingVertical: 10
    },
    errorText: {
        color: colors.warning
    }
});
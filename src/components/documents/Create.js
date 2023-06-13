import { collection, addDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebase";
import { TextInput } from 'react-native-paper';
import colors from "../../styles/colors";
import { StatusBar } from "expo-status-bar";
import { useValidation } from 'react-native-form-validator';
import Dropdown from 'react-native-input-select';

export default function Create({ navigation, route }) {
    const { url, fileType } = route.params;

    const [type, setType] = useState('');
    const [course, setCourse] = useState('');
    const [faculty, setFaculty] = useState('');
    const [departement, setDepartement] = useState('');
    const [sector, setSector] = useState('');
    const [university, setUniversity] = useState('');
    const [promotion, setPromotion] = useState('');

    const ref_course = useRef();
    const ref_faculty = useRef();
    const ref_departement = useRef();
    const ref_sector = useRef();
    const ref_promotion = useRef();

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { course, faculty, departement, sector, university, type, promotion },
            deviceLocale: 'fr'
        });

    const _onPressButton = () => {
        const isValid = validate({
            course: { minlength: 2, maxlength: 25, required: true },
            faculty: { minlength: 3, maxlength: 25, required: true },
            departement: { minlength: 3, maxlength: 25, required: true },
            sector: { minlength: 3, maxlength: 25 },
            university: { required: true },
            type: { required: true },
            promotion: { required: true },
        });

        if (isValid) {
            addDocument();
        }
    };

    function addDocument() {

        const documentDb = collection(db, "documents");

        addDoc(documentDb, {
            course,
            faculty,
            departement,
            sector,
            university,
            type,
            promotion,
            url,
            fileType,
            created_at: new Date()
        });

        navigation.navigate("Feed");
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
            <Text style={styles.title}>Compléter les infos du document</Text>

            <Dropdown
                label="Université"
                placeholder="Choisi une option..."
                options={[
                    { name: 'Unilu', code: 'Unilu' }
                ]}
                optionLabel={'name'}
                optionValue={'code'}
                selectedValue={university}
                onValueChange={(value) => setUniversity(value)}
                primaryColor={colors.gray}
                dropdownStyle={{ margin: 0, borderWidth: 0 }}
                labelStyle={{ color: colors.gunmetal, fontWeight: '500' }}
            />

            {isFieldInError('university') &&
                getErrorsInField('university').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

            <Dropdown
                label="Type de l'épreuve"
                placeholder="Choisi une option..."
                options={[
                    { name: 'Examen', code: 'Examen' },
                    { name: 'Interrogation', code: 'Interrogation' },
                    { name: 'TP', code: 'TP' },
                    { name: 'TD', code: 'TD' },
                    { name: 'TPE', code: 'TPE' },
                ]}
                optionLabel={'name'}
                optionValue={'code'}
                selectedValue={type}
                onValueChange={(value) => setType(value)}
                primaryColor={colors.gray}
                dropdownStyle={{ margin: 0, borderWidth: 0 }}
                labelStyle={{ color: colors.gunmetal, fontWeight: '500' }}
            />

            {isFieldInError('type') &&
                getErrorsInField('type').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

            <Dropdown
                label="Promotion"
                placeholder="Choisi une option..."
                options={[
                    { name: 'Préparatoire', code: 'Préparatoire' },
                    { name: 'Bac 1', code: 'Bac 1' },
                    { name: 'Bac 2', code: 'Bac 2' },
                    { name: 'Bac 3', code: 'Bac 3' },
                    { name: 'Master 1', code: 'Master 1' },
                    { name: 'Master 2', code: 'Master 2' },
                ]}
                optionLabel={'name'}
                optionValue={'code'}
                selectedValue={promotion}
                onValueChange={(value) => setPromotion(value)}
                primaryColor={colors.gray}
                dropdownStyle={{ margin: 0, borderWidth: 0 }}
                labelStyle={{ color: colors.gunmetal, fontWeight: '500' }}
            />
            {isFieldInError('promotion') &&
                getErrorsInField('promotion').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

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
            {isFieldInError('course') &&
                getErrorsInField('course').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

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
            {isFieldInError('faculty') &&
                getErrorsInField('faculty').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

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
            {isFieldInError('departement') &&
                getErrorsInField('departement').map(errorMessage => (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ))}

            <TextInput
                label="Filière"
                value={sector}
                style={styles.inputText}
                onChangeText={setSector}
                ref={ref_sector}
                returnKeyType="done"
                onSubmitEditing={_onPressButton}
            />
            <View style={styles.errorBox}>
                {isFieldInError('sector') &&
                    getErrorsInField('sector').map(errorMessage => (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ))}
            </View>

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
    errorText: {
        color: colors.warning,
        paddingBottom: 10
    }
});
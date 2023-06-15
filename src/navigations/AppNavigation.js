import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from '../components/documents/Create';
import UploadFile from '../components/documents/UploadFile';
import Feed from '../components/Feed';
import Reader from '../components/Reader';
import ScanScreen from '../components/scanner/ScanScreen';
import Show from '../components/Show';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.chamoisee,
                    },
                    headerTintColor: colors.white,
                }}
            >
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        title: 'Accueil',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="UploadFile"
                    component={UploadFile}
                    options={{
                        title: 'Téléverser le fichier',
                    }}
                />
                <Stack.Screen
                    name="Scan"
                    component={ScanScreen}
                    options={{
                        title: 'Scanner le document',
                    }}
                />
                <Stack.Screen
                    name="FileInfos"
                    component={Create}
                    options={{
                        title: 'Informations sur le fichier',
                    }}
                />
                <Stack.Screen
                    name="FileDetails"
                    component={Show}
                    options={{
                        title: 'Détails du fichier',
                    }}
                />
                <Stack.Screen
                    name="Reader"
                    component={Reader}
                    options={({ route }) => ({
                        title: route.params.name,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
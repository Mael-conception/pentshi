import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from '../components/documents/Create';
import UploadFile from '../components/documents/UploadFile';
import Feed from '../components/Feed';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        title: 'Accueil',
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: colors.chamoisee,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="UploadFile"
                    component={UploadFile}
                    options={{ title: 'Téléverser le fichier' }}
                />
                <Stack.Screen
                    name="FileInfos"
                    component={Create}
                    options={{ title: 'Informations sur le fichier' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
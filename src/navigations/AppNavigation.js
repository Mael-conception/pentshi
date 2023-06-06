import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Create from '../components/documents/Create';
import UploadFile from '../components/documents/UploadFile';
import Feed from '../components/Feed';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Feed" component={Feed} />
                <Stack.Screen name="UploadFile" component={UploadFile} />
                <Stack.Screen name="FileInfos" component={Create} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
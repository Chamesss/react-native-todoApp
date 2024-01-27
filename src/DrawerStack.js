import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerElements from './components/DrawerElements';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={DrawerElements}
            drawerStyle={{
                backgroundColor: '#fff',
            }}
        >
            <Drawer.Screen name="App" options={{ headerShown: false, drawerPosition: 'right' }} component={AppStack} />
        </Drawer.Navigator>
    );
};
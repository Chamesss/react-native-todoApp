import { useSelector } from "react-redux";
import { selectTheme } from "./slices/themeSlice";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/Home";
import Category from "./screens/Category";

const Stack = createStackNavigator();

export default AppStack = () => {
    const dark = useSelector(selectTheme);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: dark ? '#000' : '#fff',
                },
                headerTintColor: dark ? '#fff' : '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'transparent',
                    flex: 1,
                },
                presentation: 'transparentModal',
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='CategoryListing' component={Category} />
        </Stack.Navigator>
    );
};
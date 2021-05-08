    import {createStackNavigator} from 'react-navigation-stack'
import helpOthers from "../screens/helpOthersScreen"
import Home from "../screens/homeScreen"

    export const AppStackNavigator = createStackNavigator({ 
        Home: { screen: Home, 
        navigationOptions: { headerShown: false } }, 
        helpOthers: { screen: helpOthers,
             navigationOptions: { headerShown: false } } },
         { initialRouteName: "Home" })
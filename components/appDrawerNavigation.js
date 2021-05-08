import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
    import {AppTabNavigator} from './AppTabNavigator'
    import CostumSideBarMenu from './CostumSideBarMenu'
    import profile from '../screens/profileScreen'
    import Home from '../screens/homeScreen'
    import Contacts from '../screens/contactScreen'
    import Settings from '../screens/settingsScreen'
    import { Icon } from 'react-native-elements'
    
    export const AppDrawerNavigator = createDrawerNavigator({
        Home : {
            screen : AppTabNavigator,
            navigationOptions:{
              drawerIcon : <Icon name="home" type ="fontawesome5" />
            }
            },
        Home:{screen:Home,navigationOptions:{drawerIcon:<Icon name="home" type="font-awesome"/>,drawerLabel:"Home"}},
        Contacts:{screen:Contacts,navigationOptions:{drawerIcon:<Icon name="address-book" type="font-awesome"/>,drawerLabel:"Contacts"}},
        Settings:{screen:Settings,navigationOptions:{drawerIcon:<Icon name="settings" type="fontawesome5"/>,drawerLabel:"Settings"}},
        Profile:{screen:profile,navigationOptions:{drawerIcon:<Icon name="user" type="font-awesome"/>,drawerLabel:"Profile"}},
    },{
        contentComponent:CostumSideBarMenu
    },{'initialRouteName':"Home"})
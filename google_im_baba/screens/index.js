import Home from './home';
import Images from './images';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator({
    Home:{
        screen:Home,
    },
    Images:{
        screen:Images
    }},
    {
        initialRouteName: "Home"
    }
    )

export default createAppContainer(AppNavigator)
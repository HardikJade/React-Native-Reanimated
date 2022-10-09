import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./../Screens/Home";
import ReanimatedIntro from '../Screens/ReanimatedIntro';
import PanGestureHandlerBasic from "./../Screens/PanGestureHandlerBasic";
import InterpolateWithScroll from '../Screens/InterpolateWithScroll';
import PinchGestureBasic from "./../Screens/PinchGestureBasic";
import TapGesture from "./../Screens/TapGesture";
import ColorPickerBasic from "./../Screens/ColorPickerBasic";

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Reanimated Introduction" component={ReanimatedIntro} />
                <Stack.Screen name="Pan Gesture Handler Basic" component={PanGestureHandlerBasic} />
                <Stack.Screen name="Interpolate" component={InterpolateWithScroll} />
                <Stack.Screen name="Pinch Gesture Handler Basic" component={PinchGestureBasic} />
                <Stack.Screen name="Tap Gesture" component={TapGesture} />
                <Stack.Screen name="Color Picker" component={ColorPickerBasic} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Routes;
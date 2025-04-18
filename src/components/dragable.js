import React,{ useEffect } from 'react';
import { PanGestureHandler, GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    clamp


} from 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';
import Table from './table';
import axios from 'axios';

const apiheader = process.env.EXPO_PUBLIC_apiURI;

const maxBoundX = 160;
const minBoundX = -160;
const maxBoundY = 200;
const minBoundY = -200;
const updateTable = async (xTrans, yTrans, id) => {
    try {
        const response = await axios.put(apiheader + '/tables/edit/' + id, { x: xTrans, y: yTrans });
    } catch (error) {
        console.error(error);
    }
};
const bound = (base, value, min, max) => {
    maxvalue = base + value
    if (maxvalue > max) {
        return 0;
    } if (maxvalue < min) {
        return 0
    } else {
        return value
    }

}

const Dragable = props => {
    const translateX = useSharedValue(props.x);
    const translateY = useSharedValue(props.y);
    const isGestureActive = useSharedValue(false);


    const pan = Gesture.Pan().runOnJS(true)
        .onStart(() => {

            isGestureActive.value = true;
        })
        .onChange((evt) => {

            translateX.value += bound(translateX.value, evt.changeX, minBoundX, maxBoundX);
            translateY.value += bound(translateY.value, evt.changeY, minBoundY, maxBoundY);



        })
        .onEnd(() => {
            const gridMultiplier = 25
            if (translateX.value <= maxBoundX && translateX.value >= minBoundX) {
                var newX = translateX.value / gridMultiplier;
                var roundedX = Math.round(newX);
                newX = roundedX * gridMultiplier;
                translateX.value = Math.round(newX);


            }
            if (translateY.value <= maxBoundY && translateY.value >= minBoundY) {
                var newY = translateY.value / gridMultiplier;
                var roundedY = Math.round(newY);
                newY = roundedY * gridMultiplier;
                translateY.value = Math.round(newY);


            }
            isGestureActive.value = false;
            updateTable(translateX.value, translateY.value, props.item._id)


        })
    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 1000 : 1;
        return {

            zIndex,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (

        <GestureDetector gesture={pan}>
            <Animated.View style={animatedStyle}>
                <Table name={props.item} key={props.item._id} />
            </Animated.View>
        </GestureDetector>

    );
};

const styles = StyleSheet.create({

})


export default Dragable;
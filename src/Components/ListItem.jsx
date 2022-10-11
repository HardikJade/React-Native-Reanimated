import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;

const ListItem = ({ task }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const itemMargin = useSharedValue(10);

  const gestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const isShouldDismissed =
        Math.abs(translateX.value) < TRANSLATE_X_THRESHOLD;
      if (isShouldDismissed) {
        translateX.value = withTiming(0);
        return;
      }
      translateX.value = withTiming(-SCREEN_WIDTH);
      itemHeight.value = withTiming(0);
      itemMargin.value = withTiming(0, undefined, (finished) => {
        if (finished) {
          runOnJS(task.onDismissCallback)(task.index);
        }
      });
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rStyleIcon = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, -TRANSLATE_X_THRESHOLD],
      [2, 0]
    );
    return { opacity };
  });

  const rTaskContainer = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: itemMargin.value,
    };
  });

  return (
    <GestureHandlerRootView>
      <Animated.View style={[styles.taskContainer, rTaskContainer]}>
        <Animated.View style={[styles.iconContainer, rStyleIcon]}>
          <FontAwesome5
            name={"trash-alt"}
            size={LIST_ITEM_HEIGHT * 0.4}
            color={"red"}
          ></FontAwesome5>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={task.simultaneousHandlers}
          onGestureEvent={gestureEvent}
        >
          <Animated.View View style={[styles.task, rStyle]}>
            <Text style={styles.taskTitle}>{task.item}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "#fff",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    right: "10%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

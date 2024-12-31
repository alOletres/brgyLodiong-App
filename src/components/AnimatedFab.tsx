import React, { useState } from "react";
import { StyleProp, ViewStyle, Animated, StyleSheet, View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useAnimatedFab } from "./hooks/useAnimatedFab";

interface CustomAnimatedFabProps {
  animatedValue?: Animated.Value;
  visible: boolean;
  extended: boolean;
  label: string;
  animateFrom: "left" | "right";
  style?: StyleProp<ViewStyle>;
  iconMode?: "dynamic" | "static";
}

const CustomAnimatedFab: React.FC<CustomAnimatedFabProps> = ({
  animatedValue,
  visible,
  extended = true,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  const fabStyle = { [animateFrom]: 16 };

  const { isExtended, handlePress } = useAnimatedFab({ extended });

  return (
    <View style={styles.container}>
      <AnimatedFAB
        icon="plus"
        label={label}
        extended={isExtended}
        onPress={handlePress}
        visible={visible}
        animateFrom={animateFrom}
        iconMode={iconMode ?? "static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </View>
  );
};

export default CustomAnimatedFab;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

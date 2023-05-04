import React, { ReactNode } from "react";
import { Svg, Circle } from "react-native-svg";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";

interface CircleRingProps {
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  fillColor?: string;
  style?: any;
  children?: ReactNode;
  progress?: number;
  progressColor: string;
}

export function CircleRing({
  children,
  radius,
  strokeWidth,
  strokeColor,
  fillColor,
  style,
  progress = 0,
  progressColor
}: CircleRingProps) {
  const circleRadius = radius - strokeWidth / 2;

  const circumference = 2 * Math.PI * circleRadius;
  const progressOffset = circumference - (progress / 100) * circumference;


  return (
    <Svg width={radius * 2} height={radius * 2} style={style}>
      {fillColor && (
        <Circle cx={radius} cy={radius} r={circleRadius} fill={fillColor} />
      )}
      <Circle
        cx={radius}
        cy={radius}
        r={circleRadius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={radius}
        cy={radius}
        r={circleRadius}
        // stroke={strokeColor}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <View style={styles.children}>
        {children}
      </View>
    </Svg>
  );
}

const styles = StyleSheet.create({
    children: {
        backgroundColor: 'transparent',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
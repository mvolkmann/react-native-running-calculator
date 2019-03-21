import {Svg} from 'expo';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const {Circle, Rect} = Svg;

const SIZE = 100;
const HALF_SIZE = SIZE / 2;
const OFFSET = SIZE * 0.15;
const SIZE7 = SIZE * 0.7;

const SvgDemo = () => (
  <View style={styles.container}>
    <Svg height="100%" width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <Circle
        cx={HALF_SIZE}
        cy={HALF_SIZE}
        r={HALF_SIZE - 1}
        stroke="blue"
        strokeWidth={2}
        fill="green"
      />
      <Rect
        x={OFFSET}
        y={OFFSET}
        width={SIZE7}
        height={SIZE7}
        stroke="red"
        strokeWidth={2}
        fill="yellow"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE,
    width: SIZE
  }
});

export default SvgDemo;

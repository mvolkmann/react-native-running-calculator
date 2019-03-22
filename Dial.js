import {string} from 'prop-types';
import {Svg} from 'expo';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {Circle} = Svg;

const {width} = Dimensions.get('window');
const strokeWidth = 60;
const radius = width / 2 - strokeWidth;
const circumference = 2 * Math.PI * radius;
const half = circumference / 2;

function getDashArray(percent) {
  const dashSize = half * percent;
  const gapSize = half * (1 - percent);
  const da = `0, ${half}, ${dashSize}, ${gapSize}`;
  console.log('Dial.js x: da =', da);
  return da;
}

const circleProps = {
  cx: '50%',
  cy: '50%',
  r: radius,
  fill: 'none',
  strokeWidth
};

const Dial = () => (
  <View style={styles.container}>
    <Svg
      style={styles.dial}
      height={width}
      width={width}
      viewBox={`0 0 ${width} ${width}`}
    >
      <Circle
        {...circleProps}
        stroke="#FDE47F"
        strokeDasharray={getDashArray(1)}
      />
      <Circle
        {...circleProps}
        stroke="#E04644"
        strokeDasharray={getDashArray(0.5)}
      />
      <Circle
        {...circleProps}
        stroke="#7CCCE5"
        strokeDasharray={getDashArray(0.25)}
      />
    </Svg>
  </View>
);

/*
Dial.propTypes = {
  width: string
};

Dial.defaultProps = {
  width: width
};
*/

const styles = StyleSheet.create({
  container: {
    height: width / 2
  }
});

export default Dial;

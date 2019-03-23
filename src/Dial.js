import {number, string} from 'prop-types';
import {Svg} from 'expo';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';

const {Circle} = Svg;

const windowWidth = Dimensions.get('window').width;

const Dial = ({backgroundColor, strokeColor, strokeWidth, value, width}) => {
  console.log('Dial.js x: width =', width);
  const widthInt = parseInt(width);
  console.log('Dial.js x: widthInt =', widthInt);
  width = width.endsWith('%') ? windowWidth * (widthInt / 100) : widthInt;
  console.log('Dial.js x: width =', width);

  const radius = width / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const half = circumference / 2;

  const circleProps = {
    cx: '50%',
    cy: '50%',
    r: radius,
    fill: 'none',
    strokeLinecap: 'round'
  };

  function getDashArray(percent) {
    const dashSize = half * percent;
    const gapSize = half * (1 - percent);
    const da = `0, ${half}, ${dashSize}, ${gapSize}`;
    return da;
  }

  return (
    <View style={{height: width / 2}}>
      <Svg height={width} width={width} viewBox={`0 0 ${width} ${width}`}>
        <Circle
          {...circleProps}
          stroke={backgroundColor}
          strokeDasharray={getDashArray(1)}
          strokeWidth={strokeWidth}
        />
        <Circle
          {...circleProps}
          stroke={strokeColor}
          strokeDasharray={getDashArray(0.5)}
          strokeWidth={strokeWidth * 0.8}
        />
        <Text>{value}</Text>
      </Svg>
    </View>
  );
};

Dial.propTypes = {
  backgroundColor: string,
  strokeColor: string,
  strokeWidth: number,
  value: number.isRequired,
  width: string
};

Dial.defaultProps = {
  backgroundColor: 'red',
  strokeColor: 'white',
  strokeWidth: 60,
  width: windowWidth.toString()
};

export default Dial;

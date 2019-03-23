import {number, string} from 'prop-types';
import {Svg} from 'expo';
import React from 'react';
import {Dimensions, View} from 'react-native';

const {Circle, Text} = Svg;

const windowWidth = Dimensions.get('window').width;

const Dial = ({backgroundColor, strokeColor, strokeWidth, value, width}) => {
  const widthInt = parseInt(width);
  width = width.endsWith('%') ? windowWidth * (widthInt / 100) : widthInt;

  const height = width / 2;
  const radius = height - strokeWidth;
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
    <View style={{borderColor: 'yellow', borderWidth: 1, height}}>
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
          strokeDasharray={getDashArray(value / 100)}
          strokeWidth={strokeWidth * 0.8}
        />
        <Text
          fill="white"
          fontSize={24}
          fontWeight="bold"
          stroke="white"
          x={height}
          y={height}
          textAnchor="middle"
        >
          {value}
        </Text>
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

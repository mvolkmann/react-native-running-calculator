import {number, string} from 'prop-types';
import {Svg} from 'expo';
import React from 'react';
import {Dimensions, View} from 'react-native';

const {Path, Text} = Svg;

const windowWidth = Dimensions.get('window').width;

function polarToCartesian(
  centerX,
  centerY,
  radius,
  angleInDegrees,
  strokeWidth
) {
  var angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

  return [
    centerX + radius * Math.cos(angleInRadians),
    centerY + radius * Math.sin(angleInRadians) - strokeWidth / 2
  ];
}

function describeArc(
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  strokeWidth
) {
  var [startX, startY] = polarToCartesian(
    centerX,
    centerY,
    radius,
    endAngle,
    strokeWidth
  );
  var [endX, endY] = polarToCartesian(
    centerX,
    centerY,
    radius,
    startAngle,
    strokeWidth
  );

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}`;
}

const Dial = ({backgroundColor, strokeColor, strokeWidth, value, width}) => {
  const widthInt = parseInt(width);
  width = width.endsWith('%') ? windowWidth * (widthInt / 100) : widthInt;

  const halfWidth = width / 2;
  const height = halfWidth;
  const radius = halfWidth - strokeWidth;

  const centerX = width / 2;
  const centerY = centerX;
  const outerArcD = describeArc(centerX, centerY, radius, 0, 180, strokeWidth);

  const degrees = (value / 100) * 180;
  const innerArcD = describeArc(
    centerX,
    centerY,
    radius,
    0,
    degrees,
    strokeWidth
  );

  return (
    <View style={{height}}>
      <Svg height={width} width={width} viewBox={`0 0 ${width} ${width}`}>
        <Path
          d={outerArcD}
          fill="transparent"
          stroke={backgroundColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d={innerArcD}
          fill="transparent"
          stroke={strokeColor}
          strokeLinecap="round"
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

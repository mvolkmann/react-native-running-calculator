import {Svg} from 'expo';
import {string} from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const {Path} = Svg;

const HEIGHT = 20;
const PADDING = 20;
const WIDTH = 40;
const D = `M 0 ${HEIGHT} L ${WIDTH} ${HEIGHT} L ${WIDTH} 0 Z`;
//const R1 = HEIGHT / 2;
//const D2 = `${describeArc(PADDING, PADDING, R1, 90, 1)} Z`;

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

const SpeechBubble = ({backgroundColor, color, text}) => {
  return (
    <View style={[styles.bubble, {backgroundColor}]}>
      <Text style={[styles.text, {color}]}>{text}</Text>
      {/* <Svg
        style={styles.arrowLeft}
        width={15.5}
        height={17.5}
        viewBox="32.484 17.5 15.515 17.5"
        enable-background="new 32.485 17.5 15.515 17.5"
      >
        <Path
          d={D}
          fill="red"
          x="0"
          y="0"
        />
      </Svg> */}
      <View style={styles.tailContainer}>
        <Svg styles={styles.tail} width={WIDTH} height={HEIGHT}>
          <Path d={D} fill="blue" />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    borderRadius: PADDING,
    padding: PADDING
  },
  tail: {
    borderColor: 'blue',
    borderWidth: 1,
    width: WIDTH,
    height: HEIGHT
  },
  tailContainer: {
    position: 'absolute',
    left: PADDING - WIDTH,
    bottom: HEIGHT
  },
  text: {
    fontSize: 24
  }
});

SpeechBubble.propTypes = {
  backgroundColor: string,
  color: string,
  text: string.isRequired
};

SpeechBubble.defaultProps = {
  backgroundColor: 'skyblue',
  color: 'white'
};

export default SpeechBubble;

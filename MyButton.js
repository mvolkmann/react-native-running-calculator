import {func, object, string} from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const COLOR = 'white';

function MyButton({buttonStyle, onPress, text, textStyle}) {
  bStyle = {borderColor: COLOR, borderWidth: 1, padding: 10, ...buttonStyle};
  tStyle = {color: COLOR, fontSize: 18, ...textStyle};

  return (
    <TouchableOpacity onPress={onPress} style={bStyle}>
      <Text style={tStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

MyButton.propTypes = {
  buttonStyle: object,
  onPress: func.isRequired,
  text: string.isRequired,
  textStyle: object
};

MyButton.defaultProps = {
  buttonStyle: {},
  textStyle: {}
};

export default MyButton;

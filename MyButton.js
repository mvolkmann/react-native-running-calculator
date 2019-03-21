import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function MyButton({buttonStyle = {}, onPress, text, textStyle = {}}) {
  bStyle = {borderColor: 'white', borderWidth: 1, padding: 10, ...buttonStyle};
  tStyle = {color: 'white', fontSize: 18, ...textStyle};

  return (
    <TouchableOpacity onPress={onPress} style={bStyle}>
      <Text style={tStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

export default MyButton;

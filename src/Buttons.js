import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

//const COLOR = 'white';

function onPress() {
  console.log('got press');
}

function MyButton() {
  // const bStyle = {
  //   borderColor: COLOR,
  //   borderWidth: 1,
  //   padding: 10,
  //   ...buttonStyle
  // };
  // const tStyle = {color: COLOR, fontSize: 18, ...textStyle};

  return (
    <View>
      <Button color="red" title="Button" onPress={onPress} />
      <TouchableHighlight onPress={onPress}>
        <Text style={styles.button}>TouchableHighlight</Text>
      </TouchableHighlight>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>TouchableOpacity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    color: 'white',
    padding: 20
  }
});

export default MyButton;

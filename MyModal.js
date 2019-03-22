import React, {Component} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import MyButton from './MyButton';

const MyModal = ({children, title, visible}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.modalOuter}>
      <View style={styles.modalInner}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>{title}</Text>
        {children}
        <MyButton
          buttonStyle={{borderColor: 'red', marginTop: 30, width: 70}}
          onPress={this.toggleModal}
          textStyle={{color: 'red'}}
          text="Close"
        />
      </View>
    </View>
  </Modal>
);

export default MyModal;

const styles = StyleSheet.create({
  modalInner: {
    backgroundColor: 'linen',
    height: '70%',
    padding: 50,
    width: '70%'
  },
  modalOuter: {
    backgroundColor: 'rgba(80, 80, 80, 0.1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'blue',
    fontSize: 36,
    fontWeight: 'bold'
  }
});

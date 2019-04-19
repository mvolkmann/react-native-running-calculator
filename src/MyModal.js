import {bool, func, node, object, string} from 'prop-types';
import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import MyButton from './MyButton';

const BG_OPACITY = 0.6;

const MyModal = ({children, onClose, style, title, visible}) => (
  <Modal
    animationType="slide"
    onRequestClose={onClose}
    transparent
    visible={visible}
  >
    <View style={styles.modalOuter}>
      <View style={[styles.modalInner, style]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text onPress={onClose} style={styles.title}>
            &#x2716;
          </Text>
        </View>
        <View style={styles.body}>{children}</View>
        <View style={styles.buttonRow}>
          <MyButton
            buttonStyle={styles.button}
            onPress={onClose}
            text="Close"
            textStyle={styles.button}
          />
        </View>
      </View>
    </View>
  </Modal>
);

MyModal.propTypes = {
  children: node.isRequired,
  onClose: func.isRequired,
  style: object,
  title: string.isRequired,
  visible: bool.isRequired
};

MyModal.defaultProps = {
  style: {}
};

const BORDER_COLOR = 'blue';
const BUTTON_COLOR = 'gray';
const SPACING = 10;

const styles = StyleSheet.create({
  body: {
    margin: SPACING
  },
  button: {
    borderColor: BUTTON_COLOR,
    color: BUTTON_COLOR
  },
  buttonRow: {
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACING
  },
  modalInner: {
    backgroundColor: 'linen',
    borderColor: 'gray',
    borderWidth: 5,
    width: '70%'
  },
  modalOuter: {
    backgroundColor: `rgba(80, 80, 80, ${BG_OPACITY})`,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold'
  },
  titleRow: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING
  }
});

export default MyModal;

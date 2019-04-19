import {Camera, ImageManipulator, Permissions} from 'expo';
import {string} from 'prop-types';
import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MyButton from './MyButton';

const {back, front} = Camera.Constants.Type;

const {height} = Dimensions.get('window');

export default class CameraExample extends Component {
  static propTypes = {uri: string};

  state = {
    hasPermission: null,
    photoUri: '',
    photoUriProp: '',
    showCamera: true,
    type: back
  };

  async componentDidMount() {
    try {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState(state => ({
        hasPermission: status === 'granted',
        showCamera: state.photoUriProp === ''
      }));
    } catch (e) {
      console.error(e);
    }
  }

  static getDerivedStateFromProps(props, state) {
    return props.uri !== state.photoUriProp
      ? {photoUri: '', photoUriProp: props.uri, showCamera: false}
      : null;
  }

  captureCamera = ref => (this.camera = ref);

  flip = () => {
    this.setState(({type}) => ({
      type: type === front ? back : front
    }));
  };

  snap = async () => {
    console.log('MyCamera.js snap: entered');
    if (!this.camera) return;

    try {
      const photo = await this.camera.takePictureAsync();

      // When the front-facing camera is used,
      // the image needs to be flipped.
      if (this.state.type === front) {
        const result = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{flip: {horizontal: true}}],
          {format: 'png'}
        );
        photo.uri = result.uri;
      }

      this.setState({photoUri: photo.uri, showCamera: false});
    } catch (e) {
      console.error('snap failed to take photo:', e.message);
    }
  };

  startCamera = () => this.setState({showCamera: true});

  render() {
    const {hasPermission, photoUriProp, showCamera, type} = this.state;
    const photoUri = this.state.photoUri || photoUriProp;

    // If we haven't asked for permission to use camera yet ...
    if (hasPermission === null) return <View />;

    // If we have asked, but it was denied ...
    if (!hasPermission) return <Text>No access to camera</Text>;

    return (
      <View style={[styles.container, {height}]}>
        {showCamera && (
          <Camera style={{flex: 1}} ref={this.captureCamera} type={type}>
            <View style={styles.view}>
              <MyButton
                buttonStyle={styles.button}
                onPress={this.flip}
                text="Flip"
              />
              <MyButton
                buttonStyle={styles.button}
                onPress={this.snap}
                text="Snap"
              />
            </View>
          </Camera>
        )}
        {!showCamera && (
          <ImageBackground style={styles.view} source={{uri: photoUri}}>
            <View style={styles.view}>
              <MyButton
                buttonStyle={styles.button}
                onPress={this.startCamera}
                text="Camera"
              />
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginLeft: 20
  },
  container: {
    flex: 1,
    width: '100%'
  },
  view: {
    flex: 1,
    flexDirection: 'row'
  }
});

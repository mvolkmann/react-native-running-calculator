import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Camera, ImageManipulator, Permissions} from 'expo';
import MyButton from './MyButton';

const {back, front} = Camera.Constants.Type;

export default class CameraExample extends Component {
  state = {
    hasPermission: null,
    height: 0,
    type: back,
    uri: '' // of photo
  };

  async componentDidMount() {
    try {
      const {height} = Dimensions.get('window');
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasPermission: status === 'granted', height});
    } catch (e) {
      console.error(e);
    }
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

    const {type, uri} = this.state;

    try {
      const photo = await this.camera.takePictureAsync();

      // When the front-facing camera is used,
      // the image needs to be flipped.
      if (type === front) {
        const result = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{flip: {horizontal: true}}],
          {format: 'png'}
        );
        photo.uri = result.uri;
      }

      this.setState({uri: photo.uri});
    } catch (e) {
      console.error(e);
    }
  };

  startCamera = () => this.setState({uri: ''});

  render() {
    const {hasPermission, height, type, uri} = this.state;
    const havePhoto = uri !== '';

    // If we haven't asked for permission to use camera yet ...
    if (hasPermission === null) return <View />;

    // If we have asked, but it was denied ...
    if (!hasPermission) return <Text>No access to camera</Text>;

    return (
      <View style={[styles.container, {height}]}>
        {havePhoto && (
          <ImageBackground style={styles.view} source={{uri}}>
            <MyButton
              buttonStyle={styles.button}
              onPress={this.startCamera}
              text="Camera"
            />
          </ImageBackground>
        )}
        {!havePhoto && (
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

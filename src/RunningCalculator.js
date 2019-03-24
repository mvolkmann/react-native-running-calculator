import {ImagePicker, Permissions} from 'expo';
//import {LocalAuthentication} from 'expo';
import React, {Component} from 'react';
import {
  CameraRoll,
  Image,
  Picker,
  Platform,
  ScrollView,
  Slider,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import Dial from './Dial';
import MyButton from './MyButton';
import MyCamera from './MyCamera';
import MyModal from './MyModal';
import SvgDemo from './SvgDemo';

const DISTANCE_RE = /^(|\d{1,2}(\.\d{0,2})?)$/;
const MILES_PER_KM = 0.621371;
const PACE_RE = /^(|\d{1,2}(:\d{0,2})?)$/;
const SWITCH_BG = 'yellow';
const TIME_RE = /^(|\d{1,2}(:\d{0,2})?(:\d{0,2})?)$/;

const distanceNames = [
  'Marathon',
  'Half Marathon',
  '10 Mile',
  '10K',
  '5K',
  'Mile'
];

const distanceMap = {
  Marathon: 26.2,
  'Half Marathon': 13.1,
  '10 Mile': 10,
  '10K': 10,
  '5K': 5,
  Mile: 1
};

const isIos = Platform.OS === 'ios';
const keyboardType = isIos ? 'numbers-and-punctuation' : 'default';

export default class RunningCalculator extends Component {
  state = {
    authenticated: true, // change to false if using LocalAuthentication
    canUseCameraRoll: false,
    distance: 26.2,
    isKm: false,
    modalVisible: false,
    pace: '',
    score: 50,
    time: '',
    uri: ''
  };

  async componentDidMount() {
    // Require authentication using a passcode, touch id, or face id.
    /*
    const prompt = 'Allow RunningCalculator to start?';
    const result = await LocalAuthentication.authenticateAsync(prompt);
    this.setState({authenticated: result.success});
    */
    try {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({canUseCameraRoll: status === 'granted'});
    } catch (e) {
      console.error(e);
    }
  }

  getPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) this.setState({uri: result.uri});
    } catch (e) {
      console.error(e);
    }
  };

  getSummary = () => {
    const {distance, time} = this.state;
    if (!distance || !time) return null;
    return (
      <View>
        <Text style={styles.text}>
          You ran {distance} miles in {time}.
        </Text>
      </View>
    );
  };

  setDistance = distance => {
    if (DISTANCE_RE.test(distance)) {
      this.setState({distance}, this.updatePace);
    }
  };

  setDistanceName = name => {
    console.log('RunningCalculator.js setDistanceName: name =', name);
    this.setState(
      {
        distance: distanceMap[name],
        distanceName: name,
        isKm: name.endsWith('K')
      },
      this.updatePace
    );
  };

  setIsKm = isKm => {
    this.setState({isKm}, this.updatePace);
  };

  toggleModal = () =>
    this.setState(state => ({modalVisible: !state.modalVisible}));

  setPace = pace => {
    if (PACE_RE.test(pace)) {
      this.setState({pace});
    }
  };

  setScore = score => this.setState({score});

  setTime = time => {
    if (TIME_RE.test(time)) {
      this.setState({time}, this.updatePace);
    }
  };

  takePhoto = async () => {
    try {
      const options = {allowsEditing: true};
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.setState({uri: result.uri});
        CameraRoll.saveToCameraRoll(result.uri);
      }
    } catch (e) {
      console.error(e);
    }
  };

  updatePace = () => {
    const {distance, isKm, time} = this.state;
    if (!distance || !time) return '';

    let dist = parseFloat(distance);
    if (isNaN(dist)) return '';

    if (isKm) dist *= MILES_PER_KM;

    const parts = time.split(':').map(part => (part ? parseInt(part) : 0));
    let seconds = parts.reduce((acc, part) => acc * 60 + part, 0);

    let pace = seconds / dist;
    const minutes = pace / 60;
    if (minutes < 1) {
      pace = pace.toFixed(2);
    } else {
      const wholeMinutes = Math.floor(minutes);
      seconds = Math.round((minutes - wholeMinutes) * 60);
      if (seconds < 10) seconds = '0' + seconds;
      pace = Math.floor(minutes) + ':' + seconds;
    }

    this.setState({pace});
  };

  render() {
    const {
      authenticated,
      canUseCameraRoll,
      distance,
      isKm,
      pace,
      score,
      time,
      uri
    } = this.state;
    if (!authenticated)
      return (
        <View style={styles.center}>
          <Text style={styles.error}>Authentication failed!</Text>
        </View>
      );

    const {switchLabel, switchLabelSelected} = styles;
    //keyboardType="number-pad"
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MyModal
          onClose={this.toggleModal}
          title="Hello World"
          visible={this.state.modalVisible}
        >
          <Text>Child #1</Text>
          <Text>Child #2</Text>
        </MyModal>

        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Running Calculator</Text>

        <Dial value={score} width="100%" />

        <View style={styles.slider}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            onValueChange={this.setScore}
            step={1}
            value={score}
          />
          <Text style={[styles.label, {width: '80%'}]}>Score: {score}</Text>
        </View>

        <View style={styles.switchRow}>
          <Text
            onPress={() => this.setState({isKm: false})}
            style={isKm ? switchLabel : switchLabelSelected}
          >
            Miles
          </Text>
          <Switch
            ios_backgroundColor={SWITCH_BG}
            onValueChange={this.setIsKm}
            thumbColor="gray"
            trackColor={{false: SWITCH_BG, true: SWITCH_BG}}
            value={isKm}
          />
          <Text
            onPress={() => this.setState({isKm: true})}
            style={isKm ? switchLabelSelected : switchLabel}
          >
            Kilometers
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Distance</Text>
          <TextInput
            keyboardType={keyboardType}
            maxLength={5}
            onChangeText={this.setDistance}
            style={styles.input}
            value={String(distance)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            keyboardType={keyboardType}
            maxLength={8}
            onChangeText={this.setTime}
            style={styles.input}
            value={String(time)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pace</Text>
          <TextInput
            keyboardType={keyboardType}
            maxLength={5}
            onChangeText={this.setPace}
            style={styles.input}
            value={String(pace)}
          />
        </View>

        {this.getSummary()}

        <View>
          <Picker
            itemStyle={styles.pickerItem}
            onValueChange={this.setDistanceName}
            selectedValue={this.state.distanceName}
            style={styles.picker}
          >
            {distanceNames.map(name => (
              <Picker.Item color="blue" key={name} label={name} value={name} />
            ))}
          </Picker>
        </View>

        <MyButton
          buttonStyle={styles.button}
          onPress={this.toggleModal}
          text="Open"
        />

        <View style={styles.svg}>
          <SvgDemo />
        </View>

        <Image
          style={styles.logo}
          source={require('../assets/react-logo.png')}
        />

        {canUseCameraRoll && (
          <View>
            <MyButton
              buttonStyle={styles.button}
              onPress={this.getPhoto}
              text="Get Photo"
            />
            <MyButton
              buttonStyle={styles.button}
              onPress={this.takePhoto}
              text="Take Photo"
            />
          </View>
        )}

        <MyCamera uri={uri} />
      </ScrollView>
    );
  }
}

//const fontFamily = isIos ? 'System' : 'normal';
const pickerHeight = isIos ? 150 : 50;

const styles = StyleSheet.create({
  button: {
    margin: 10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'cornflowerblue',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  },
  error: {
    color: 'red',
    fontSize: 36,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 18,
    height: 40,
    padding: 4,
    width: 100
  },
  label: {
    //fontFamily,
    fontSize: 24,
    marginRight: 10,
    textAlign: 'right',
    width: 100
  },
  logo: {
    height: 100,
    marginTop: 10,
    width: 100
  },
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
  picker: {
    height: pickerHeight,
    marginBottom: 60,
    marginTop: -30,
    width: 150
  },
  pickerItem: {
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  slider: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    width: '80%'
  },
  svg: {
    marginTop: 60
  },
  switchLabel: {
    color: 'white',
    fontSize: 24,
    margin: 5
  },
  switchLabelSelected: {
    color: 'yellow'
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    color: 'yellow',
    fontSize: 36,
    fontWeight: 'bold'
  }
});

styles.label = {...styles.text, ...styles.label};
styles.switchLabelSelected = {
  ...styles.switchLabel,
  ...styles.switchLabelSelected
};

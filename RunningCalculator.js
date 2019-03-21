import React, {Component} from 'react';
import {
  Image,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import MyCamera from './MyCamera';
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
  //TODO: Add a way to select distance from a list of common ones.
  state = {
    distance: 26.2,
    isKm: false,
    pace: '',
    time: ''
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

  setPace = pace => {
    if (PACE_RE.test(pace)) {
      this.setState({pace});
    }
  };

  setTime = time => {
    if (TIME_RE.test(time)) {
      this.setState({time}, this.updatePace);
    }
  };

  updatePace = () => {
    const {distance, isKm, time} = this.state;
    if (!distance || !time) return '';

    let dist = parseFloat(distance);
    if (isNaN(dist)) return '';

    if (isKm) dist *= MILES_PER_KM;

    const parts = time.split(':').map(part => (part ? parseInt(part) : 0));
    const {length} = parts;
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
    const {distance, isKm, pace, time} = this.state;
    const {switchLabel, switchLabelSelected} = styles;
    //keyboardType="number-pad"
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Running Calculator</Text>
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
        <View style={styles.svg}>
          <SvgDemo />
        </View>
        <Image
          style={styles.logo}
          source={require('./assets/react-logo.png')}
        />
        <MyCamera />
      </ScrollView>
    );
  }
}

//const fontFamily = isIos ? 'System' : 'normal';
const pickerHeight = isIos ? 150 : 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cornflowerblue',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
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
  picker: {
    height: pickerHeight,
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

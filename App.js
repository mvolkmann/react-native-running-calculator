import {Font} from 'expo';
import React, {Component} from 'react';
import RunningCalculator from './src/RunningCalculator';

export default class App extends Component {
  state = {fontLoaded: false};

  async componentDidMount() {
    await Font.loadAsync({
      'Funny Pages': require('./assets/fonts/Funny2.ttf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    if (!this.state.fontLoaded) return null;
    return <RunningCalculator />;
  }
}

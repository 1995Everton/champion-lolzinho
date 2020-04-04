import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Routes from './src/routes';

export default class App extends React.Component {

  public state: any;

  constructor(props:any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount(): Promise<void> {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Routes/>
    );
  }
}

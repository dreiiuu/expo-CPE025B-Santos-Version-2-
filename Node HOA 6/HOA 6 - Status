import React from 'react';
import { View, Platform, StyleSheet, StatusBar, Text } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {

  state = {
    info: 'none', // simulate disconnected for testing
                  //  'none' means no network connection
                  // 'wifi' means there is a connection for network
  };

  componentDidMount() {
    // Get the initial network state and store the actual connection type
    NetInfo.fetch().then(state => {
      this.setState({ info: state.isConnected ? state.type : 'none' });
    });

    // Subscribe to network changes and update its connections
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ info: state.isConnected ? state.type : 'none' });
    });
  }

  componentWillUnmount() {
      // it will clean up so it doesn’t keep running in the background
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? '#eee' : 'red';

    // StatusBar
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    // Message container
    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents="none">
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
}

const statusHeight =
  Platform.OS === 'ios'
    ? Constants.statusBarHeight
    : StatusBar.currentHeight || 24;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    left: 0,
    right: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
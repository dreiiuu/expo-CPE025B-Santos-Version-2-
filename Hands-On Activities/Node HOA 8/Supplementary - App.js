import React from 'react';
import { StyleSheet, View, Alert, Image, TouchableHighlight, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import Toolbar from "./components/Toolbar";
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { createTextMessage, createImageMessage, createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://picsum.photos/id/1015/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
        uri: 'https://picsum.photos/id/1028/400/200',
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;
        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    if (this.backHandler) this.backHandler.remove();
  }

  handlePressToolbarCamera = () => {
      Alert.alert('Camera', 'Camera button pressed');
  };
  
  handlePressToolbarLocation = () => {
      Alert.alert('Location', 'Location button pressed');
  };

  handleFocusChange = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  handlePressMessage = (msg) => {
    switch (msg.type) {
      case 'text':
        Alert.alert(
          'Delete Message',
          'Do you want to delete this message?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => this.deleteMessage(msg.id),
            },
          ],
          { cancelable: true }
        );
        break;

      case 'image':
        this.setState({ fullscreenImageId: msg.id,
              isInputFocused: false,
         });
        break;
    }
  };

  deleteMessage = (id) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((m) => m.id !== id),
    }));
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find((m) => m.id === fullscreenImageId);
    if (!image) return null;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
      <Animated.Image
        entering={ZoomIn.duration(500)}
        exiting={ZoomOut.duration(500)}
        style={styles.fullscreenImage}
        source={{ uri: image.uri }}/>
      </TouchableHighlight>
    );
  };

  renderToolbar() {
    const { isInputFocused } = this.state;

    return (
     <View style={styles.toolbar}>
      <Toolbar
        isFocused={isInputFocused}
        onSubmit={this.handleSubmit}
        onChangeFocus={this.handleFocusChange}
        onPressCamera={this.handlePressToolbarCamera}
        onPressLocation={this.handlePressToolbarLocation}
      />
     </View>
    );
  }

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.messages}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  render() {
    return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={20}
    >
      <Status />

      {this.renderMessageList()}

      {this.renderToolbar()}

      {this.renderFullscreenImage()}
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  messages: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  toolbar: {
    backgroundColor: '#ddd',
  },

  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
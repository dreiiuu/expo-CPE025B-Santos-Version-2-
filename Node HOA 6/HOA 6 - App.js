import React from 'react';
import { StyleSheet, View, Alert, Image, TouchableHighlight, BackHandler} from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import { createTextMessage, createImageMessage, createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  // Initial state with sample messages
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
  };

  componentWillMount() {
  this.backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true; // prevent default back action
      }
      return false; // allow normal back action (exit app)
    }
  );
}

  componentWillUnmount() {
    if (this.backHandler) this.backHandler.remove();
  }

    // Handle message taps
  handlePressMessage = (msg) => {
    switch (msg.type) {
      case 'text':
        // Show Alert for text message deletion
        Alert.alert(
          'Delete Message',
          'Do you want to delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
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
        this.setState({ fullscreenImageId: msg.id });
        break;

      default:
        break;
    }
  };

  // Delete message from state
  deleteMessage = (id) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((m) => m.id !== id),
    }));
  };

    // Dismiss fullscreen image
  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  // Render fullscreen image
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
        <Image style={styles.fullscreenImage} source={{ uri: image.uri }} />
      </TouchableHighlight>
    );
  };

  // Render method for MessageList
  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }


  
  render() {
    return (
      <View style={styles.container}>
        {/* Status bar */}
        <Status />

        {/* Message list */}
        {this.renderMessageList()}

        {/* Toolbar */}
        <View style={styles.toolbar} />

        {/* IME */}
        <View style={styles.ime} />
        {this.renderFullscreenImage()} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  toolbar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#ddd',
  },

  ime: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
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

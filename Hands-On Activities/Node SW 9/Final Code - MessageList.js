import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MessageShape } from '../utils/MessageUtils';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    style: PropTypes.object,
    darkMode: PropTypes.bool
  };

  static defaultProps = {
    onPressMessage: () => {},
    style: {},
    darkMode: false
  };


  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;
    return (
          <Animated.View
            entering={ZoomIn.duration(600)}
            exiting={ZoomOut.duration(600)}
            style={styles.messageRow}>
          <TouchableOpacity onPress={() => onPressMessage(item)} activeOpacity={0.8}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    const { darkMode } = this.props;
    switch (type) {
      case 'text':
        return (
            <View
              style={[
                styles.messageBubble,
                { backgroundColor: darkMode ? '#333' : '#007AFF' },
              ]}
            >
            <Text
              style={[
                styles.messageText,
                { color: darkMode ? '#eee' : 'white' }
              ]}
            >
              {text}
            </Text>
            <Text style={styles.timeText}>
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        );

      case 'image':
        return <Image style={styles.messageImage} source={{ uri }} />;

      case 'location':
        return (
          <Image
            style={styles.messageLocation}
            source={{ uri: coordinate.uri }}
            resizeMode="cover"
          />
        );

      default:
        return null;
    }
  };

  render() {
    const { messages, style, darkMode } = this.props;
    return (
      <Animated.FlatList
        style={[
          styles.container,
          { backgroundColor: darkMode ? '#121212' : '#f9f9f9' },
          style,
        ]}
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 60,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  messageBubble: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: '100%',
  },
  messageText: {
    color: 'white',    
    fontSize: 16,
    lineHeight: 22,
    flexShrink: 1,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  messageLocation: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  timeText: {
  fontSize: 10,
  color: 'rgba(255,255,255,0.7)',
  marginTop: 4,
  textAlign: 'right',
  }
});
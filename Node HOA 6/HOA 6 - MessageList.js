import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    onPressMessage: () => {},
    style: {},
  };

  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)} activeOpacity={0.8}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{text}</Text>
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
    const { messages, style } = this.props;
    return (
      <FlatList
        style={[styles.container, style]}
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
});
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Status from './components/Status'; 

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* For the Status */}
      <Status />

      {/* For Message List */}
      <View style={styles.messageList}>
        <Text>Message List</Text>
      </View>

      {/* For Toolbar */}
      <View style={styles.toolbar}>
        <Text>Toolbar</Text>
      </View>

      {/* For IME */}
      <View style={styles.ime}>
        <Text>IME (Input Method Editor)</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  status: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  messageList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});
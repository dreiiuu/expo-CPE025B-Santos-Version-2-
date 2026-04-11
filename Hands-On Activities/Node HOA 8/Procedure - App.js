import React from 'react';
import { View, Button } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function App() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'green',
        }}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Click Me!"onPress={handlePress} />
      </View>

    </View>
  );
}

import React from 'react';
import FriendModal from './modal.js';
import { StyleSheet, View } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
        <FriendModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

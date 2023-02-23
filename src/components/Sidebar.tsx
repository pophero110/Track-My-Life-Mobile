import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated,Dimensions } from 'react-native';

const SlideInSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [translateX] = useState(new Animated.Value(-Dimensions.get('window').width));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    Animated.spring(translateX, {
      toValue: isOpen ? -Dimensions.get('window').width : 0,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Slide In Sidebar Example</Text>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text>Toggle Sidebar</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <Text>Slide In Sidebar Content</Text>
        <TouchableOpacity onPress={toggleSidebar}>
            <Text>Toggle Sidebar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#cccccc',
    zIndex: 1,
  },
});

export default SlideInSidebar;

// @flow
//  Created by tigransahakyan on 12/8/19.
//  Copyright © 2019 Quicken Inc. All rights reserved.
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class Button extends Component {
  render() {
    const { title, contentContainerStyle, onPress } = this.props;
    return <TouchableHighlight
      onPress={onPress}
      style={[styles.container, contentContainerStyle]}>
      <View>
        <Text style={styles.content}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 32,
    paddingHorizontal: 8,
    backgroundColor: '#ec3aff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#aa44ff',
  },
  content: {
    color: 'white',
  }
});

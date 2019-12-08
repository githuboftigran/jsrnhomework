/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Button from './components/Button';
import axios from 'axios';

const API_BASE_PATH = 'https://jsonplaceholder.typicode.com/';
const POSTS_PATH = `${API_BASE_PATH}posts/`;
const USER_PATH = `${API_BASE_PATH}users/`;

const postKeyExtractor = (item, index) => {
  return `key-${index}`;
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: {},
    };
  }

  componentDidMount() {
    axios.get(POSTS_PATH).then(({data}) => {

      this.setState({posts: data.sort(() => Math.random() - 0.5)});

      Array.from(data.reduce((acc, item) => {
        acc.add(item.userId);
        return acc;
      }, new Set())).forEach(id => {
        axios.get(`${USER_PATH}${id}`).then(({data}) => {
          this.setState({users: {...this.state.users, [data.id]: data}});
        });
      });
    });
  }

  render() {
    const { posts } = this.state;
    const { rootContainer, headerButton, headerContainer } = styles;
    return <View style={rootContainer}>
      <View style={headerContainer}>
        <Button
          title={'Back'}
          onPress={this.handleBackPress}
          style={headerButton}
          contentContainerStyle={headerButton}
        />
        <Button
          title={'Refresh'}
          onPress={this.handleRefreshPres}
          contentContainerStyle={headerButton}
        />
      </View>
      <FlatList
        keyExtractor={postKeyExtractor}
        data={posts}
        renderItem={this.renderPostItem}
      />
    </View>;
  }

  handleBackPress = () => {

  }

  handleRefreshPres = () => {

  }

  renderPostItem = ({item, index}) => {
    const { users } = this.state;
    const { userId, body } = item;

    const { postHeader, postContainerOdd, postContainerEven } = styles;
    const headerStyle = index % 2 ? postContainerOdd : postContainerEven;
    const user = users[userId];
    const userName = user ? user.name : '';
    const userEmail = user ? user.email : '';

    return <View style={headerStyle}>
      <View style={postHeader}>
        <Text>{userName}</Text>
        <Text>{userEmail}</Text>
      </View>
      <Text>{body}</Text>
    </View>
  }
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#567',
  },
  headerButton: {
    flex: 1,
    margin: 8,
  },
  postContainerOdd: {
    padding: 8,
    backgroundColor: '#fff',
  },
  postContainerEven: {
    padding: 8,
    backgroundColor: '#ddd',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

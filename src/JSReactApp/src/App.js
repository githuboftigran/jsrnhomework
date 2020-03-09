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
    TouchableOpacity,
} from 'react-native';
import Button from './components/Button';
import axios from 'axios';
import defaults from "@babel/runtime/helpers/esm/defaults";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const API_BASE_PATH = 'https://jsonplaceholder.typicode.com/';
const POSTS_PATH = `${API_BASE_PATH}posts/`;
const USER_PATH = `${API_BASE_PATH}users/`;
const COMMENTS_PATH = `${API_BASE_PATH}comments?postId=`;

const postKeyExtractor = (item, index) => {
    return `key-${index}`;
};

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            comments: [],
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
        const {posts} = this.state;
        const {comments} = this.state;
        const {rootContainer, headerButton, headerContainer} = styles;
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

    };

    handleRefreshPres = () => {
        this.componentDidMount();
    };

    renderComments = () => {
        axios.get(`${COMMENTS_PATH}1`).then(() => {
            this.setState(this.state.comments);
        });
        return <View>
            <Text>{this.state.comments}</Text>
        </View>
    };

    pressPostItem = () => {
        return this.renderComments;
    };

    renderPostItem = ({item, index}) => {
        const {users} = this.state;
        const {userId, body} = item;

        const {postHeader, postContainerOdd, postContainerEven, headerText} = styles;
        const headerStyle = index % 2 ? postContainerOdd : postContainerEven;
        const user = users[userId];
        const userName = user ? user.name : '';
        const userEmail = user ? user.email : '';
        return <TouchableOpacity
            onPress={this.pressPostItem}
            style={headerStyle}>
            <View style={postHeader}>
                <Text style={headerText}>{userName}</Text>
                <Text style={headerText}>{userEmail}</Text>
            </View>
            <Text>{body}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#4a1477',
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
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});

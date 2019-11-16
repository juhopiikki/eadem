import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

class Loop extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world!</Text>
            </View>
        );
    }
}

export default Loop;

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { stringLiteral } from '@babel/types';
import { IconButton } from 'react-native-paper';

class RecordItem extends Component {
    render() {
      return (
        <View style={{
          //borderWidth: 2, 
          //borderColor: 'steelblue', 
          // height: 80, 
          padding: 20,
          flexDirection: 'row',
          borderRadius: 5,
          flex: 1,
          alignItems: "flex-start",
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
          elevation: 3
        }}>
          <View style={{
              flex: 5,
            }}>
            <Text style={{fontFamily: 'NunitoSans_bold', fontSize: 15}}>{this.props.recordName}</Text>
            <Text>{this.props.recordAuthor}</Text>
          </View>
          <IconButton
            style={{
              flex: 1
            }}
            icon="play"
            color={'black'}
            size={30}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            style={{
              flex: 1,
              marginRight: 20
            }}
            icon="delete"
            color={'black'}
            size={30}
            onPress={() => console.log('Pressed')}
          />
        </View>
      );
    }
  }
  
export default RecordItem;

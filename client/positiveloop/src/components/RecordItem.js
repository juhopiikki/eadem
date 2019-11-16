import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { stringLiteral } from '@babel/types';
import { IconButton } from 'react-native-paper';

class RecordItem extends Component {
    render() {
      return (
        <View style={{
          borderRadius: 5,
          backgroundColor: '#fff',
          flex: 1,
          alignItems: "center",
          elevation: 10,
          marginBottom: 20
        }}>
          <View style={{
            flex: 1,
            padding: 20,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
          }}>
              <View style={{
                flex: 5,
              }}>
              <Text style={{
                fontFamily: 'NunitoSans_bold', 
                fontSize: 22
              }}>{this.props.recordName}</Text>
              <Text style={{
                fontFamily: 'NunitoSans', 
                fontSize: 18
              }}>{this.props.recordAuthor}</Text>
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
              }}
              icon="delete"
              color={'black'}
              size={30}
              onPress={() => console.log('Pressed')}
            />
          </View>

          
        </View>
      );
    }
  }
  
export default RecordItem;

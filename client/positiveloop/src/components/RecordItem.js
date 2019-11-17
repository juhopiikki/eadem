import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { stringLiteral } from '@babel/types';
import { IconButton } from 'react-native-paper';
import {connect} from 'react-redux'
import { setCurrentAuthor, setCurrentTitle, setCurrentAbout, setCurrentTrackId } from "../store/actions";

class RecordItem extends Component {

  render() {
      const setCurrentAuthorToRedux = this.props.setCurrentAuthor;
      const setCurrentTitleToRedux = this.props.setCurrentTitle;
      const setCurrentAboutToRedux = this.props.setCurrentAbout;
      const setCurrentTrackIdToRedux = this.props.setCurrentTrackId;
      console.log("RECORD ID: ", this.props.recordid)

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
              onPress={() => { setCurrentAuthorToRedux(this.props.recordAuthor);
                setCurrentTitleToRedux(this.props.recordName);  
                setCurrentAboutToRedux(this.props.about);
                setCurrentTrackIdToRedux(this.props.recordid);
              }}
            />
            <IconButton
              style={{
                flex: 1,
              }}
              icon="delete"
              color={'black'}
              size={30}
              onPress={() => console.log('Deleted')}
            />
          </View>

          
        </View>
      );
    }
  }

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { setCurrentAuthor, setCurrentTitle, setCurrentAbout, setCurrentTrackId })(RecordItem);
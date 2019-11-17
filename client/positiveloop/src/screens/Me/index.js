import React, { Component, useState } from 'react';
import {connect} from 'react-redux'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import {Navigation} from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from "../../assets/colors";
import RecordItem from '../../components/RecordItem'
import {setUserName, setUserDescription, sendUserNameToAPI, sendUserDescriptionToAPI} from '../../store/actions'
import API from '../../utils/api'
import {refreshRecords} from "../../index";

class Me extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    async componentDidAppear() {
        await refreshRecords();
        console.log('ME APPEAR')
    }

    render() {
        return (
            <View style={styles.main}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }} keyboardShouldPersistTaps='handled'>
                    <View style={styles.info}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>
                                My Profile
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.inputTitle}>
                                Name
                            </Text>
                            <TextInput underlineColorAndroid="transparent" style={styles.input}
                                       onChangeText={text => this.props.setUserName(text)}
                                       value={this.props.userName}
                                       onBlur={() =>  sendUserNameToAPI(this.props.userName)
                                       }
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.inputTitle}>
                                Little something about me
                            </Text>
                            <TextInput underlineColorAndroid="transparent" style={styles.input}
                                       onChangeText={text => this.props.setUserDescription(text)}
                                       value={this.props.userdescription}
                                       onBlur={() => sendUserDescriptionToAPI(this.props.userdescription)}
                            />
                        </View>
                    </View>
                    <View style={styles.recordings}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>
                                My Shared Recordings
                            </Text>
                        </View>
                        {
                            this.props.myRecords.map((recordItem) => (
                                <RecordItem
                                    key={recordItem.record.recordid}
                                    recordName={recordItem.record.title}
                                    recordAuthor={recordItem.user.username}
                                    about={recordItem.user.description}
                                    recordid={recordItem.record.recordid}
                                    liked={recordItem.record.likecount}
                                />
                            ))
                        }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
  userName: state.userName,
  userdescription: state.userdescription,
  myRecords: state.myRecords,
});

export default connect(mapStateToProps, { setUserName, setUserDescription })(Me);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.background
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        marginBottom: 40,
    },
    info: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    recordings: {
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    input: {
        fontFamily: 'NunitoSans',
        fontWeight: 'normal',
        height: 50,
        width: '100%',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        backgroundColor: colors.backgroundColor,
        paddingLeft: 0,
        marginLeft: 0,
        paddingHorizontal: 0,
        fontSize: 20,
    },
    inputTitle: {
        fontFamily: 'NunitoSans_bold',
        paddingBottom: 5,
        fontSize: 16,
    },
    titleRow: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontFamily: 'NunitoSans_bold',
        fontSize: 28
    }
});

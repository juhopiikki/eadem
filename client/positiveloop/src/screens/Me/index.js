import React, { useState } from 'react';
import {connect} from 'react-redux'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../../assets/colors";
import RecordItem from '../../components/RecordItem'
import { setUserName, setUserDescription } from '../../store/actions'

/*const userNameToState(userName) {
  console.log("Set username to redux and backend");
  setUserName(userName);
}*/

const Me = (props) => {
    const [userName, onChangeUserName] = React.useState(props.userName);
    const [description, onChangeDesc] = React.useState(props.userdescription);
    const setUserNameToRedux = props.setUserName
    const setUserDescriptionToRedux = props.setUserDescription

    return (
        <>
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
                          onChangeText={text => onChangeUserName(text)}
                          value={userName}
                          onBlur={() => setUserNameToRedux(userName) }
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.inputTitle}>
                            Little something about me
                        </Text>
                        <TextInput underlineColorAndroid="transparent" style={styles.input} 
                          onChangeText={text => onChangeDesc(text)}
                          value={description}
                          onBlur={() => setUserDescriptionToRedux(description) }
                        />
                    </View>
                </View>
                <View style={styles.recordings}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>
                            My Shared Recordings
                        </Text>
                    </View>
                    <RecordItem recordName="Positive Vibes" recordAuthor="Anonymous" />
                    <RecordItem recordName="Best day of my life" recordAuthor="Anonymous" />
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

const mapStateToProps = state => ({
  userName: state.userName,
  userdescription: state.userdescription,
});

export default connect(mapStateToProps, { setUserName, setUserDescription })(Me);

const styles = StyleSheet.create({
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
        backgroundColor: Colors.white,
    },
    recordings: {
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    input: {
        fontFamily: 'NunitoSans',
        fontWeight: 'normal',
        height: 40,
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

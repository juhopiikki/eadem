import React, {Component} from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../../assets/colors";
import RecordItem from '../../components/RecordItem'
import {connect} from 'react-redux'
import {Navigation} from "react-native-navigation";
import {refreshRecords} from "../../index";


class Saved extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    async componentDidAppear() {
        await refreshRecords();
        console.log('SAVED APPEAR')
    }

    render() {
        return (
            <View style={styles.main}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }} keyboardShouldPersistTaps='handled'>
                    <View style={styles.body}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>
                                Saved Recordings
                            </Text>
                        </View>
                        {
                            this.props.savedRecords.map((recordItem) => (
                                <RecordItem
                                    key={recordItem.record.recordid}
                                    recordName={recordItem.record.title}
                                    recordAuthor={recordItem.user.username}
                                    about={recordItem.user.description}
                                    recordid={recordItem.record.recordid}
                                />
                            ))
                        }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    };
}



const mapStateToProps = state => ({
    savedRecords: state.savedRecords
});

export default connect(mapStateToProps, {})(Saved);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        marginBottom: 40,
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
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

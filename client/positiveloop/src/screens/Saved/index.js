import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../../assets/colors";
import RecordItem from '../../components/RecordItem'


const Saved = () => {
    return (
        <>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }} keyboardShouldPersistTaps='handled'>
                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>
                            Saved Recordings
                        </Text>
                    </View>
                    <RecordItem recordName="I love life" recordAuthor="Seppo" />
                    <RecordItem recordName="Made my day" recordAuthor="Arttu" />
                    <RecordItem recordName="Beer is good" recordAuthor="Maija" />
                    <RecordItem recordName="Elämä on parasta huumetta" recordAuthor="Sirpa" />
                    <RecordItem recordName="Positive Vibes" recordAuthor="Anonymous" />
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start", 
        marginBottom: 40,
    },
    body: {
        padding: 40,
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

export default Saved;

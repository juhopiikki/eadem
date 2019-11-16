import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../../assets/colors";


const Me = () => {
    return (
        <>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }} keyboardShouldPersistTaps='handled'>
                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, styles.black]}>
                            My Profile
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.inputTitle, styles.black]}>
                            Name
                        </Text>
                        <TextInput underlineColorAndroid="transparent" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.inputTitle, styles.black]}>
                            Little something about me
                        </Text>
                        <TextInput underlineColorAndroid="transparent" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, styles.black]}>
                            My Shared Recordings
                        </Text>
                    </View>
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
        height: 40,
        width: '100%',
        borderBottomColor: '#000000', 
        borderBottomWidth: 1,
        backgroundColor: colors.backgroundColor,
        paddingLeft: 0,
        marginLeft: 0,
        paddingHorizontal: 0,
        fontSize: 18,
    },
    inputTitle: {
        paddingBottom: 5,
        fontSize: 14,
    },
    titleRow: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center", 
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
    },
    black: Platform.OS === 'ios' ? {
        fontWeight: '900'
      } : {
        fontFamily: 'Roboto-Black',
      },
});

export default Me;

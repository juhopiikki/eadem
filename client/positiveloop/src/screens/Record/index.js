import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../../assets/colors";


const App = () => {
    return (
        <>
            <SafeAreaView>
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput style={{ backgroundColor: colors.background }}></TextInput>
                    </View>

                    <Button icon="microphone" mode="contained" color={colors.buttonDefault} uppercase={false} onPress={() => console.log('Record')}>
                        Share
                        </Button>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
} from 'react-native';
import { ProgressBar, IconButton } from 'react-native-paper';
import {clearTrackDetails} from "../../store/actions";

class Loop extends Component {
    state = {
        playing: false,
    };

    render() {
        const {trackId, author, title, about, clearTrackDetails: clear} = this.props;
        const {playing} = this.state;
        return (
            <View style={styles.pageContainer}>
                <View style={styles.infoContainer}>
                <Text style={styles.titleText}>
                    {title || '--'}
                </Text>
                <Text style={styles.sharedText}>
                    {trackId ? 'Shared by' : null}
                </Text>
                <Text>
                    {about || '--'}
                </Text>
                </View>
                <View style={styles.trackContainer}>
                    <ProgressBar
                        visible={true}
                        progress={0.5}
                        color={'black'}
                        style={{height: 10, width: 300}}
                    />
                </View>
                <View style={styles.skipButtonContainer}>
                    <IconButton
                        icon="rewind-10"
                        color={'black'}
                        size={40}
                        onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                        icon="play"
                        color={'black'}
                        size={40}
                        onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                        icon="fast-forward-10"
                        color={'black'}
                        size={40}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                <View style={styles.playContainer}>
                    <IconButton
                        icon="heart-outline"
                        color={'black'}
                        size={36}
                        onPress={() => console.log('Pressed')}
                    />

                    <IconButton
                        icon="skip-next"
                        color={'black'}
                        size={36}
                        onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                        icon="content-save"
                        color={'black'}
                        size={36}
                        onPress={() => clear()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    trackId: state.currentTrackId,
    author: state.currentAuthor,
    about: state.currentAbout,
    title: state.currentTitle,
});

export default connect(mapStateToProps, {clearTrackDetails})(Loop);

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sharedText: {
        fontSize: 14,
        fontWeight: '300',
    },
    authorText: {
        fontSize: 14,
        fontWeight: '300',
    },
    aboutText: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
    },
    trackContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
    },
    skipButtonContainer: {
        flex: 1,
        width: 200,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingVertical: 0,
    },
    playContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 0,
        height: 100,
    },
    saveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingVertical: 0,
    }
});

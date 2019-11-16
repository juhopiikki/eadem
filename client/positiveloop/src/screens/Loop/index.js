import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image
} from 'react-native';
import { ProgressBar, IconButton } from 'react-native-paper';
import {getSavedRecords} from "../../store/actions";
import API from '../../utils/api'


class Loop extends Component {
    state = {
        playing: false,
        liked: false,
    };

    likeCurrentTrack() {
        const {trackId} = this.props;
        // const trackId = 'b55e5dfb-f4ab-4720-beb0-eece7d8421b2';
        if (trackId) {
            API.likeRecord(trackId,
                (sts) => console.log('likeRecord success?', sts)
            );
            this.setState({
                liked: true
            })
        } else {
            console.log('No track to like!')
        }
    }

    play = () => {
        this.setState({
            playing: true
        })
    }

    pause = () => {
        this.setState({
            playing: false
        })
    }

    render() {
        const {trackId, author, title, about, getSavedRecords: getSaved} = this.props;
        const {playing, liked} = this.state;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 5,
                paddingTop: 0
            }}>

                <View style={{
                    backgroundColor: 'skyblue',
                    height: 60,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Image
                        style={{
                            height: 30,
                            width: '100%',
                            resizeMode: 'contain'
                        }}
                        source={require('../../assets/images/backward.png')}
                    />
                </View>

                <View style={{
                    flex: 6,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'skyblue',
                    marginHorizontal: 20
                }}>
                    <Text style={{
                        fontFamily: 'NunitoSans_bold',
                        padding: 0,
                        fontSize: 34,
                    }}>
                        {title || ''}
                    </Text>
                    {author &&
                    <>
                    <Text style={{
                        fontFamily: 'NunitoSans',
                        padding: 5,
                        fontSize: 14,
                    }}>
                        {author ? 'Shared by' : ''}
                    </Text>
                    <Text style={{
                        fontFamily: 'NunitoSans_bold',
                        padding: 0,
                        fontSize: 20,
                    }}>
                        {author || ''}
                    </Text>
                    </>}
                    {(author && about) &&
                    <Text style={{
                        fontFamily: 'NunitoSans_italic',
                        padding: 5,
                        fontSize: 16,
                        textAlign: 'center',
                        marginHorizontal: 30
                    }}>
                        {about || ''}
                    </Text>}
                </View>


                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ProgressBar
                        visible={true}
                        progress={0.5}
                        color={'#F83E81'}
                        style={{height: 8, width: 300}}
                    />
                </View>

                {/* Control wrapper */}
                <View style={{
                    // backgroundColor: 'skyblue',
                    flex: 8,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                    marginBottom: 20
                }}>
                

                    {/* Forward backward buttons */}
                    <View style={{
                        // backgroundColor: 'skyblue',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                        marginBottom: 20
                    }}>
                        <View style={{
                            // backgroundColor: 'pink',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                icon={require('../../assets/images/backward.png')}
                                color={'black'}
                                size={40}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                        <View style={{
                            // backgroundColor: 'pink',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                icon={require('../../assets/images/forward.png')}
                                color={'black'}
                                size={40}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </View>
                    
                    
                    
                    
                    
                    {/* Save play next buttons */}
                    <View style={{
                        // backgroundColor: 'skyblue',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        marginBottom: 25
                    }}>
                        <View style={{
                            // backgroundColor: 'pink',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                icon={require('../../assets/images/save.png')}
                                color={'black'}
                                size={36}
                                onPress={() => getSaved('fbc05fb3-6504-45c4-b8fc-f1d0b574550a')}
                            />
                            <Text style={[styles.tinyLabel, {
                                bottom: -5
                            }]}>
                                Save
                            </Text>
                        </View>
                        <View style={{
                            // backgroundColor: 'pink',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {playing ?
                            <IconButton
                                icon={require('../../assets/images/pause.png')}
                                color={'#F83E81'}
                                size={75}
                                onPress={() => this.pause()}
                            />
                            :
                            <IconButton
                                icon={require('../../assets/images/play.png')}
                                color={'#F83E81'}
                                size={75}
                                onPress={() => this.play()}
                            />}
                            <Text style={styles.tinyLabel}>
                                {playing ? 'Pause' : 'Play'}
                            </Text>
                        </View>
                        <View style={{
                            // backgroundColor: 'pink',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                icon={require('../../assets/images/next.png')}
                                color={'black'}
                                size={36}
                                onPress={() => console.log('Pressed')}
                            />
                            <Text style={[styles.tinyLabel, {
                                bottom: -5
                            }]}>
                                Next
                            </Text>
                        </View>
                    </View>
                    
                    
                    
                    
                    {/* Like button */}
                    <View style={{
                        // backgroundColor: 'skyblue',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        marginBottom: 20
                    }}>
                        {liked ?
                        <IconButton
                            icon={require('../../assets/images/liked.png')}
                            color={'#F83E81'}
                            size={36}
                        />
                        :
                        <IconButton
                            icon={require('../../assets/images/like.png')}
                            color={'black'}
                            size={36}
                            onPress={() => this.likeCurrentTrack()}
                        />}
                        <Text style={[styles.tinyLabel, {
                                bottom: -5
                            }]}>
                            {liked ? 'Liked!' : 'Like'}
                        </Text>
                    </View>

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

export default connect(mapStateToProps, {getSavedRecords})(Loop);

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
        // justifyContent: "space-between",
        // alignItems: "center",
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
    },



    tinyLabel: {
        fontFamily: 'NunitoSans',
        fontSize: 12,
        position: 'absolute',
        bottom: 5
    }
});

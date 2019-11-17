import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { ProgressBar, IconButton, TouchableRipple } from 'react-native-paper';
import { getSavedRecords, setCurrentTitle, setCurrentAbout, setCurrentTrackId, setCurrentAuthor } from "../../store/actions";
import API from '../../utils/api'
import AudioPlayer from '../../utils/AudioPlayer';

class Loop extends Component {
    state = {
        playing: false,
        liked: false,
        progress: 0
    };

    componentWillUnmount() {
        if (this.interval !== undefined)
            clearInterval(this.interval)
    }

    useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }


    likeCurrentTrack() {
        const { trackId } = this.props;
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

    getRandomTrack = () => {
        const { 
            setCurrentTitle: setTitle, 
            setCurrentAbout: setAbout, 
            setCurrentTrackId: setTrackId, 
            setCurrentAuthor: setAuthor
         } = this.props;
        API.getRandomRecord((res) => {
            this.startPlayer(res.record.filesid);
            setTitle(res.record.title);
            setAbout(res.user.description);
            setTrackId(res.record.recordid);
            setAuthor(res.user.username);
        });
    }

    startPlayer(file) {
        console.log("starting playback with file: " + file);
        AudioPlayer.playUrl(file);
        if (this.interval !== undefined)
            clearInterval(this.interval)
        this.interval = setInterval(() => this.getProgress(), 100);

        this.setState({
            playing: true
        })
    }

    getProgress() {
        let progress = AudioPlayer.getProgress();
        if (progress == -1 && this.interval !== undefined) {
            this.finished();
        }
        
        this.setState({
            progress: progress
        });
    }

    finished = () => {
        if (this.interval !== undefined)
            clearInterval(this.interval)
        this.getRandomTrack();
    }

    play = () => {
        AudioPlayer.play();

        if (this.interval !== undefined)
            clearInterval(this.interval)
        this.interval = setInterval(() => this.getProgress(), 100);

        this.setState({
            playing: true
        })
    }

    pause = () => {
        if (this.interval !== undefined)
            clearInterval(this.interval)
        AudioPlayer.pause();
        this.setState({
            playing: false
        })
    }

    stop = () => {
        if (this.interval !== undefined)
            clearInterval(this.interval)
        AudioPlayer.stop();
        this.setState({
            playing: false
        })
    }

    render() {
        const { trackId, author, title, about, getSavedRecords: getSaved } = this.props;
        const { playing, liked } = this.state;
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
                    height: 60,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 10
                }}>
                    <Image
                        style={{
                            height: 14,
                            width: '100%',
                            resizeMode: 'contain'
                        }}
                        source={require('../../assets/images/logo.png')}
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
                        progress={this.state.progress}
                        color={'#F83E81'}
                        style={{ height: 8, width: 300 }}
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
                                <TouchableRipple
                                    borderless={true}
                                    onPress={() => this.pause()}
                                >
                                    <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/pause.png')}></Image>
                                </TouchableRipple>
                                :
                                <TouchableRipple
                                    borderless={true}
                                    onPress={() => this.play()}
                                >
                                    <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/play.png')}></Image>
                                </TouchableRipple>
                            }

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
                                onPress={() => this.getRandomTrack()}
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

export default connect(mapStateToProps, { getSavedRecords, setCurrentTitle, setCurrentAbout, setCurrentTrackId, setCurrentAuthor })(Loop);

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
        bottom: -20
    }
});

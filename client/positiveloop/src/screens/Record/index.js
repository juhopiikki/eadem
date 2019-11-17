import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressBar, Button, IconButton, TouchableRipple } from 'react-native-paper';
import colors from "../../assets/colors";
import AudioRecorder from '../../utils/AudioRecorder';

function useInterval(callback, delay) {
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

export default Record = () => {
    const audioRecorder = new AudioRecorder();
    const [title, setTitle] = React.useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecorded, sethasRecorded] = useState(false);
    const [timeRecorded, setTimeRecorded] = useState(0);


    useInterval(() => {
      setTimeRecorded(timeRecorded + 1);
    }, isRecording ? 1000 : null);

    const play = () => {
      setIsPlaying(true)
    }

    const pause = () => {
      setIsPlaying(false)
    }

    const record = () => {
      setIsRecording(true)
      // audioRecorder.record()
    }

    const stopRecord = () => {
      setIsRecording(false)
      sethasRecorded(true)
      setTimeRecorded(0)
      // audioRecorder.record()
    }

    const restartRecording = () => {
      setIsRecording(false)
      sethasRecorded(false)
      setTimeRecorded(0)
      setIsPlaying(false)
      // audioRecorder.record()
    }

    return (
        <>
        {/* <View style={styles.main}> */}
            <KeyboardAwareScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps='handled'>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>

                <View style={{
                  height: 80,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 30,
                  // backgroundColor: 'skyblue'
                }}>
                  {hasRecorded &&
                  <>
                  <IconButton
                      icon={require('../../assets/images/restart.png')}
                      color={'black'}
                      size={30}
                      onPress={() => restartRecording()}
                  />
                  <Text style={[styles.tinyLabel, {
                      bottom: 0
                  }]}>
                      Restart recording
                  </Text>
                  </>}
                </View>

                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  paddingHorizontal: 30,
                  // backgroundColor: 'skyblue'
                }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{
                        backgroundColor: colors.background,
                        fontFamily: 'NunitoSans_bold',
                        width: '100%',
                        borderBottomColor: '#000000',
                        borderBottomWidth: 1,
                        backgroundColor: colors.backgroundColor,
                        textAlign: 'center',
                        fontSize: 30,
                      }}
                      maxLength={40}
                      placeholder="Title"
                      // placeholderTextColor="white"
                      onChangeText={text => {
                        if(text.length <= 50){
                          setTitle(text)
                        }
                      }}
                      value={title}
                    />
                </View>




                <View style={{
                    // backgroundColor: 'pink',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <View style={{
                        // backgroundColor: 'pink',
                        height: 40,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                      {hasRecorded ?
                      <ProgressBar
                        visible={true}
                        progress={0.5}
                        color={'#F83E81'}
                        style={{ height: 8, width: 300 }}
                      />
                      :
                      <Text style={{
                        fontFamily: 'NunitoSans_bold',
                        fontSize: 18
                      }}>
                          {isRecording ? `${('0' + (Math.floor(timeRecorded/60))).slice(-2)}:${('0' + (timeRecorded%60)).slice(-2)}` : ''}
                      </Text>
                      }
                    </View>


                    {!hasRecorded ?
                    <View style={{
                        // backgroundColor: 'pink',
                        height: 100,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                      {isRecording ?
                          <TouchableRipple
                              borderless={true}
                              onPress={() => stopRecord()}
                          >
                              <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/stop-record.png')}></Image>
                          </TouchableRipple>
                          :
                          <TouchableRipple
                              borderless={true}
                              onPress={() => record()}
                          >
                              <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/record.png')}></Image>
                          </TouchableRipple>
                      }

                      <Text style={styles.tinyLabel}>
                          {isRecording ? 'Stop recording' : 'Start recording'}
                      </Text>
                    </View>

                      :

                    <View style={{
                        // backgroundColor: 'pink',
                        height: 100,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10
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
                          {isPlaying ?
                          <TouchableRipple
                              borderless={true}
                              onPress={() => pause()}
                          >
                              <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/pause.png')}></Image>
                          </TouchableRipple>
                          :
                          <TouchableRipple
                              borderless={true}
                              onPress={() => play()}
                          >
                              <Image style={{ width: 75, height: 75 }} source={require('../../assets/images/play.png')}></Image>
                          </TouchableRipple>
                          }

                          <Text style={styles.tinyLabel}>
                              {isRecording ? 'Play' : 'Play'}
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
                                icon={require('../../assets/images/forward.png')}
                                color={'black'}
                                size={40}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </View>
                  }

                </View>








                <View style={{
                  flex: 1,
                  justifyContent: 'flex-end'
                }}>
                    <Button
                        mode="contained"
                        color={colors.buttonDefault}
                        uppercase={false}
                        style={{
                          marginBottom: 60,
                          borderRadius: 6
                        }}
                        contentStyle={{ paddingHorizontal: 36, paddingVertical: 8 }}
                        labelStyle={{
                          fontSize: 22,
                          fontFamily: 'NunitoSans_bold',
                        }}
                        onPress={() => console.log('Share')}
                    >
                        Share
                    </Button>
                </View>
            </View>
            </KeyboardAwareScrollView>
        {/* </View> */}
        </>
    );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
},
  tinyLabel: {
      fontFamily: 'NunitoSans',
      fontSize: 12,
      position: 'absolute',
      bottom: -20
  }
});


 /**
 * Sample React Native Audio Toolkit App
 * https://github.com/react-native-community/react-native-audio-toolkit
 *
 * @format
 * @flow
 */

/* import React, { Component } from 'react';
import { Button, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import { ProgressBar } from 'react-native-paper';

const filename = 'test.mp4';

type Props = {};

type State = {
  playPauseButton: string,
  recordButton: string,

  stopButtonDisabled: boolean,
  playButtonDisabled: boolean,
  recordButtonDisabled: boolean,

  loopButtonStatus: boolean,
  progress: number,

  error: string | null
};

export default class Record extends Component<Props, State> {
  player: Player | null;
  recorder: Recorder | null;
  lastSeek: number;
  _progressInterval: IntervalID;

  constructor(props: Props) {
    super(props);

    this.state = {
      playPauseButton: 'Preparing...',
      recordButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,

      error: null
    };
  }

  componentWillMount() {
    this.player = null;
    this.recorder = null;
    this.lastSeek = 0;

    this._reloadPlayer();
    this._reloadRecorder();

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        let currentProgress = Math.max(0, this.player.currentTime) / this.player.duration;
        if (isNaN(currentProgress)) {
          currentProgress = 0;
        }
        this.setState({ progress: currentProgress });
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this._progressInterval);
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200;
  }

  _updateState(err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',

      stopButtonDisabled: !this.player || !this.player.canStop,
      playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
    });
  }

  _playPause() {
    this.player.playPause((err, paused) => {
      if (err) {
        this.setState({
          error: err.message
        });
      }
      this._updateState();
    });
  }

  _stop() {
    this.player.stop(() => {
      this._updateState();
    });
  }

  _seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      this._updateState();
    });
  }

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(filename, {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      } else {
        this.player.looping = this.state.loopButtonStatus;
      }

      this._updateState();
    });

    this._updateState();

    this.player.on('ended', () => {
      this._updateState();
    });
    this.player.on('pause', () => {
      this._updateState();
    });
  }

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder(filename, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max'
    });

    this._updateState();
  }

  _toggleRecord() {
    if (this.player) {
      this.player.destroy();
    }

    let recordAudioRequest;
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission();
    } else {
      recordAudioRequest = new Promise(function (resolve, reject) { resolve(true); });
    }

    recordAudioRequest.then((hasPermission) => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied'
        });
        return;
      }

      this.recorder.toggleRecord((err, stopped) => {
        if (err) {
          this.setState({
            error: err.message
          });
        }
        if (stopped) {
          this._reloadPlayer();
          this._reloadRecorder();
        }

        this._updateState();
      });
    });
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  _toggleLooping(value) {
    this.setState({
      loopButtonStatus: value
    });
    if (this.player) {
      this.player.looping = value;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            Playback
          </Text>
        </View>
        <View >
          <Button title={this.state.playPauseButton} disabled={this.state.playButtonDisabled} onPress={() => this._playPause()} />
          <Button title={'Stop'} disabled={this.state.stopButtonDisabled} onPress={() => this._stop()} />
        </View>
        <View style={styles.settingsContainer}>
          <Switch
            onValueChange={(value) => this._toggleLooping(value)}
            value={this.state.loopButtonStatus} />
          <Text>Toggle Looping</Text>
        </View>
        <View style={styles.slider}>
          <Progress step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} />
        </View>
        <View>
          <Text style={styles.title}>
            Recording
          </Text>
        </View>
        <View>
          <Button title={this.state.recordButton} disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()} />
        </View>
        <View>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 50,
  },
  settingsContainer: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color: 'red'
  }
}); */

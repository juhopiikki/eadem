import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressBar, Button, IconButton, TouchableRipple } from 'react-native-paper';
import colors from "../../assets/colors";
import AudioRecorder from '../../utils/AudioRecorder';
import AudioPlayer from '../../utils/AudioPlayer';
import API from '../../utils/api';
import { getUserKey } from '../../index';

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
    const [title, setTitle] = React.useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecorded, sethasRecorded] = useState(false);
    const [timeRecorded, setTimeRecorded] = useState(0);
    const [recordFileId, setRecordFileId] = useState('');


    useInterval(() => {
      setTimeRecorded(timeRecorded + 1);
    }, isRecording ? 1000 : null);

    const play = () => {
      setIsPlaying(true)
      if (recordFileId) {
        AudioPlayer.playFile(recordFileId);
      }
    }

    const pause = () => {
      setIsPlaying(false)
      AudioPlayer.pause();
    }

    const record = () => {
      setIsRecording(true)
      AudioRecorder.record()
    }

    const stopRecord = () => {
      setIsRecording(false)
      sethasRecorded(true)
      setTimeRecorded(0)
      setRecordFileId(AudioRecorder.stop());
    }

    const restartRecording = () => {
      setIsRecording(false)
      sethasRecorded(false)
      setTimeRecorded(0)
      setIsPlaying(false)
      setRecordFileId('');
    }

    const shareRecording = async () => {
      const userId = await getUserKey();
      API.uploadAudio(recordFileId, (fileId) => API.createRecord({ usersid: userId, "filesid": fileId, title: title }, () => console.log("Record created")));
      setTitle('')
      restartRecording()
    }

    return (
        <>
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
                    onChangeText={text => {
                      if(text.length <= 50){
                        setTitle(text)
                      }
                    }}
                    value={title}
                  />
              </View>




              <View style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
              }}>

                  <View style={{
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
                      height: 100,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10
                  }}>
                    <View style={{
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
                      onPress={() => shareRecording()}
                  >
                      Share
                  </Button>
              </View>
          </View>
          </KeyboardAwareScrollView>
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
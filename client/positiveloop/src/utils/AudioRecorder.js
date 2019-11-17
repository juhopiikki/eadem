import { Recorder } from '@react-native-community/audio-toolkit';
import { Date } from 'core-js';
import { Alert, PermissionsAndroid } from 'react-native';

var recorder: Recorder;

export default class AudioRecorder {

    /** Check if required permissions are granted
     * @returns {boolean} permissions granted?
     */
    static async checkPermissions() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permission to record audio',
                        message: 'Audio recording permission needed',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true;
                } else {
                    Alert.alert(
                        'Microphone',
                        'Microphone permission is required for this feature',
                        [{ text: 'OK', style: 'cancel' }]
                    );
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    }

    /**
     * Start recording audio to a file
     * @param {function} callback when the player is started
    */
    static async record(callBack) {

        // Check permission before trying to record
        const permission = await AudioPlayer.checkPermissions();
        if (!permission)
            return;

        AudioRecorder.stop();

        // Create recorder and start recording
        recorder = new Recorder(AudioPlayer.getName(), {
            bitrate: 128000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
        }).record(callBack);
    }

    /**
     * Stop and get path to saved recording
     * @param {function} callback when the player is started
    */
    static stop(callBack): string {
        if (recorder === undefined)
            return null;
        const filePath = recorder.fsPath;
        recorder.stop(callBack);
        return filePath;
    }

    static getName() {
        return "recording-" + Date.now() + ".aac";
    }
}
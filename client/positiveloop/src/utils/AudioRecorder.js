import { Recorder } from '@react-native-community/audio-toolkit';
import { Date } from 'core-js';
import { Alert, PermissionsAndroid } from 'react-native';
import API from './api';

export default class AudioRecorder {
    recorder: Recorder = null;

    constructor() {
        this.checkPermissions();
    }

    async checkPermissions() {
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

    getName() {
        return "recording-" + Date.now() + ".aac";
    }

    async record() {
        await this.checkPermissions();
        // Recorder initialised, stop (and destroy) before creating new
        if (this.recorder !== null) {
            this.stop();
        }

        // Create recorder and start recording
        this.recorder = new Recorder(this.getName(), {
            bitrate: 25000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
        }).record();
    }

    /** Stop and get path to saved recording */
    stop(): string {
        const filePath = this.recorder.fsPath;
        this.recorder.stop();
        API.uploadudio(filePath, "tuubaa");
        return filePath;
    }
}
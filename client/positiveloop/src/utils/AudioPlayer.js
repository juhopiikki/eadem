import { Player } from '@react-native-community/audio-toolkit';


export default class AudioPlayer {
    player: Player = null;

    /**
     * Play file from local storage
     * @param {string} fileName the audio file name on local storage 
     */
    playFile(fileName) {
        this.player = new Player(filePath, {
            continuesToPlayInBackground: false
        }).play();
    }

    /**
     * Play file straight from server 
     * @param {string} fileId the audio file id on server 
     */
    playUrl(fileId) {
        this.player = new Player("http://54.229.97.181:8080/mental/file/" + fileId, {
            continuesToPlayInBackground: false
        }).play();
    }

    /** Stop playing the audio */
    stop() {
        if (this.player !== null)
            this.player.stop();
    }
}
import { Player } from '@react-native-community/audio-toolkit';

var player: Player;

export default class AudioPlayer {

    /**
     * Play file from local storage
     * @param {string} fileName the audio file name on local storage
     * @param {function} callBack when the player is started
     */
    static playFile(fileName, callBack) {
        AudioPlayer.startPlayer(fileName, callBack);
    }

    /**
     * Play file straight from server 
     * @param {string} trackId the audio file id on server 
     * @param {function} callBack when the player is started
     */
    static playUrl(trackId, callBack) {
        AudioPlayer.startPlayer("http://54.229.97.181:8080/mental/file/" + trackId, callBack);
    }

    /**
     * Get relative progress of the player
     * @returns {number} the current progress between [0, 1]
     */
    static getProgress() {
        if (player.duration <= 0)
            return 0;
        return player.currentTime / player.duration;
    }

    /**
    * Get relative progress of the player
    * @returns {number} the current play time in milliseconds
    */
    static getTime() {
        return player.currentTime;
    }

    /**
    * Seek to time
    * @param {number} position [0, 1]
    * @returns {number} current time in milliseconds
    */
    static seek(position) {
        player.seek(position);
        return player.currentTime;
    }

    /**
    * Seek to relative time / progress
    * @param {number} position in milliseconds to seek to
    * @returns {number} current relative time / progress [0, 1]
    */
    static seekRelative(position) {
        player.seek(position);
        return player.currentTime;
    }

    /**
     * Pauses playing the audio
     * @param {function} callBack when the player is paused
    */
    static pause(callBack) {
        if (player !== undefined)
            player.pause(callBack);
    }

    /**
     * Stop playing the audio
     * @param {function} callBack when the player is stopped
    */
    static stop(callBack) {
        if (player !== undefined && player.canStop)
            player.stop(callBack);
    }

    static startPlayer(file, callBack) {
        AudioPlayer.stop();
        player = new Player(file, {
            continuesToPlayInBackground: true,
            wakeLock: true,

        }).play(callBack);
    }
}
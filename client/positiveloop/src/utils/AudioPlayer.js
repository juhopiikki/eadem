import { Player } from '@react-native-community/audio-toolkit';

var player: Player;

export default class AudioPlayer {

    /**
     * Play file from local storage
     * @param {string} fileName the audio file name on local storage
     * @param {function} callBack when the player is started
     */
    static playFile(fileName, callBack) {
        AudioPlayer.createPlayer(fileName, callBack);
    }

    /**
     * Play file straight from server 
     * @param {string} trackId the audio file id on server 
     * @param {function} callBack when the player is started
     */
    static playUrl(trackId, play, callBack) {
        AudioPlayer.createPlayer("http://54.229.97.181:8080/mental/file/" + trackId, play, callBack);
    }

    /**
     * Check if a track is currently playing
     * @param {function} callBack containing if the audio was paused or started
     */
    static playPause(callBack) {
        if (player !== undefined) {
            player.playPause(callBack);
        }
    }

    /**
     * Play / start current track
     * @param {function} callBack containing if the audio was started
     */
    static play(callBack) {
        if (player !== undefined && !player.isPlaying && player.canPlay) {
            player.play(callBack);
        }
    }

    /**
     * Check if a track is currently playing
     * @param {function} callBack containing if the audio was paused
     */
    static pause(callBack) {
        if (player !== undefined && !player.isPaused) {
            player.pause(callBack);
        }
    }

    /**
     * Check if a track is currently playing
     * @return {boolean} is a track currently playing
     */
    static isPlaying() {
        return player !== undefined ? player.isPlaying : false;
    }

    /**
     * Check if a track is currently paused
     * @return {boolean} is a track currently paused
     */
    static isPaused() {
        return player !== undefined ? player.isPaused : false;
    }

    /**
     * Check if a track is currently stopped
     * @return {boolean} is a track currently stopped
     */
    static isStopped() {
        return player !== undefined ? player.isStopped : true;
    }

    /**
     * Get relative progress of the player
     * @returns {number} the current progress between [0, 1]
     */
    static getProgress() {
        if (player === undefined || player.currentTime < 0 || player.duration <= 0)
            return -1;
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

    static createPlayer(file, play, callBack) {
      var process = () => {
        player = new Player(file, {
            continuesToPlayInBackground: false,
        });
        if (play)
            player.play(callBack);
        else
            player.prepare(callBack);
      };
      if (player) {
        player.destroy(process);
      } else {
        process();
      }
    }
}

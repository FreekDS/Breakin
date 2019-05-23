export default class AudioHandler {
    constructor() {
        this.sounds = {};
        this.numberOfThemes = 0;
        this.currentTheme = 0;
    }

    addSound(path_to_sound, name, loop = false) {
        let audio = new Audio(path_to_sound);
        if(loop) {
            audio.loop = true;
            audio.preload = true;
            audio.volume = 0.2;
        }
        this.sounds[name] = audio;
    }

    playSound(name) {
        if (this.sounds.hasOwnProperty(name)) {
            this.stopSound(name);
            this.sounds[name].play().catch(function () {
            });
            return true;
        } else
            console.error("No such sound loaded " + name);
        return false;
    }

    stopSound(name) {
        if (this.sounds.hasOwnProperty(name)) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        } else {
            console.error("No such sound loaded " + name);
        }
    }

    stopAll() {
        for (let key in this.sounds)
            if (this.sounds.hasOwnProperty(key))
                this.sounds[key].pause();
    }

    addTheme(path_to_sound) {
        this.addSound(path_to_sound, "theme" + this.numberOfThemes.toString(), true);
        this.numberOfThemes++;
    }

    stopTheme(number) {
        this.stopSound("theme" + number);
    }

    playTheme(number) {
        if(this.currentTheme === number)
            return;
        this.stopTheme(this.currentTheme);
        if(this.playSound("theme" + number.toString()))
            this.currentTheme = number;
    }

}
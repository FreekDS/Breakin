export default class AudioHandler {
    constructor() {
        this.sounds = {}
    }

    addSound(path_to_sound, name) {
        this.sounds[name] = new Audio(path_to_sound);
    }

    playSound(name) {
        if(this.sounds.hasOwnProperty(name)) {
            this.stopSound(name);
            this.sounds[name].play().catch(function () {
                console.log("test");
            });
        }
        else
            console.error("No such sound loaded " + name);

    }

    stopSound(name) {
        if(this.sounds.hasOwnProperty(name)){
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
        else{
            console.error("No such sound loaded " + name);
        }
    }

    stopAll() {
        for (let key in this.sounds)
            if (this.sounds.hasOwnProperty(key))
                this.sounds[key].pause();
    }
}
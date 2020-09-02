import { assetServer } from "./asset-server";
declare var Sk: any;

export class BrowserSoundManager {
    audioContext: AudioContext;
    runningPerformances: Array<BrowserSoundPerformance>;

    constructor() {
        const AudioContext = window.AudioContext;
        this.audioContext = new AudioContext();
        this.runningPerformances = [];
    }

    // Snake-case name is what Skulpt/Pytch expects.
    //
    async async_load_sound(tag: string, name: string) {
        const audioData = await assetServer.loadSoundData(name);
        const audioBuffer = await this.audioContext.decodeAudioData(audioData);
        return new BrowserSound(this, tag, audioBuffer);
    }

    registerRunningPerformance(performance: BrowserSoundPerformance) {
        this.runningPerformances.push(performance);
    }

    stopAllPerformances() {
        this.runningPerformances.forEach(p => p.stop());
        this.runningPerformances = [];
    }

    oneFrame() {
        this.runningPerformances
            = this.runningPerformances.filter(p => (! p.hasEnded));
    }

    createBufferSource() {
        let bufferSource = this.audioContext.createBufferSource();
        bufferSource.connect(this.audioContext.destination);
        return bufferSource;
    }
}

class BrowserSound {
    constructor(
        readonly parentSoundManager: BrowserSoundManager,
        readonly tag: string,
        readonly audioBuffer: AudioBuffer,
    ) {
    }

    launchNewPerformance(): BrowserSoundPerformance {
        let soundManager = this.parentSoundManager;

        let performance = new BrowserSoundPerformance(this);
        soundManager.registerRunningPerformance(performance);

        return performance;
    }

    createSourceNode(): AudioBufferSourceNode {
        let soundManager = this.parentSoundManager;
        let bufferSource = soundManager.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        return bufferSource;
    }
}

class BrowserSoundPerformance {
    tag: string;
    sourceNode: AudioBufferSourceNode;
    hasEnded: boolean;

    constructor(sound: BrowserSound) {
        this.tag = sound.tag;
        this.sourceNode = sound.createSourceNode();

        this.hasEnded = false;
        this.sourceNode.onended = () => { this.hasEnded = true; };

        this.sourceNode.start();
    }

    stop() {
        this.sourceNode.stop();
        this.hasEnded = true;
    }
}

// Chrome (and possibly other browsers) won't let you create a running
// AudioContext unless you're doing so in response to a user gesture.  We
// therefore defer creation and connection of the global Skulpt/Pytch sound
// manager until first 'BUILD'.  The default Pytch sound-manager has a
// 'do-nothing' implementation of one_frame(), so we can safely call it in
// the main per-frame function below.

let browserSoundManager: BrowserSoundManager | null = null;

export const ensureSoundManager = () => {
    if (browserSoundManager === null) {
        browserSoundManager = new BrowserSoundManager();
        Sk.pytch.sound_manager = browserSoundManager;
    }
};
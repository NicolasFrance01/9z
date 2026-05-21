// Motor de audio en silencio para mantener el portal limpio y sin ruidos innecesarios

export const audioEngine = {
    init() {},
    toggle(_enabled: boolean): boolean {
        return false;
    },
    isAudioEnabled(): boolean {
        return false;
    },
    playHover() {},
    playClick() {},
    playNotification() {},
    startAmbientHum() {},
    stopAmbientHum() {}
};

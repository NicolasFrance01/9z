// Motor Sintetizador Físico de Audio en tiempo real (Web Audio API)
// Diseñado para no requerir descargas de archivos de audio

let audioCtx: AudioContext | null = null;
let audioEnabled = false;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

export const audioEngine = {
    // Inicializa el contexto
    init() {
        try {
            getAudioContext();
        } catch (e) {
            console.warn("No se pudo iniciar Web Audio Context:", e);
        }
    },

    // Activa/Desactiva el audio y arranca/detiene el drone ambiental
    toggle(enabled: boolean): boolean {
        audioEnabled = enabled;
        getAudioContext();
        
        if (audioEnabled) {
            this.playNotification();
            this.startAmbientHum();
        } else {
            this.stopAmbientHum();
        }
        
        return audioEnabled;
    },

    isAudioEnabled(): boolean {
        return audioEnabled;
    },

    // Blip rápido para hover
    playHover() {
        if (!audioEnabled) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
            
            gain.gain.setValueAtTime(0.015, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {
            // Ignorar errores menores del reproductor
        }
    },

    // Swoosh decreciente para clic
    playClick() {
        if (!audioEnabled) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
            
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } catch (e) {}
    },

    // Arpegio chiptune de notificación o victoria
    playNotification() {
        if (!audioEnabled) return;
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde de Do Mayor (C5, E5, G5, C6)
            
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + (index * 0.08));
                
                gain.gain.setValueAtTime(0.04, now + (index * 0.08));
                gain.gain.exponentialRampToValueAtTime(0.0001, now + (index * 0.08) + 0.16);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now + (index * 0.08));
                osc.stop(now + (index * 0.08) + 0.16);
            });
        } catch (e) {}
    },

    // Iniciar drone de fondo (Hum de servidor/nave espacial)
    startAmbientHum() {
        try {
            const ctx = getAudioContext();
            ambientOsc1 = ctx.createOscillator();
            ambientOsc2 = ctx.createOscillator();
            ambientGainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            
            ambientOsc1.type = 'sawtooth';
            ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime); // Frecuencia fundamental 55Hz (La1)
            
            ambientOsc2.type = 'square';
            ambientOsc2.frequency.setValueAtTime(55.4, ctx.currentTime); // Desafinado sutil para batimiento analógico
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(100, ctx.currentTime); // Corta agudos ásperos
            filter.Q.setValueAtTime(4, ctx.currentTime);
            
            ambientGainNode.gain.setValueAtTime(0.035, ctx.currentTime); // Muy sutil
            
            ambientOsc1.connect(filter);
            ambientOsc2.connect(filter);
            filter.connect(ambientGainNode);
            ambientGainNode.connect(ctx.destination);
            
            ambientOsc1.start();
            ambientOsc2.start();
        } catch (e) {
            console.warn("No se pudo iniciar el Hum ambiental:", e);
        }
    },

    // Detener drone de fondo de forma suavizada
    stopAmbientHum() {
        try {
            if (ambientGainNode && audioCtx) {
                ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
                const osc1 = ambientOsc1;
                const osc2 = ambientOsc2;
                setTimeout(() => {
                    if (osc1) osc1.stop();
                    if (osc2) osc2.stop();
                }, 400);
            }
            ambientOsc1 = null;
            ambientOsc2 = null;
            ambientGainNode = null;
        } catch (e) {}
    }
};

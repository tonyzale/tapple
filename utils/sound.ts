class SoundManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.3; // Master volume
    }
  }

  public playClick() {
    this.init();
    if (!this.audioContext || !this.gainNode) return;

    const osc = this.audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
    
    const env = this.audioContext.createGain();
    env.connect(this.gainNode);
    env.gain.setValueAtTime(1, this.audioContext.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    osc.connect(env);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  public playTick(isLow: boolean) {
    this.init();
    if (!this.audioContext || !this.gainNode) return;

    const osc = this.audioContext.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isLow ? 600 : 1000, this.audioContext.currentTime);
    
    const env = this.audioContext.createGain();
    env.connect(this.gainNode);
    env.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    osc.connect(env);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  public playBuzzer() {
    this.init();
    if (!this.audioContext || !this.gainNode) return;

    const osc = this.audioContext.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 0.5);
    
    const env = this.audioContext.createGain();
    env.connect(this.gainNode);
    env.gain.setValueAtTime(1, this.audioContext.currentTime);
    env.gain.linearRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);

    osc.connect(env);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.8);
  }
}

export const soundManager = new SoundManager();

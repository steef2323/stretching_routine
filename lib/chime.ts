let audioContext: AudioContext | null = null;

export function initAudio(): void {
  if (typeof window === "undefined") return;

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
}

export function playChime(): void {
  if (typeof window === "undefined" || !audioContext) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.frequency.value = 523.25;
  osc.type = "sine";

  const now = audioContext.currentTime;
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

  osc.start(now);
  osc.stop(now + 0.9);
}

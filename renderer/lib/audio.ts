import { Timer } from "./timer";

export default class Audio {
  private ctx: AudioContext;
  private analyserNode: AnalyserNode;
  private sourceNode: MediaStreamAudioSourceNode = null;
  private data: Uint8Array;

  constructor(fftSize: number) {
    this.ctx = new AudioContext();
    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = fftSize;
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
  }

  setStream(stream: MediaStream) {
    this.sourceNode = this.ctx.createMediaStreamSource(stream);
    this.sourceNode.connect(this.analyserNode);
  }

  unsetStream() {
    this.analyserNode.disconnect();
    if (this.sourceNode != null) this.sourceNode.disconnect();
  }

  getData(): Uint8Array {
    this.analyserNode.getByteFrequencyData(this.data);
    return this.data;
  }

  startStream(
    deviceId: string,
    interval: number,
    callback: (data: Uint8Array) => void
  ) {
    this.unsetStream();
    Timer.clear();

    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: deviceId } })
      .then((stream) => {
        this.setStream(stream);
        const timer = setInterval(() => {
          callback(this.getData());
        }, interval);
        Timer.addTimer(timer);
      });
  }
}

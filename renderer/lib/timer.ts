const timers: NodeJS.Timeout[] = [];

export class Timer {
  static addTimer(timer: NodeJS.Timeout) {
    timers.push(timer);
  }

  static clear() {
    while (timers.length > 0) {
      const timer = timers.pop();
      clearInterval(timer);
    }
  }
}

const MissionUtils = require('@woowacourse/mission-utils');

class App {
  #computer;
  constructor() {}

  printGameStart() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
  }

  generateRandomNumbers() {
    this.#computer = [];
    while (this.#computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!this.#computer.includes(number)) {
        this.#computer.push(number);
      }
    }
  }

  play() {
    this.printGameStart();
    this.generateRandomNumbers();
  }
}

const app = new App();
app.play();
module.exports = App;

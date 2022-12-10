const MissionUtils = require('@woowacourse/mission-utils');

class App {
  #computer;
  constructor() {
    this.callbackUserNumber = this.callbackUserNumber.bind(this);
  }

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

  inputUserNumber() {
    MissionUtils.Console.readLine(
      '숫자를 입력해주세요 : ',
      this.callbackUserNumber
    );
  }

  convertNumberInput(userinput) {
    return userinput.split('').map(Number);
  }

  callbackUserNumber(userinput) {
    this.convertNumberInput(userinput);
  }

  play() {
    if (!this.#computer) {
      this.printGameStart();
    }

    this.generateRandomNumbers();
    this.inputUserNumber();
  }
}

const app = new App();
app.play();
module.exports = App;

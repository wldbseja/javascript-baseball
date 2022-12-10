const MissionUtils = require('@woowacourse/mission-utils');
const { NUMBER, PRINT_STRING, PRINT_ERROR_STRING } = require('./constants');

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

  checkNumberCount(userNumber) {
    const setUserNumber = new Set(userNumber);
    if (setUserNumber.size < 3) {
      throw Error('[ERROR] 숫자가 중복 되어 프로그램이 종료 됩니다.');
    }
  }

  checkNumberLength(userNumber) {
    if (userNumber.length !== 3) {
      throw Error('[ERROR] 3개의 숫자가 아니므로 프로그램이 종료 됩니다.');
    }
  }

  checkNumberRange(userNumber) {
    for (let i = 0; i < userNumber.length; i++) {
      if (!(userNumber[i] > 0 && userNumber[i] <= 9)) {
        throw Error(
          '[ERROR] 1부터 9까지의 숫자가 아니므로 프로그램이 종료 됩니다.'
        );
      }
    }
  }

  checkUserNumber(userNumber) {
    this.checkNumberCount(userNumber);
    this.checkNumberLength(userNumber);
    this.checkNumberRange(userNumber);
  }

  countStrike(userNumber, computer) {
    let countStrike = 0;
    for (let i = 0; i < userNumber.length; i++) {
      if (userNumber[i] === computer[i]) {
        countStrike++;
      }
    }
    return countStrike;
  }

  countBall(userNumber, computer) {
    let countBall = 0;
    for (let i = 0; i < userNumber.length; i++) {
      if (
        computer[i] !== userNumber[i] &&
        computer.indexOf(userNumber[i]) !== -1
      ) {
        countBall++;
      }
    }
    return countBall;
  }

  printResultCount(strikeCount, ballCount) {
    let resultString;
    const STRIKE_COUNT = `${strikeCount}스트라이크`;
    const BALL_COUNT = `${ballCount}볼`;
    const BLANK = ' ';
    if (ballCount > 0) resultString = BALL_COUNT;
    if (strikeCount > 0) resultString = STRIKE_COUNT;
    if (ballCount > 0 && strikeCount > 0)
      resultString = BALL_COUNT + BLANK + STRIKE_COUNT;
    if (ballCount === 0 && strikeCount === 0) resultString = '낫싱';
    MissionUtils.Console.print(resultString);
  }

  callbackUserNumber(userinput) {
    const userNumber = this.convertNumberInput(userinput);
    this.checkUserNumber(userNumber);
    const strikeCount = this.countStrike(userNumber, this.#computer);
    const ballCount = this.countBall(userNumber, this.#computer);
    this.printResultCount(strikeCount, ballCount);
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

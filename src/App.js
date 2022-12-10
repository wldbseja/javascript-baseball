const MissionUtils = require('@woowacourse/mission-utils');
const { NUMBER, PRINT_STRING, PRINT_ERROR_STRING } = require('./constants');

class App {
  #computer;
  constructor() {
    this.callbackUserNumber = this.callbackUserNumber.bind(this);
    this.inputGameRestart = this.inputGameRestart.bind(this);
  }

  printGameStart() {
    MissionUtils.Console.print(PRINT_STRING.GAME_START);
  }

  generateRandomNumbers() {
    this.#computer = [];
    while (this.#computer.length < NUMBER) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!this.#computer.includes(number)) {
        this.#computer.push(number);
      }
    }
  }

  inputUserNumber() {
    MissionUtils.Console.readLine(
      PRINT_STRING.INPUT_NUMBER,
      this.callbackUserNumber
    );
  }

  convertNumberInput(userinput) {
    return userinput.split('').map(Number);
  }

  checkNumberCount(userNumber) {
    const setUserNumber = new Set(userNumber);
    if (setUserNumber.size < NUMBER) {
      throw Error(PRINT_ERROR_STRING.ERROR_DUPLE);
    }
  }

  checkNumberLength(userNumber) {
    if (userNumber.length !== NUMBER) {
      throw Error(PRINT_ERROR_STRING.ERROR_LENGTH);
    }
  }

  checkNumberRange(userNumber) {
    for (let i = 0; i < userNumber.length; i++) {
      if (!(userNumber[i] > 0 && userNumber[i] <= 9)) {
        throw Error(PRINT_ERROR_STRING.ERROR_RANGE);
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
    return resultString;
  }

  strikeMethodCall(strikeCount) {
    if (strikeCount === NUMBER) {
      this.printGameRestart();
    } else {
      this.inputUserNumber();
    }
  }

  printGameRestart() {
    MissionUtils.Console.print(PRINT_STRING.GAME_OVER);
    MissionUtils.Console.readLine(
      PRINT_STRING.GAME_RESTART,
      this.inputGameRestart
    );
  }

  inputGameRestart(inputRestart) {
    if (inputRestart === '1') this.play();

    if (inputRestart === '2') MissionUtils.Console.close();

    if (inputRestart !== '1' && inputRestart !== '2')
      throw Error(PRINT_ERROR_STRING.EROOR_INPUT_GAME_RESTART);
  }

  callbackUserNumber(userinput) {
    const userNumber = this.convertNumberInput(userinput);
    this.checkUserNumber(userNumber);
    const strikeCount = this.countStrike(userNumber, this.#computer);
    const ballCount = this.countBall(userNumber, this.#computer);
    this.printResultCount(strikeCount, ballCount);
    this.strikeMethodCall(strikeCount);
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

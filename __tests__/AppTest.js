const App = require('../src/App');
const MissionUtils = require('@woowacourse/mission-utils');

describe(' 에러 테스트 ', () => {
  test('사용자 입력 값 중복 테스트', () => {
    const app = new App();

    expect(() => app.checkNumberCount([2, 2, 3])).toThrow();
    expect(() => app.checkNumberCount([4, 5, 5])).toThrow();

    expect(() => app.checkNumberCount([1, 2, 3])).not.toThrow();
    expect(() => app.checkNumberCount([4, 5, 6])).not.toThrow();
  });

  test('사용자 입력 값 개수 테스트', () => {
    const app = new App();

    expect(() => app.checkNumberLength([1, 2, 3, 4])).toThrow();
    expect(() => app.checkNumberLength([4, 5, 6, 7])).toThrow();

    expect(() => app.checkNumberLength([1, 2, 3])).not.toThrow();
    expect(() => app.checkNumberLength([4, 5, 6])).not.toThrow();
  });

  test('사용자 입력 값 범위 테스트', () => {
    const app = new App();

    expect(() => app.checkNumberRange([0, 2, 3])).toThrow();
    expect(() => app.checkNumberRange([4, 5, h])).toThrow();

    expect(() => app.checkNumberRange([1, 2, 3])).not.toThrow();
    expect(() => app.checkNumberRange([4, 5, 6])).not.toThrow();
  });
});

describe(' 기능 테스트 ', () => {
  test('스트라이크 개수 테스트', () => {
    const app = new App();

    expect(app.countStrike([1, 2, 3], [1, 3, 4])).toEqual(1);
    expect(app.countStrike([1, 2, 3], [1, 2, 4])).toEqual(2);
    expect(app.countStrike([1, 2, 3], [1, 2, 3])).toEqual(3);
  });

  test('스트라이크 출력 테스트', () => {
    const app = new App();

    expect(app.printResultCount(1, 0)).toEqual('1스트라이크');
    expect(app.printResultCount(2, 0)).toEqual('2스트라이크');
    expect(app.printResultCount(3, 0)).toEqual('3스트라이크');
  });

  test('볼 개수 테스트', () => {
    const app = new App();

    expect(app.countBall([1, 2, 3], [4, 3, 5])).toEqual(1);
    expect(app.countBall([1, 2, 3], [4, 3, 2])).toEqual(2);
    expect(app.countBall([1, 2, 3], [2, 3, 1])).toEqual(3);
  });

  test('볼 출력 테스트', () => {
    const app = new App();

    expect(app.printResultCount(0, 1)).toEqual('1볼');
    expect(app.printResultCount(0, 2)).toEqual('2볼');
    expect(app.printResultCount(0, 3)).toEqual('3볼');
  });
});

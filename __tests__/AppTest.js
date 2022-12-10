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
});

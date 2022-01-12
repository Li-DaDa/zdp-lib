import testHandler from '../index'

test('functionTest函数输入输出测试', () => {
  expect(testHandler('a')).toBe('a!!!');
})

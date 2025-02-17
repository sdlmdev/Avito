import {getQueryParams} from './changeQueryParams';

describe('Тесты changeQueryParams', () => {
  test('Тест с одним параметром', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });

  test('Тест с несколькими параметрами', () => {
    const params = getQueryParams({
      test: 'value',
      second: '2',
    });

    expect(params).toBe('?test=value&second=2');
  });

  test('Тест с undefined', () => {
    const params = getQueryParams({
      test: 'value',
      second: undefined,
    });

    expect(params).toBe('?test=value');
  });
});

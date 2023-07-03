import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import { join } from 'path';

jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout - 1);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toBeCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval - 1);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1);

    expect(callback).toBeCalled();

    jest.advanceTimersByTime(interval - 1);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';

    await readFileAsynchronously(pathToFile);

    expect(join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});

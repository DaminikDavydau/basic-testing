import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

// Mock the functions in the module
jest.mock('./index', () => {
  return {
    ...jest.requireActual('./index'),
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalledTimes(1);
    expect(mockTwo).toHaveBeenCalledTimes(1);
    expect(mockThree).toHaveBeenCalledTimes(1);

    // Ensure that console.log is not called
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(unmockedFunction).toHaveBeenCalledTimes(1);

    // Ensure that console.log is called with the expected value
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});

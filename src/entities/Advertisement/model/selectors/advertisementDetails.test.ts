import {StateScheme} from 'app/providers/StoreProvider';

import {
  getAdvertisementDetailsData,
  getAdvertisementDetailsError,
  getAdvertisementDetailsIsLoading,
} from './advertisementDetails';

describe('articleDetails.test', () => {
  test('should return data', () => {
    const data = {
      id: '1',
      title: 'subtitle',
    };

    const state: DeepPartial<StateScheme> = {
      advertisementDetails: {
        // data,
      },
    };

    expect(getAdvertisementDetailsData(state as StateScheme)).toEqual(data);
  });

  test('should work with empty state data', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getAdvertisementDetailsData(state as StateScheme)).toEqual(
      undefined,
    );
  });

  test('should return error', () => {
    const state: DeepPartial<StateScheme> = {
      advertisementDetails: {
        error: 'error',
      },
    };

    expect(getAdvertisementDetailsError(state as StateScheme)).toEqual('error');
  });

  test('should work with empty state error', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getAdvertisementDetailsError(state as StateScheme)).toEqual(
      undefined,
    );
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateScheme> = {
      advertisementDetails: {
        isLoading: true,
      },
    };

    expect(getAdvertisementDetailsIsLoading(state as StateScheme)).toEqual(
      true,
    );
  });

  test('should work with empty state isLoading', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getAdvertisementDetailsIsLoading(state as StateScheme)).toEqual(
      false,
    );
  });
});

import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {User, userActions} from 'entities/User';

interface RegisterProps {
  username: string;
  password: string;
}

export const register = createAsyncThunk<
  User,
  RegisterProps,
  ThunkConfig<string>
>('register/register', async (authData, thunkAPI) => {
  const {extra, dispatch, rejectWithValue} = thunkAPI;

  try {
    const response = await extra.api.post<User>('/register', authData);

    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setUserData(response.data));

    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

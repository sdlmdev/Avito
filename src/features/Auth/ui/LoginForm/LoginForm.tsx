import cn from 'classnames';
import {FormEvent, memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {login} from 'features/Auth/model/services/login/login';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useForceUpdate} from 'shared/lib/render/forceUpdate';
import {Button, ButtonSize} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input/Input';
import {Text} from 'shared/ui/Text';

import {getLoginError} from '../../model/selectors/getLoginError/getLoginError';
import {getLoginIsLoading} from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import {getLoginPassword} from '../../model/selectors/getLoginPassword/getLoginPassword';
import {getLoginUsername} from '../../model/selectors/getLoginUsername/getLoginUsername';
import {loginActions, loginReducer} from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: VoidFunction;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = await dispatch(login({username, password}));

      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
        forceUpdate();
      }
    },
    [dispatch, forceUpdate, onSuccess, password, username],
  );

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <form onSubmit={onLogin} className={cn(styles.LoginForm, className)}>
        <Text title={t('Вход')} size="m" bold />
        <div className={styles.inputs}>
          <Input
            value={username}
            onChange={onChangeUsername}
            autofocus
            type="text"
            placeholder={t('Логин')}
          />
          <Input
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder={t('Пароль')}
          />
        </div>
        <div className={styles.submitContainer}>
          <Button
            isLoading={isLoading}
            type="submit"
            className={styles.loginBtn}
            size={ButtonSize.M}
          >
            {t('Войти')}
          </Button>
          {error && <Text text={t('Произошла ошибка')} variant="error" />}
        </div>
      </form>
    </DynamicModuleLoader>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;

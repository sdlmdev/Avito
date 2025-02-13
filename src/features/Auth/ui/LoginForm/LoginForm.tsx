import cn from 'classnames';
import {FormEvent, memo, MouseEvent, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {login} from 'features/Auth/model/services/login/login';
import {register} from 'features/Auth/model/services/register/register';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useForceUpdate} from 'shared/lib/render/forceUpdate';
import {Button, ButtonSize, ButtonTheme} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input/Input';
import {Text} from 'shared/ui/Text';

import {getLoginError} from '../../model/selectors/getLoginError/getLoginError';
import {getLoginIsLoading} from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import {getLoginPassword} from '../../model/selectors/getLoginPassword/getLoginPassword';
import {getLoginUsername} from '../../model/selectors/getLoginUsername/getLoginUsername';
import {getRegisterError} from '../../model/selectors/getRegisterError/getRegisterError';
import {getRegisterIsLoading} from '../../model/selectors/getRegisterIsLoading/getRegisterIsLoading';
import {getRegisterPassword} from '../../model/selectors/getRegisterPassword/getRegisterPassword';
import {getRegisterUsername} from '../../model/selectors/getRegisterUsername/getRegisterUsername';
import {loginActions, loginReducer} from '../../model/slices/login/loginSlice';
import {
  registerActions,
  registerReducer,
} from '../../model/slices/register/registerSlice';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: VoidFunction;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
  registerForm: registerReducer,
};

const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const usernameLogin = useSelector(getLoginUsername);
  const passwordLogin = useSelector(getLoginPassword);
  const isLoadingLogin = useSelector(getLoginIsLoading);
  const errorLogin = useSelector(getLoginError);
  const usernameRegister = useSelector(getRegisterUsername);
  const passwordRegister = useSelector(getRegisterPassword);
  const isLoadingRegister = useSelector(getRegisterIsLoading);
  const errorRegister = useSelector(getRegisterError);
  const forceUpdate = useForceUpdate();

  const onRegisterClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegistered((prev) => !prev);
  }, []);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(
        isRegistered
          ? loginActions.setUsername(value)
          : registerActions.setUsername(value),
      );
    },
    [dispatch, isRegistered],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(
        isRegistered
          ? loginActions.setPassword(value)
          : registerActions.setPassword(value),
      );
    },
    [dispatch, isRegistered],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const action = isRegistered ? login : register;

      const result = await dispatch(
        action({
          username: isRegistered ? usernameLogin : usernameRegister,
          password: isRegistered ? passwordLogin : passwordRegister,
        }),
      );

      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
        forceUpdate();
      }
    },
    [
      dispatch,
      forceUpdate,
      onSuccess,
      passwordLogin,
      passwordRegister,
      usernameLogin,
      usernameRegister,
      isRegistered,
    ],
  );

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <form onSubmit={onSubmit} className={cn(styles.LoginForm, className)}>
        <Text
          title={isRegistered ? t('Вход') : t('Регистрация')}
          size="m"
          bold
        />
        <div className={styles.inputs}>
          <Input
            value={isRegistered ? usernameLogin : usernameRegister}
            onChange={onChangeUsername}
            autofocus
            type="text"
            placeholder={t('Логин')}
          />
          <Input
            value={isRegistered ? passwordLogin : passwordRegister}
            onChange={onChangePassword}
            type="password"
            placeholder={t('Пароль')}
          />
        </div>
        <div className={styles.submitContainer}>
          <Button
            isLoading={isRegistered ? isLoadingLogin : isLoadingRegister}
            type="submit"
            className={styles.loginBtn}
            size={ButtonSize.M}
          >
            {isRegistered ? t('Войти') : t('Зарегистрироваться')}
          </Button>
          {(isRegistered ? errorLogin : errorRegister) && (
            <Text text={t('Произошла ошибка')} variant="error" />
          )}
        </div>
        <div className={styles.footer}>
          <Button theme={ButtonTheme.CLEAR} onClick={onRegisterClick}>
            {isRegistered
              ? t('Нет аккаунта? Зарегистрироваться')
              : t('Уже есть аккаунт? Войти')}
          </Button>
        </div>
      </form>
    </DynamicModuleLoader>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;

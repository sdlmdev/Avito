import cn from 'classnames';
import {
  FormEvent,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {getAuthError} from 'features/Auth/model/selectors/getAuthError/getAuthError';
import {getAuthIsLoading} from 'features/Auth/model/selectors/getAuthIsLoading/getAuthIsLoading';
import {getAuthPassword} from 'features/Auth/model/selectors/getAuthPassword/getAuthPassword';
import {getAuthUsername} from 'features/Auth/model/selectors/getAuthUsername/getAuthUsername';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useForceUpdate} from 'shared/lib/render/forceUpdate';
import {Button, ButtonSize, ButtonTheme} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input/Input';
import {Text} from 'shared/ui/Text';

import {login} from '../../model/services/login/login';
import {register} from '../../model/services/register/register';
import {authActions, authReducer} from '../../model/slices/auth/authSlice';
import styles from './AuthForm.module.scss';

export interface AuthFormProps {
  className?: string;
  onSuccess: VoidFunction;
}

const initialReducers: ReducersList = {
  authForm: authReducer,
};

const AuthForm = memo(({className, onSuccess}: AuthFormProps) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const usernameAuth = useSelector(getAuthUsername);
  const passwordAuth = useSelector(getAuthPassword);
  const isLoadingAuth = useSelector(getAuthIsLoading);
  const errorAuth = useSelector(getAuthError);
  const forceUpdate = useForceUpdate();

  const onRegisterClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(authActions.resetState());
      setIsRegistered((prev) => !prev);
    },
    [dispatch],
  );

  const validateForm = useCallback(() => {
    setIsFormValid(usernameAuth.length >= 4 && passwordAuth.length >= 4);
  }, [usernameAuth, passwordAuth]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(authActions.setUsername(value));
      validateForm();
    },
    [dispatch, validateForm],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(authActions.setPassword(value));
      validateForm();
    },
    [dispatch, validateForm],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const action = isRegistered ? login : register;

      const result = await dispatch(
        action({
          username: usernameAuth,
          password: passwordAuth,
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
      passwordAuth,
      usernameAuth,
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
            value={usernameAuth}
            onChange={(e) => onChangeUsername(e.target.value)}
            autofocus
            type="text"
            placeholder={t('Логин')}
            maxLength={20}
            minLength={4}
            required
          />
          <Input
            value={passwordAuth}
            onChange={(e) => onChangePassword(e.target.value)}
            type="password"
            placeholder={t('Пароль')}
            maxLength={20}
            minLength={4}
            required
          />
        </div>
        <div className={styles.submitContainer}>
          <Button
            isLoading={isLoadingAuth}
            type="submit"
            className={styles.loginBtn}
            size={ButtonSize.M}
            disabled={!isFormValid}
          >
            {isRegistered ? t('Войти') : t('Зарегистрироваться')}
          </Button>
          {errorAuth && <Text text={t('Произошла ошибка')} variant="error" />}
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

AuthForm.displayName = 'AuthForm';

export default AuthForm;

import cn from 'classnames';
import {InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';

import CloseEye from '../../assets/icons/eye-password-hide.svg';
import OpenEye from '../../assets/icons/eye-password-show.svg';
import styles from './Input.module.scss';

export enum InputSize {
  S = 's',
  M = 'm',
}

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  autofocus?: boolean;
  inputSize?: InputSize;
  onChange?: (value: string) => void;
  value?: string | number;
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type,
    autofocus,
    inputSize = InputSize.M,
    ...props
  }: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    useEffect(() => {
      if (autofocus) {
        inputRef.current?.focus();
      }
    }, [autofocus]);

    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          className={cn(styles.input, styles[inputSize])}
          ref={inputRef}
          type={isPasswordVisible && type === 'password' ? 'text' : type}
          onChange={onChangeHandler}
          value={value}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <OpenEye /> : <CloseEye />}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

import cn from 'classnames';
import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  label?: string;
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type,
    autofocus,
    inputSize = InputSize.M,
    label,
    ...props
  }: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
      if (autofocus) {
        inputRef.current?.focus();
      }
    }, [autofocus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const handleBlur = () => {
      if (inputRef.current) {
        inputRef.current.reportValidity();
      }
    };

    const inputElement = (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          className={cn(styles.input, styles[inputSize])}
          ref={inputRef}
          type={isPasswordVisible && type === 'password' ? 'text' : type}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
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

    return (
      <>
        {label ? (
          <label className={styles.label}>
            {label}
            {inputElement}
          </label>
        ) : (
          inputElement
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

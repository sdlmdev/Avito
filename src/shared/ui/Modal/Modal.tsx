import cn from 'classnames';
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {Portal} from 'shared/ui/Portal';

import CloseBtn from '../../assets/icons/x-close.svg';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: (isOpen?: boolean) => void;
  isLazy?: boolean;
}

export const Modal = ({
  className,
  children,
  isOpen = false,
  onClose,
  isLazy,
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const handleClose = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      if (onClose) {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  const onContentClick = (e: ReactMouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (!isMounted && isLazy) {
    return null;
  }

  return (
    <Portal>
      <div
        className={cn(styles.Modal, className, {[styles.opened]: isOpen})}
        onClick={handleClose}
      >
        <div className={styles.content} onClick={onContentClick}>
          {children}
          <button className={styles.closeBtn} onClick={handleClose}>
            <CloseBtn />
          </button>
        </div>
      </div>
    </Portal>
  );
};

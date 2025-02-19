import {Suspense} from 'react';

import {AuthFormAsync} from 'features/Auth/ui/AuthForm/AuthForm.async';

import {Loader} from 'shared/ui/Loader';
import {Modal} from 'shared/ui/Modal';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({className, isOpen, onClose}: LoginModalProps) => {
  return (
    <Modal className={className} isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loader />}>
        <AuthFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};

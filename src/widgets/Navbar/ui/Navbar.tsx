import {routePath} from 'app/providers/router/config/routeConfig';
import cn from 'classnames';
import {getUserData} from 'entities/User';
import {memo, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {LoginModal} from 'features/Auth';
import {AvatarDropdown} from 'features/AvatarDropdown';
import {LangSwitcher} from 'features/LangSwitcher';

import {AppLink} from 'shared/ui/AppLink';
import {Button} from 'shared/ui/Button';
import {Logo} from 'shared/ui/Logo';

import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
  const {t} = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const userData = useSelector(getUserData);

  const changeVisibilityAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <header className={cn(styles.Navbar, className)}>
      <Link to={routePath.main}>
        <Logo />
      </Link>

      <div className={styles.navigation}>
        <LangSwitcher />
        {userData && (
          <>
            <AppLink to={routePath.form}>{t('Разместить объявление')}</AppLink>
            <AvatarDropdown />
          </>
        )}
        {!userData && (
          <Button onClick={changeVisibilityAuthModal}>
            {t('Вход и регистрация')}
          </Button>
        )}
      </div>
      {isAuthModalOpen && (
        <LoginModal
          isOpen={isAuthModalOpen}
          onClose={changeVisibilityAuthModal}
        />
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';

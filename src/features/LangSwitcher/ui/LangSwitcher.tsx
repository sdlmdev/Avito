import cn from 'classnames';
import {useTranslation} from 'react-i18next';

import {Button, ButtonTheme} from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
  const {t, i18n} = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      theme={ButtonTheme.OUTLINE}
      onClick={toggleLanguage}
      className={cn(className)}
    >
      {t('Язык')}
    </Button>
  );
};

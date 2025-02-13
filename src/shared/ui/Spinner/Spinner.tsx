import LogoBubbles from '../../assets/icons/bubblesLogo.svg';
import LogoText from '../../assets/icons/logo.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.Logo}>
      <LogoBubbles />
      <LogoText />
    </div>
  );
};

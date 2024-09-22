import logo from '@/assets/logo.png';
import classes from '@/components/sample/syled-login/Header.module.css';

const Header = () => {
  return (

    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      {/* 모듈화된 css 클래스 사용. 해당 컴포넌트에 스코프해서 css적용 */}
      <p className={classes.paragraph}>A community of artists and art-lovers.</p>
    </header>
  );
}

export default Header;

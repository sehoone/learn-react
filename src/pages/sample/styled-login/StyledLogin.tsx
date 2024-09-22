import Header from '@/components/sample/syled-login/ModuleHeader';

/**
 * tailwind 방식
 * 장점:
 * 1. 미리 정의된 클래스를 사용하여 빠르게 스타일링 가능
 * 2. css 를 작성하지 않아도 되어서 빠르게 개발 가능
 * 
 * 단점:
 * 1. tsx에 많은 클래스 네임이 적용되어 가독성이 떨어짐
 * 2. 학습곡선. tailwindcss 클래스의 이해 필요
 * 3. 커스텀 스타일링이 어려움
 */
import TailWindAuthInputs from '@/components/sample/syled-login/TailWindAuthInputs';

/**
 * styled-components 방식
 * 장점: 
 * 1. Scoped Styles 컴포넌트 단위로 정의됨
 * 2. Props를 통해 동적 스타일링 가능
 * 
 * 단점:
 * 1. CSS-in-JS 방식으로 CSS를 작성해야 함
 * 2. CSS 파일을 분리할 수 없음
 * 3. CSS 파일을 분리할 수 없어서 코드 스플리팅이 어려움
 */
// import StyledComponentInput from '@/components/sample/syled-login/StyledComponentInput';

/* vanilla css 방식(css를 직접 import하는 방식)
 * 장점: 
 * 1. 기존의 css 파일을 그대로 사용할 수 있음
 * 2. CSS 파일을 분리할 수 있음
 * 3. 코드 스플리팅이 가능
 * 
 * 단점:
 * 1. Scoped Styles을 사용할 수 없음(전역으로 style이 적용됨)
 */
// import VanillaInput from '@/components/sample/syled-login/VanillaInput';

/**
 * 모듈 방식
 * 장점:
 * 1. CSS 파일을 분리할 수 있음
 * 2. 코드 스플리팅이 가능
 * 3. Scoped Styles 컴포넌트 단위로 정의됨. classname이 해쉬로 변환되어 스코프됨
 * 
 * 단점:
 * 1. Props를 통한 동적 스타일링이 어려움
 * 
 */

const SyteledLogin = () => {
  return (
    <>
      <Header />
      <TailWindAuthInputs />
    </>
  )
}

export default SyteledLogin;
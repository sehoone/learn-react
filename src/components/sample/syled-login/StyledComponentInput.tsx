import { useState } from 'react';
import { styled } from 'styled-components';

import Button from './StyledButton';
import Input from './StyledInput';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

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
export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier: string, value: string) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        <Input
          invalid={passwordNotValid}
          label="Password"
          type="password"
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
        />
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}

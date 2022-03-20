/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [validators, setValidators] = useState({
    length: false,
    number: false,
    upperCase: false,
    specialChar: false
  });

  const inputRef = useRef();
  const validator = (param, value) =>
    setValidators((prevState) => ({ ...prevState, [param]: value }));

  const verifyPassword = () => {
    password.length > 7
      ? validator('length', true)
      : validator('length', false);

    password.search(/[A-Z]/) > -1
      ? validator('upperCase', true)
      : validator('upperCase', false);

    password.search(/[0-9]/) > -1
      ? validator('number', true)
      : validator('number', false);

    password.search(/[$&+,:;=?@#]/) > -1
      ? validator('specialChar', true)
      : validator('specialChar', false);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const deleteChar = (e) => {
    if (e.key === 'Backspace') {
      setPassword((prevState) => prevState.slice(0, -1));
    }
  };
  useEffect(() => {
    verifyPassword(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleType = () => setIsVisible((prevState) => !prevState);
  return (
    <div className="App">
      <main>
        <div className="container">
          <h5>CREATE YOUR PASSWORD</h5>
          <form>
            <label htmlFor="password">
              {' '}
              <input
                type={isVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onKeyDown={deleteChar}
                ref={inputRef}
              />
              <button
                type="button"
                className="showPassword"
                onClick={handleType}
              >
                {isVisible ? 'Hide' : 'Show'}
              </button>
            </label>
          </form>
          <section>
            <div
              className={
                validators.number ? 'green requirement' : 'requirement'
              }
            >
              <span className="rule">1</span>
              <span>Number</span>
            </div>
            <div
              className={
                validators.upperCase ? 'green requirement' : 'requirement'
              }
            >
              <span className="rule">A</span>
              <span>Uppercase</span>
            </div>
            <div
              className={
                validators.specialChar ? 'green requirement' : 'requirement'
              }
            >
              <span className="rule">@</span>
              <span>Special</span>
            </div>
            <div
              className={
                validators.length ? 'green requirement' : 'requirement'
              }
            >
              <span className="rule">8+</span>
              <span>Characters</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default App;

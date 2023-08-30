import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './RegisterStyle.css';
import CrossIcon from '../Login/svg/CrossIcon';
import ErrorIcon from '../Login/svg/ErrorIcon';
import NotEyeIcon from '../Login/svg/NotEyeIcon';
import EyeIcon from '../Login/svg/EyeIcon';
import countryData from './PhoneCodes.json';
import ArrowDownDark from '../Login/svg/ArrowDownDark';
import VerticalLine from '../Login/svg/VerticalLine';
import GoogleIcon from '../Login/svg/GoogleIcon';
import FacebookIcon from '../Login/svg/FacebookIcon';

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} ></div>;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

const Register=()=> {
  const MIN_PASSWORD_LENGTH = 8;
  const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]+$/;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageSurname, setErrorMessageSurname] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [errorMessagePswrd, setErrorMessagePswrd] = useState('');
  const [errorMessageCheck, setErrorMessageCheck] = useState('');

  const [NameErrorIcon, setNameErrorIcon] = useState(false);
  const [SurnameErrorIcon, setSurnameErrorIcon] = useState(false);
  const [EmailErrorIcon, setEmailErrorIcon] = useState(false);
  const [PhoneErrorIcon, setPhoneErrorIcon] = useState(false);
  const [PswrdErrorIcon, setPswrdErrorIcon] = useState(false);

  const [NameBorderColor, setNameBorderColor] = useState('');
  const [SurnameBorderColor, setSurnameBorderColor] = useState('');
  const [EmailBorderColor, setEmailBorderColor] = useState('');
  const [PhoneBorderColor, setPhoneBorderColor] = useState('');
  const [PswrdBorderColor, setPswrdBorderColor] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(countryData[227]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrorIcon(false);
    setEmailBorderColor('');
    setErrorMessageEmail('');
  };
  const handleNameChange = (event) => {
    const inputName = event.target.value;
    const limitedName = inputName.slice(0, 15);
    setName(limitedName);
    setNameErrorIcon(false);
    setNameBorderColor('');
    setErrorMessageName('');
  };
  const handleSurnameChange = (event) => {
    const inputSurname = event.target.value;
    const limitedSurname = inputSurname.slice(0, 15);
    setSurname(limitedSurname);
    setSurnameErrorIcon(false);
    setSurnameBorderColor('');
    setErrorMessageSurname('');
  };

  const handlePhoneChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const digitsOnlyPhoneNumber = inputPhoneNumber.replace(/\D/g, ''); // Remove non-digit characters
    const limitedPhoneNumber = digitsOnlyPhoneNumber.slice(0, 9);
    setPhoneNumber(limitedPhoneNumber);
    setPhoneErrorIcon(false);
    setPhoneBorderColor('');
    setErrorMessagePhone('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPswrdErrorIcon(false);
    setPswrdBorderColor('');
    setErrorMessagePswrd('');
  };
  
  const handleClose = async () => {};
  const handleGoogle = async () => {};
  const handleFacebook = async () => {};

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    setErrorMessageCheck('');
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleRegister =async (event) => {
    event.preventDefault();
    let isCorrect=0;

    if (name.length < 3 || name.length > 15) {
      setErrorMessageName('Ім\'я повинно містити від 3 до 15 символів');
      setNameErrorIcon(true);
      setNameBorderColor('red');
    } else {
      setErrorMessageName('');
      setNameErrorIcon(false);
      setNameBorderColor('');
      isCorrect++;
    }

    if (surname.length < 3 || surname.length > 15) {
      setErrorMessageSurname('Прізвище повинно містити від 3 до 15 символів');
      setSurnameErrorIcon(true);
      setSurnameBorderColor('red');
    } else {
      setErrorMessageSurname('');
      setSurnameErrorIcon(false);
      setSurnameBorderColor('');
      isCorrect++;
    }

    if(email.length===0)
    {
      setErrorMessageEmail('Введіть електронну пошту');
      setEmailErrorIcon(true);
      setEmailBorderColor('red');
    }
    else{
      setErrorMessageEmail('');
      setEmailErrorIcon(false);
      setEmailBorderColor('');
      isCorrect++;
    }

    if(phoneNumber.length===0)
    {
      setErrorMessagePhone('Введіть номер телефону');
      setPhoneErrorIcon(true);
      setPhoneBorderColor('red');
    }
    else{
      setErrorMessagePhone('');
      setPhoneErrorIcon(false);
      setPhoneBorderColor('');
      isCorrect++;
    }
    if(password.length===0)
    {
      setErrorMessagePswrd('Невірний пароль');
      setPswrdErrorIcon(true);
      setPswrdBorderColor('red');

    }
    else{
      if (password.length < MIN_PASSWORD_LENGTH) {
        setErrorMessagePswrd(`Пароль повинен містити мінімум ${MIN_PASSWORD_LENGTH} символів`);
        setPswrdErrorIcon(true);
        setPswrdBorderColor('red');
      } else if (!PASSWORD_PATTERN.test(password)) {
        setErrorMessagePswrd('Пароль повинен містити мінімум одну велику літеру, одну маленьку літеру, одну цифру та один спеціальний символ');
        setPswrdErrorIcon(true);
        setPswrdBorderColor('red');
      } else {
        setErrorMessagePswrd('');
        setPswrdErrorIcon(false);
        setPswrdBorderColor('');
        isCorrect++;
      }
    }
    if (!isCheckboxChecked) {
      setErrorMessageCheck('Ви не погодились з використанням даних');
    }
    else{
      isCorrect++;
    }

    if(isCorrect===6)
    {
      //window.location.href = `/login`;
      const fullPhoneNumber = `${selectedItem.dialCode}-${phoneNumber}`;

      const response = await fetch("https://localhost:44394/api/Account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,surname,phoneNumber:fullPhoneNumber, email, password }),
      });
      if (response.ok) {
        window.location.href = `/login`;
      }
      else
      {
        if(response.status===301)
        {
          setErrorMessageName('Реєстрація невдала');
          setNameErrorIcon(true);
          setNameBorderColor('red');
        }
      }
    }
  }

  return (
      <div className='register-body'>
        <div className='register-div'>
          <div className='register-label'>
            <label className='register-label-h'>Реєстрація</label>
            <button className="cross-button" onClick={handleClose}>
              <CrossIcon/>
            </button>
          </div>
          <div className='register-body-h'>
            <div className='register-body-left'>
              <div className='left-one'>
                <div className="left-post">
                  <label className="text-left-post">Ім'я</label>
                  <input className="input-left-post" type="text" 
                    value={name} 
                    onChange={handleNameChange}
                    style={{borderColor:NameBorderColor}} />
                    {NameErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                </div>
                <div className='error-email'>
                  {errorMessageName && <label className="error-message">{errorMessageName}</label>}
                </div>
                <div className="left-post">
                  <label className="text-left-post">Прізвище</label>
                  <input className="input-left-post" type="text" 
                    value={surname} 
                    onChange={handleSurnameChange}
                    style={{borderColor:SurnameBorderColor}} />
                    {SurnameErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                </div>
                <div className='error-email'>
                  {errorMessageSurname && <label className="error-message">{errorMessageSurname}</label>}
                </div>
                <div className="left-post">
                  <label className="text-left-post">Ел.пошта</label>
                  <input className="input-left-post" type="email" 
                    value={email} 
                    onChange={handleEmailChange}
                    style={{borderColor:EmailBorderColor}} />
                    {EmailErrorIcon && <label className='error-icon-email'><ErrorIcon/></label>}
                </div>
                <div className='error-email'>
                  {errorMessageEmail && <label className="error-message">{errorMessageEmail}</label>}
                </div>
              </div>
              <div>
                <div className="left-post">
                  <label className="text-left-post">Номер телефону</label>
                  <div className="code-country">
                    <div className='code-dropdown-header'>
                      <div className= {`code-main-select-item ${isOpen ? 'open' : ''}`} onClick={handleToggleDropdown}>
                        <img src={selectedItem.flag} alt={selectedItem.name} width={32} height={32}></img>
                        <label>{selectedItem.dialCode}</label>
                        <label className='code-main-arrow-down'><ArrowDownDark/></label>
                      </div>
                      <input className="input-right-phone" type="text" placeholder='000000000'
                        value={phoneNumber} 
                        onChange={handlePhoneChange}
                        style={{borderColor:PhoneBorderColor}} />
                        {PhoneErrorIcon && <label className='error-icon-phone'><ErrorIcon/></label>}
                    </div>
                  </div>
                    {isOpen && (
                      
                        <div className="code-dropdown-list">
                          <CustomScrollbars style={{ width: '107px', height: '200px' }}>
                            {countryData.map((item, index) => (
                            <label
                              key={index}
                              className={`code-dropdown-item ${selectedItem.name === item.name ? 'selected' : ''}`}
                              onClick={() => handleItemClick(item)}>
                              {item.isoCode} {item.dialCode} 
                            </label>
                          ))}
                      </CustomScrollbars>
                        </div>
                    )}
                </div>
                <div className='error-email'>
                  {errorMessagePhone && <label className="error-message">{errorMessagePhone}</label>}
                </div>
                <div className="left-pswrd">
                  <label className="text-left-pswrd">Пароль</label>
                  <input className="input-left-pswrd" type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    style={{borderColor:PswrdBorderColor}} />
                  <button className="eye-button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <NotEyeIcon /> : <EyeIcon />}
                  </button>
                    {PswrdErrorIcon && <label className='error-icon-pswrd'><ErrorIcon/></label>}
                            
                </div>
                <div className='error-pswrd'>
                  {errorMessagePswrd && <label className="reg-error-message">{errorMessagePswrd}</label>}
                </div>
                <div className='check-register'>
                  <div className='check-register-input'>
                    <input type='checkbox'
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}/>
                  </div>
                  <label>
                      Реєструючись, ви погоджуєтесь з 
                      обробкою і захистом персональних 
                      даних та угодою користувача
                  </label>
                </div>
                <div className='error-pswrd'>
                  {errorMessageCheck && <label className="error-message">{errorMessageCheck}</label>}
                </div>
              </div>
              <div className="reg-vertical-line">
                <VerticalLine />
              </div>
              <div className="enter-body-foot-right">
                <label className='text-right-enter'>Увійти як користувач</label>
                <div className='icons-right-enter'>
                  <div className='google-right-enter'>
                    <button className="google-button" onClick={handleGoogle}>
                      <GoogleIcon/>
                    </button>
                    <label className='label-google'>Google</label>
                  </div>
                  <div className='facebook-right-enter'>
                    <button className="facebook-button" onClick={handleFacebook}>
                      <FacebookIcon/>
                    </button>
                    <label className='label-facebook'>Facebook</label>
                                
                  </div>
                </div>
              </div>
            </div>
            <div className='div-register-button-two'>
              <div>
                <button className='register-button-two' onClick={handleRegister}>Зареєструватися</button>
              </div>
              <div>
                <a href='/login' className='text-back-tologin'>Я вже зареєстрований</a>
              </div>
            </div>


          </div>
        </div>
      </div>
  );

}

export default Register;
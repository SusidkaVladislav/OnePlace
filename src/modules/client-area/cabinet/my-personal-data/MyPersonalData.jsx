import React, { useEffect, useState } from 'react';
import './PersonalDataStyle.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Typography, TextField, Button, Box} from '@mui/material';


{/*---------------------DataBaseVersion--------------------------*/}
// тут ми підключаємо Api запити, я правда ще не перевіряв чи вони працюють правильно, але мали би)))

export const updateProfileImage = async (imageData) => {
  const formData = new FormData();
  formData.append('image', imageData);

  
  const response = await fetch('/api/user/profile-image', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export const updatePersonalInfo = async (info) => {
  
  const response = await fetch('/api/user/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personalInfo),
  });

  return response.json();
};

export const updatePassword = async (passwordData) => {
  
  const response = await fetch('/api/user/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwordData),
  });

  return response.json();
};
{/*--------------------------------------------------------------*/}

const MyPersonalData = () => {

  {/*-------------------------HandleDataBaseShit------------------*/}
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const response = await updateProfileImage(file);
      if(response && response.imageUrl) { // Assuming the response contains the imageUrl
        setImage(response.imageUrl);
      }
      alert('Зображення успішно оновлено');
    } catch (error) {
      console.error('Помилка оновлення зображення:', error);
    }
  };

  const handlePersonalInfoSubmit = async (info) => {
    try {
      const response = await updatePersonalInfo(info);
      if(response && response.updatedInfo) { // Assuming the response contains the updatedInfo
        setInfo(response.updatedInfo);
      }
      alert('Особиста інформація успішно оновлена');
    } catch (error) {
      console.error('Помилка оновлення особистої інформації:', error);
    }
  };

  const handlePasswordSubmit = async (newPassword) => {
    try {
      const response = await updatePassword({ newPassword });
      if(passwordInput === reenteredPassword)
        if(response && response.success) { // Assuming the response indicates success
          alert('Пароль успішно оновлено');
          // Update any necessary state or UI here
        }
      } catch (error) {
        console.error('Помилка оновлення пароля:', error);
      }
    
  };

{/*---------------------------------------------------------------*/}

  {/*це ми щас попробуємо це все редагування в один блок запхати*/}
  // Оновлення станів для контролю трьох різних режимів редагування
  const [editImageMode, setEditImageMode] = useState(false);
  const [editPersonalInfoMode, setEditPersonalInfoMode] = useState(false);
  
  // Функції для перемикання режимів редагування
  const toggleEditImageMode = () => setEditImageMode(!editImageMode);
  const toggleEditPersonalInfoMode = () => setEditPersonalInfoMode(!editPersonalInfoMode);
  
  {/*-----------------------------------------------------------*/}

  const textFieldStyle = {
    maxWidth: '300px',
    margin: '10px 0', 
    '& .MuiInputBase-root': {
      height: '50px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '4px 24px', 
    }
    
  };
  {/*---------------------------------------------------------------*/}

  // const [info, setInfo] = useState({
  //   name: 'Данило Барчук',
  //   email: 'vip.mkola@gmail.com',
  //   phone: '+380963023182',
   
  // });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+380\d{9}$/;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  console.log("handleSubmit is called");
  const formData = new FormData(e.target);
  const newInfo = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  };

  // Валідація введених даних
  const newErrors = {
    email: emailRegex.test(newInfo.email) ? '' : 'Неправильне введеня емейлу',
    phone: phoneRegex.test(newInfo.phone) ? '' : 'Неправильне введення. Формат: +380xxxxxxxxx',
  };

  setErrors(newErrors);

  // Перевірка на наявність помилок
  if (!Object.values(newErrors).some(error => error)) {
    setInfo(newInfo);
    setEditPersonalInfoMode(false); // Вихід з режиму редагування після успішного збереження даних
  }
  };
  {/*---------------------------------------------------------------*/}
  {/*Пароль*/}
  
  const [password, setPassword] = useState(encryptPassword('initialPassword')); // replace 'initialPassword' with your default
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState(''); // New state for handling password input
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Function to encrypt the password 
  function encryptPassword(password) {
    return btoa(password); 
  }
  function decryptPassword(encryptedPassword) {
    return atob(encryptedPassword); 
  }

  const toggleEditPasswordMode = () => {
    setEditPasswordMode(!editPasswordMode);
    
    if (editPasswordMode) {
      setPasswordInput('');
      setReenteredPassword('');
    } else {
      
      setPasswordInput(decryptPassword(password));
    }
  };
 
  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  
  const handleReenteredPasswordChange = (e) => {
    setReenteredPassword(e.target.value);
  };

  const handleSavePassword = () => {
    if (passwordInput === reenteredPassword) {
      setPassword(encryptPassword(passwordInput));
      setEditPasswordMode(false);
      setPasswordError('');
    } else {
      setPasswordError('Паролі не співпадають');
    }
  };
{/*---------------------------------------------------------------*/}
  {/*Image*/}
  const [image, setImage] = useState(personImage);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    
    <Container>
      
       <Box style={{ 
          padding: '40px',
          marginTop: '100px', 
          marginRight: '250px',
          backgroundColor: '#E9ECEC', 
          borderRadius: '20px', 
        }} 
        elevation={3}>
          
       <Grid container spacing={2} >
       
            {/*Блок 1*/}
            {/* Image and Edit Button */}
             <Grid item xs={12} md={4} lg={4}>
            <Box textAlign="center">
              <img src={image} alt="Profile" width="200" height="200" padding="10px" style={{  border: '3px solid #0A3D58', padding: '5px', borderRadius: '10px' }}/>
              <input type="file" style={{ display: 'none' }} id="image-upload" onChange={handleImageSubmit} />
              <label htmlFor="image-upload">
                <Button className='button_style' component="span" onClick={toggleEditImageMode}>
                <Typography className='button_text_style'>Змінити зображення</Typography>
                </Button>
              </label>
            </Box>
          </Grid>
        {/*-------------------------------------------------------------*/}
        {/* Блок 2 */}
        <Grid item xs={12} md={4} lg={4} >
        
            {editPersonalInfoMode ? (
               <form onSubmit={handlePersonalInfoSubmit}>
                   <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    defaultValue={info.name}
                   
                    sx={textFieldStyle}
                   
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    defaultValue={info.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={textFieldStyle}
                    
                  />
                  <TextField
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    defaultValue={info.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={textFieldStyle}
                    
                  />
                 
                  <Button className='button_style' type="submit"><Typography className='button_text_style'>Зберегти</Typography></Button>
                </form>
                
              ) :(
                
                <Box className='infoStyle'>
                  <Typography className='titleStyle'>{info.name}</Typography>
                  <Typography className='infoElementStyle'>{info.email}</Typography>
                  <Typography className='infoElementStyle'>{info.phone}</Typography>
                  <Button className='button_style' onClick={toggleEditPersonalInfoMode}><Typography className='button_text_style'>Змінити дані</Typography></Button>
                </Box>
              )}
              
        </Grid>
      {/*-------------------------------------------------------------*/}
      {/* Блок 3 */}
      <Grid item xs={11} md={3} lg={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
                <Typography className='titleStyle'>Пароль</Typography>
                
              </Box>
              {editPasswordMode ? (
          <>
            <TextField 
              label="Пароль"
              variant="outlined"
              type="text"
              value={passwordInput}
              onChange={handlePasswordInputChange}
              error={!!passwordError}
              helperText={passwordError}
              sx={{ marginBottom: '20px' }}
            
            />
            <TextField 
              label="Повторіть пароль"
              variant="outlined"
              type="text"
              value={reenteredPassword}
              onChange={handleReenteredPasswordChange}
              error={!!passwordError}
            
            />
            <Button className='button_style' onClick={handlePasswordSubmit}><Typography className='button_text_style'>Зберегти</Typography></Button>
          </>
        ) : (
              <Box>
                <TextField 
                  label="Пароль"
                  variant="outlined"
                  type="password"
                  value={password}
                  disabled={true} 
                  sx={textFieldStyle}
                />
                <Button className='button_style' onClick={toggleEditPasswordMode}><Typography className='button_text_style'> Змінити пароль</Typography></Button>
                </Box>
              )}
              
            </Grid>
          </Grid>
        </Box>
    </Container>
    );
};

export default MyPersonalData;

import React from "react";
import "./Banner1.css";
import Button from '@mui/material/Button';

const Banner1 = () => {
    return (
        <div className="background">
            <div className="content">
                <div className="text1">
                    <h1>Приєднуйся до</h1>
                    <h1>One Place</h1>
                </div>
                <div className="text2">
                    <h2>забудь про пошуки тут ти знайдеш</h2>
                    <h2>все, що потрібно в одному місці!</h2>
                </div>
                <div className="button-container">
                    <Button variant="outlined" size="large"  
                    sx={{
                        '&:hover': {
                            backgroundColor: '#D17100',
                            border: '4px solid #D17100',
                            color: 'white'
                          },
                        borderRadius: '26px',
                        border: '2px solid var(--brown-100, #471915)',
                        textTransform: 'initial',
                        color: '#471915',
                        fontFamily: 'Montserrat Alternates',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500
                    }}>Усі товари</Button>
                </div>
            </div>
        </div>
    )
}

export default Banner1;
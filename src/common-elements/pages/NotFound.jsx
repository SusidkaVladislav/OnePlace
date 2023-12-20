import React from 'react';
import
{
    Container,
    Typography,
    Button,
} from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';

const NotFound = () =>
{
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
            <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: 'secondary.main' }} />
            <Typography variant="h4" component="h1" gutterBottom>
                Uh-Oh...
            </Typography>
            <Typography variant="subtitle1">
                Сторінка яку ви намагаєтеся відкрити наразі не доступна!
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 4 }}
                onClick={() =>
                {
                    navigate('/')
                }}
            >
                На головну
            </Button>
        </Container>
    );
};

export default NotFound;
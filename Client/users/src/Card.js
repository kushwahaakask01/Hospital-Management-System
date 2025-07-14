import './Card.css';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import CreditCard from './Image/Credit Card.png'
import CardHolder from './Image/CardHolder.png'
import EventIcon from '@mui/icons-material/Event';
function Cards() {
    const navigate = useNavigate();

    const location = useLocation();
    const feesName = location.state?.name || '';

    // Input States
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [cvv, setCvv] = useState('');

    // Error States
    const [errors, setErrors] = useState({
        name: false,
        cardNumber: false,
        expireDate: false,
        cvv: false
    });

    // Snackbar States
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleErrorClose = () => setErrorOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);

    // Realtime validation
    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setName(value);
                setErrors((prev) => ({ ...prev, name: value.trim().length < 3 }));
                break;
            case 'cardNumber':
                setCardNumber(value);
                setErrors((prev) => ({
                    ...prev,
                    cardNumber: value.length !== 16 || !/^\d+$/.test(value)
                }));
                break;
            case 'expireDate':
                setExpireDate(value);
                setErrors((prev) => ({
                    ...prev,
                    expireDate: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
                }));
                break;
            case 'cvv':
                setCvv(value);
                setErrors((prev) => ({
                    ...prev,
                    cvv: value.length < 3 || value.length > 4 || !/^\d+$/.test(value)
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        const newErrors = {
            name: name.trim().length < 3,
            cardNumber: cardNumber.length !== 16 || !/^\d+$/.test(cardNumber),
            expireDate: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expireDate),
            cvv: cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            setErrorOpen(true);
        } else {
            setSuccessOpen(true);
            setTimeout(() => {
                if(feesName==='AdmitFees')navigate('/admission')
                    else alert('Wait')
                window.location.reload();
            }, 2000);
        }
    };

    const Navigation = () => {
        if (feesName === 'AdmitFees') {
            navigate('/admission');
        } else {
            navigate('/discharge');
        }
    }

    return (
        <div className="CardDiv">
            <div className='backButon'>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={Navigation}
                >
                    Back
                </Button>
            </div>

            <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
                <h2 style={{ textAlign: 'center' }}>
                    <CreditCardIcon sx={{ fontSize: 30, verticalAlign: 'middle', color: '#1976d2' }} /> ATM Payment
                </h2>

                <TextField
                    label="Cardholder Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    helperText={errors.name ? "Name must be at least 3 characters" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <img src={CardHolder} alt="Visa" style={{ height: 24, marginRight: 4 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontWeight: 'bold',
                            color: 'black',
                        },
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'blue',
                            },
                            '&:hover fieldset': {
                                borderColor: 'blue',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'blue',
                            },
                        },
                    }}
                    InputLabelProps={{ shrink: true }}
                    placeholder='CARDHOLDER NAME'
                />

                <TextField
                    label="Card Number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    value={cardNumber}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    inputProps={{ maxLength: 16 }}
                    error={errors.cardNumber}
                    helperText={errors.cardNumber ? "Card number must be 16 digits" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <img src={CreditCard} alt="Visa" style={{ height: 24, marginRight: 4 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontWeight: 'bold',
                            color: 'black',
                        },
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'blue',
                            },
                            '&:hover fieldset': {
                                borderColor: 'blue',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'blue',
                            },
                        },
                    }}
                    InputLabelProps={{ shrink: true }}
                    placeholder='XXXX XXXX XXXX XXXX'
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Expiry Date"
                        placeholder="MM/YY"
                        variant="outlined"
                        fullWidth
                        required
                        value={expireDate}
                        onChange={(e) => handleChange('expireDate', e.target.value)}
                        error={errors.expireDate}
                        helperText={errors.expireDate ? "Format must be MM/YY" : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon style={{ color: '#1976d2' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontWeight: 'bold',
                                color: 'black',
                            },
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'blue',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="CVV"
                        placeholder="453"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        inputProps={{ maxLength: 4 }}
                        value={cvv}
                        onChange={(e) => handleChange('cvv', e.target.value)}
                        error={errors.cvv}
                        helperText={errors.cvv ? "CVV must be 3–4 digits" : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon style={{ color: '#1976d2' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontWeight: 'bold',
                                color: 'black',
                            },
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'blue',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, padding: 1.5, bgcolor: "#1565c0" }}
                    onClick={handleSubmit}
                >
                    {
                        feesName === 'AdmitFees' ? 'Admit Fees(1000)' : 'Total Amount'
                    }
                </Button>
            </Box>

            {/* Error Snackbar */}
            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ backgroundColor: '#b71c1c', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                    Please fill in all required fields correctly.
                </Box>
            </Snackbar>

            {/* Success Snackbar */}
            <Snackbar
                open={successOpen}
                autoHideDuration={3000}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ backgroundColor: '#0f7a14ff', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                    Payment successful!
                </Box>
            </Snackbar>
        </div>
    );
}

export default Cards;

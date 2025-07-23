import './Card.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Material UI
import TextField from '@mui/material/TextField';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EventIcon from '@mui/icons-material/Event';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// Images
import CreditCard from './Image/Credit Card.png';
import CardHolder from './Image/CardHolder.png';

//Dialog Icon 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import KeyIcon from '@mui/icons-material/Key';

function Cards() {
    const navigate = useNavigate();
    const location = useLocation();

    const feesName = location.state?.name || '';
    const email = location.state?.email || '';

    // Form states
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [cvv, setCvv] = useState('');

    // Dialog and OTP-related states
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [otp, setOtp] = useState('');

    // Snackbar states
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    // Field error states
    const [errors, setErrors] = useState({
        name: false,
        cardNumber: false,
        expireDate: false,
        cvv: false,
    });

    // Snakebar
    const handleErrorClose = () => setErrorOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);

    //Dialog
    const handleClose = () => setOpen(false);

    //Handle Error 
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
                    cardNumber: value.length !== 16 || !/^\d+$/.test(value),
                }));
                break;
            case 'expireDate':
                setExpireDate(value);

                const [monthStr, yearStr] = value.split('/');

                // Validate format first
                const isValidFormat = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);

                if (isValidFormat) {
                    const inputMonth = parseInt(monthStr, 10);
                    const inputYear = parseInt('20' + yearStr, 10); // Convert YY to YYYY

                    const today = new Date();
                    const currentMonth = today.getMonth() + 1; // getMonth() is 0-based
                    const currentYear = today.getFullYear();

                    const isExpired =
                        inputYear < currentYear ||
                        (inputYear === currentYear && inputMonth <= currentMonth);

                    setErrors((prev) => ({
                        ...prev,
                        expireDate: isExpired, // true = error
                    }));
                } else {
                    // Invalid format
                    setErrors((prev) => ({
                        ...prev,
                        expireDate: true,
                    }));
                }
                break;
            case 'cvv':
                setCvv(value);
                setErrors((prev) => ({
                    ...prev,
                    cvv: value.length < 3 || value.length > 4 || !/^\d+$/.test(value),
                }));
                break;
            default:
                break;
        }
    };

    //Check error
    const handleSubmit = () => {
        const newErrors = {
            name: name.trim().length < 3,
            cardNumber: cardNumber.length !== 16 || !/^\d+$/.test(cardNumber),
            expireDate: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expireDate),
            cvv: cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            setErrorOpen(true);
        } else {
            // Open Dialog for OTP + Amount
            setOpen(true);
        }
    };

    //Submit the data to database
    const handleFinalSubmit = async () => {
        if (!amount || !otp) {
            setErrorOpen(true);
            return;
        }

        if (feesName === 'AdmitFees') {
            try {
                const res = await fetch(`http://localhost:5000/CreditCardAdmitFees/${email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        cardNumber,
                        cvv,
                        expireDate,
                        amount,
                        otp,
                    }),
                });

                if (!res.ok) throw new Error('Server Error');

                setSuccessOpen(true);
                setOpen(false);

                setTimeout(() => {
                    navigate('/admission');
                }, 2000);
            } catch (error) {
                console.error('Error saving card:', error);
                setErrorOpen(true);
            }
        } else {
            try {
                const res = await fetch(`http://localhost:5000/CreditCardDischargeFees/${email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        cardNumber,
                        cvv,
                        expireDate,
                        amount,
                        otp,
                    }),
                });

                if (!res.ok) throw new Error('Server Error');

                setSuccessOpen(true);
                setOpen(false);

                setTimeout(() => {
                    navigate('/receipt', { state: { email: email } });
                }, 2000);
            } catch (error) {
                console.error('Error saving card:', error);
                setErrorOpen(true);
            }
        }
    };

    const BackNavigation = () => {
        if (feesName === 'AdmitFees') {
            navigate('/admission');
        } else {
            navigate('/discharge');
        }
    };

    return (
        <div className="CardDiv">
            <div className="backButon">
                <Button variant="outlined" color="primary" onClick={BackNavigation}>
                    Back
                </Button>
            </div>

            <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
                <h2 style={{ textAlign: 'center' }}>
                    <CreditCardIcon sx={{ fontSize: 30, verticalAlign: 'middle', color: '#1976d2' }} /> ATM Payment
                </h2>

                {/* Cardholder Name */}
                <TextField
                    label="Cardholder Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    helperText={errors.name ? 'Name must be at least 3 characters' : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <img src={CardHolder} alt="CardHolder" style={{ height: 24, marginRight: 4 }} />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="CARDHOLDER NAME"
                />

                {/* Card Number */}
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
                    helperText={errors.cardNumber ? 'Card number must be 16 digits' : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <img src={CreditCard} alt="Card" style={{ height: 24, marginRight: 4 }} />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="XXXX XXXX XXXX XXXX"
                />

                {/* Expiry Date and CVV */}
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
                        helperText={errors.expireDate ? 'Format must be MM/YY' : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon style={{ color: '#1976d2' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="CVV"
                        placeholder="123"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        inputProps={{ maxLength: 4 }}
                        value={cvv}
                        onChange={(e) => handleChange('cvv', e.target.value)}
                        error={errors.cvv}
                        helperText={errors.cvv ? 'CVV must be 3–4 digits' : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon style={{ color: '#1976d2' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Submit Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, padding: 1.5, bgcolor: '#1565c0' }}
                    onClick={handleSubmit}
                >
                    {feesName === 'AdmitFees' ? 'Admit Fees (1000)' : 'Total Amount'}
                </Button>
            </Box>

            {/* OTP + Amount Dialog */}
            <Dialog open={open} onClose={handleClose} PaperProps={{
                sx: {
                    width: 350,
                    borderRadius: 2,
                    backgroundColor: '#f0f4ff'
                }
            }}>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Enter Amount & OTP
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Enter Amount"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon sx={{ color: '#1565c0' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon sx={{ color: '#1565c0' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button onClick={handleClose} style={{ fontWeight: 'bold' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleFinalSubmit} variant="contained" style={{ fontWeight: 'bold', backgroundColor: '#09366aff' }}>
                        Submit Payment
                    </Button>
                </DialogActions>
            </Dialog>

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

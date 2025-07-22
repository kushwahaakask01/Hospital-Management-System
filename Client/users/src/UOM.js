// Material UI
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import StarIcon from '@mui/icons-material/Star';

// Image For Icon
import phonePay from './Image/phoneIcon.png';
import googlePay from './Image/googleIcon.png';
import paytm from './Image/paytmIcon.png';
import { useLocation, useNavigate } from 'react-router-dom';

// Stepper from Material Ui
const steps = ['Enter UPI ID', 'Enter OTP', 'Enter Money'];

function UOM() {
    //Use the Location for get data from other component
    const location = useLocation();
    const methodName = location.state?.methodName || '';
    const names = location.state?.name || '';
    const email = location.state?.email || '';

    const navigate = useNavigate();
    //this is for scroll page from left to rigth
    const [activeStep, setActiveStep] = React.useState(0);

    //Store the upi id , otp and money
    const [upiId, setUpiID] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [money, setMoney] = React.useState('');

    //set the error in upi id , otp and money
    const [upiError, setUpiError] = React.useState(false);
    const [otpError, setOtpError] = React.useState(false);
    const [moneyError, setMoneyError] = React.useState(false);

    //Snakebar for error or show message 
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    //Handle the error of all input box(upi id, otp and number)
    const handleError = (e) => {
        const { value, name } = e.target;
        if (name === 'upi') {
            setUpiID(value);
            const upiRegex = /^(([\w.-]+)@(ybl|okaxis|okhdfcbank|okicici|oksbi|okyesbank|okpaytm)|\d{10}@paytm)$/;
            setUpiError(!upiRegex.test(value));
        } else if (name === 'otp') {
            setOtp(value);
            setOtpError(!/^\d{6}$/.test(value));
        } else if (name === 'money') {
            setMoney(value);
            setMoneyError(value <= 0 || value === '');
        }
    };

    //Pass  the message in snakebar
    const triggerSnackbar = (message) => {
        setSnackbarOpen(false);
        setTimeout(() => {
            setSnackbarMessage(message);
            setSnackbarOpen(true);
        }, 100);
    };

    //next page (next button in stepper)
    const handleNext = () => {
        if (activeStep === 0) {
            if (upiError || !upiId) {
                triggerSnackbar('Invalid UPI ID. Please enter a valid one (e.g., example@ybl)');
                return;
            }
        } else if (activeStep === 1) {
            if (otpError || !otp) {
                triggerSnackbar('OTP must be a 6-digit number.');
                return;
            }
        } else if (activeStep === 2) {
            if (names !== 'AdmitFees' && (moneyError || !money)) {
                triggerSnackbar('Amount should be greater than 0.');
                return;
            }
        }

        setActiveStep((prev) => prev + 1);
    };

    //set the 1000 
    React.useEffect(() => {
        if (activeStep === 2 && names === 'AdmitFees') {
            setMoney(1000);
        }
    }, [activeStep, names]);
    //Back button in stepper
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    //Add Data in Database 
    const handleReset = async () => {
        if (names === 'AdmitFees') {
            try {
                const resp = await fetch(`http://localhost:5000/UPIadmitfees/${email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        upiId,
                        otp,
                        money,
                    })
                });
                if (!resp.ok) throw new Error('Server Error');

                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/admission');
                }, 2000);
            } catch (error) {
                triggerSnackbar('Something went wrong.');
            }
        } else {
            try {
                const resp = await fetch(`http://localhost:5000/dischargeFees/${email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        upiId,
                        otp,
                        money,
                    })
                });
                if (!resp.ok) throw new Error('Server Error');

                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/receipt',{state:{email:email}});
                }, 2000);
            } catch (error) {
                triggerSnackbar('Something went wrong.');
            }
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#fff', boxShadow: 3, borderRadius: 2, p: 3 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? (
                    <React.Fragment>
                        {/* Final Page */}
                        <Typography
                            sx={{
                                mt: 8,
                                mb: 1,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                                color: 'green',
                            }}
                        >
                            <StarIcon sx={{ color: 'gold' }} />
                            Thank You!
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button variant="contained" color="primary" onClick={handleReset}>
                                Finish
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ mt: 2, maxWidth: 500, mx: 'auto' }}>
                            {activeStep === 0 && (
                                //upi id Input Box
                                <TextField
                                    label={`Enter ${methodName} UPI ID`}
                                    name="upi"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    value={upiId}
                                    error={upiError}
                                    helperText={
                                        upiError
                                            ? 'Enter a valid UPI ID (e.g., example@ybl)'
                                            : ''
                                    }
                                    onChange={handleError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <img
                                                    src={
                                                        methodName === 'PhonePe'
                                                            ? phonePay
                                                            : methodName === 'Google Pay'
                                                                ? googlePay
                                                                : methodName === 'Paytm'
                                                                    ? paytm
                                                                    : ''
                                                    }
                                                    alt={methodName}
                                                    style={{ height: 24, marginRight: 4 }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="example@ybl / 9876543210@paytm"
                                />
                            )}

                            {/* Otp Page */}
                            {activeStep === 1 && (
                                <TextField
                                    label="Enter OTP"
                                    name="otp"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    value={otp}
                                    error={otpError}
                                    helperText={otpError ? 'Enter a valid OTP' : ''}
                                    onChange={handleError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon sx={{ color: '#1976d2' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="6-digit OTP"
                                />
                            )}

                            {/*Money Page*/}
                            {activeStep === 2 && (
                                names === 'AdmitFees' ? (
                                    <TextField
                                        label="Admit Fees"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={1000}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachMoneyIcon sx={{ color: '#046409ff' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                ) : (
                                    <TextField
                                        label="Enter Amount"
                                        name="money"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        value={money}
                                        error={moneyError}
                                        helperText={moneyError ? 'Amount should be greater than 0' : ''}
                                        onChange={handleError}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachMoneyIcon sx={{ color: '#046409ff' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Enter amount"
                                    />
                                )
                            )}
                        </Box>
                        {/* Back and Next Button */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button variant="contained" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}

                {/* Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={(_, reason) => {
                        if (reason !== 'clickaway') setSnackbarOpen(false);
                    }}
                >
                    <SnackbarContent
                        sx={{ backgroundColor: 'rgba(101, 49, 4, 1)', justifyContent: 'center' }}
                        message={
                            <span style={{ color: 'white', textAlign: 'center', width: '100%' }}>
                                {snackbarMessage}
                            </span>
                        }
                    />
                </Snackbar>
            </Box>
        </Box>
    );
}

export default UOM;

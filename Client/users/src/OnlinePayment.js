import './OnlinePayment.css';
import phonePay from './Image/phoneIcon.png';
import googlePay from './Image/googleIcon.png';
import paytm from './Image/paytmIcon.png';
import netBanking from './Image/netBanking.png';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
    Button, Box, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Snackbar, Radio
} from '@mui/material';

function OnlinePayment() {
    //Use Location for get data from other component(Admission or Discharge)
    const location = useLocation();
    const name = location.state?.name || '';
    const email = location.state?.email || '';

    //Navigation for other page
    const navigate = useNavigate();

    //set Name and Icon in List
    const PaymentOptions = [
        { name: 'PhonePe', icon: phonePay },
        { name: 'Google Pay', icon: googlePay },
        { name: 'Paytm', icon: paytm },
        { name: 'Net Banking', icon: netBanking },
    ];

    //Set the error and show the error in snakebar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    //Store the name of payment option
    const [selectedPayment, setSelectedPayment] = useState('');

    //Store the name of upi in setSelectedPayment
    const handlePaymentClick = (event) => {
        setSelectedPayment(event.target.value);
    };

    //Navigation for back button
    const Navigation = () => {
        name === 'AdmitFees' ? navigate('/admission') : navigate('/discharge');
    };


    const Pay = () => {
        if (!selectedPayment) {
            setSnackbarMessage("Please select a payment option!");
        } else {
             setSnackbarMessage(`${selectedPayment} Selected`);
            setTimeout(()=>{
              navigate('/UOM',{state:{methodName:selectedPayment,name:name,email:email}})
            },2000)
        }
        setSnackbarOpen(true);
    };

    return (
        <div className='online-payment'>
            <div className='backButon1'>
                <Button variant="outlined" color="primary" onClick={Navigation}>
                    Back
                </Button>
            </div>

            <Box sx={{ width: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Online Payment {name}
                </h2>

                <List sx={{ width: '100%' }}>
                    {PaymentOptions.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <img src={item.icon} alt={item.name} style={{ width: 30, height: 30 }} />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <Radio
                                    edge="end"
                                    value={item.name}
                                    checked={selectedPayment === item.name}
                                    onChange={handlePaymentClick}
                                    inputProps={{ 'aria-label': item.name }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={Pay}>
                        {
                            name==='AdmitFees'?'Admit Charge':'Disharge Payment'
                        }
                    </Button>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Box sx={{
                        backgroundColor: '#046409',
                        color: '#fff',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        textAlign: 'center',
                        minWidth: 200
                    }}>
                        {snackbarMessage}
                    </Box>
                </Snackbar>
            </Box>
        </div>
    );
}

export default OnlinePayment;

import './OnlinePayment.css';
import phonePay from './Image/phoneIcon.png';
import googlePay from './Image/googleIcon.png';
import paytm from './Image/paytmIcon.png';
import netBanking from './Image/netBanking.png';

import phonePayMethod from './Image/phonepaymethod.jpg';
import googleMethod from './Image/Googlepaymethod.jpg';
import paytmMethod from './Image/paytmmethod.jpg';

import { useLocation, useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import { useState } from 'react';

// Material
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';

function OnlinePayment() {
    const location = useLocation();
    const name = location.state?.name || '';
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [scannerImage, setScannerImage] = useState(null);
    const [upiId, setUpiId] = useState('');


    const paymentOptions = [
        { name: 'PhonePe', icon: phonePay },
        { name: 'Google Pay', icon: googlePay },
        { name: 'Paytm', icon: paytm },
        { name: 'Net Banking', icon: netBanking }
    ];
    const upiIds = {
        'PhonePe': '99316669668@upi',
        'Google Pay': '99316669668@gp',
        'Paytm': '99316669668@ptm'
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const selectMethod = () => {
        if (!selectedOption) {
            setSnackbarOpen(true);
            return;
        }

        switch (selectedOption) {
            case 'PhonePe':
                setScannerImage(phonePayMethod);
                setUpiId(upiIds['PhonePe']);
                break;
            case 'Google Pay':
                setScannerImage(googleMethod);
                setUpiId(upiIds['Google Pay']);
                break;
            case 'Paytm':
                setScannerImage(paytmMethod);
                setUpiId(upiIds['Paytm']);
                break;
            case 'Net Banking':
                alert('We are currently working on Net Banking support.');
                return;
            default:
                return;
        }

        setOpen(true);
        setTimeout(() => {
            if (name === 'AdmitFees') navigate('/admission')
            else alert('Wait')
            window.location.reload();
        }, 2000);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Navigation = () => {
        if (name === 'AdmitFees') {
            navigate('/admission');
        } else {
            navigate('/discharge');
        }
    }

    return (
        <div className='online-payment'>
            <div className='backButon1'>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={Navigation}
                >
                    Back
                </Button>
            </div>

            <Box sx={{ width: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Online Payment</h2>

                <List sx={{ width: '100%' }}>
                    {paymentOptions.map((item, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedOption === item.name}
                            onClick={() => setSelectedOption(item.name)}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <img src={item.icon} alt={item.name} width="30" height="30" />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            <ListItemIcon>
                                <Radio
                                    checked={selectedOption === item.name}
                                    value={item.name}
                                    onChange={() => setSelectedOption(item.name)}
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, padding: 1.5, fontWeight: 'bold' }}
                    onClick={selectMethod}
                >
                    {
                        name === 'AdmitFees' ? 'Admit Fees(1000)' : 'Total Amount'
                    }
                </Button>

                {/* Dialog for scanner image */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Scan to Pay via {selectedOption}</DialogTitle>
                    <DialogContent>
                        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{upiId}</p>
                        <img
                            src={scannerImage}
                            alt="scanner"
                            style={{ width: '100%', height: 'auto', borderRadius: 10 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={handleClose} style={{ fontWeight: 'bold' }}>Cancel</Button>
                        <Button onClick={handleClose} style={{ fontWeight: 'bold' }} autoFocus>Done</Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for validation */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Box sx={{ backgroundColor: '#046409ff', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                        Please select a payment method!
                    </Box>
                </Snackbar>
            </Box>
        </div>
    );
}

export default OnlinePayment;

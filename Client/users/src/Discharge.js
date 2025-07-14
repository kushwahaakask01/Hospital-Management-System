import './Discharge.css';
import React, { useState } from 'react';

// Material
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem, Snackbar } from '@mui/material';

function Discharge() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        dischargeDate: '',
        paymentMode: '',
    });

    // Error state
    const [errors, setErrors] = useState({
        dischargeDate: false,
        paymentMode: false,
    });

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'dischargeDate') {
            const today = new Date().toISOString().split('T')[0];
            setErrors((prev) => ({
                ...prev,
                dischargeDate: value === '' || value < today,
            }));
        }

        if (name === 'paymentMode') {
            setErrors((prev) => ({
                ...prev,
                paymentMode: value === '',
            }));
        }
    };

    // Submit handler
    const handleSubmit = () => {
        const today = new Date().toISOString().split('T')[0];

        const newErrors = {
            dischargeDate:
                formData.dischargeDate === '' || formData.dischargeDate < today,
            paymentMode: formData.paymentMode === '',
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).includes(true);

        if (hasError) {
            setSnackbar({
                open: true,
                message: 'Please fill all fields correctly.',
                severity: 'error',
            });
        } else {
            setSnackbar({
                open: true,
                message: 'Discharge form submitted successfully!',
                severity: 'success',
            });
            switch (formData.paymentMode) {
                case 'cash':
                    setSnackbar({
                        open: true,
                        message: 'Discharge form submitted successfully!',
                        severity: 'success',
                    });
                    break;
                case 'card':
                    navigate('/card', { state: { name: 'DischareFees' } })
                    break;
                case 'online':
                    navigate('/onlinepayment', { state: { name: 'DischareFees' } });
                    break;
                default:
                    console.log("Something is missing ")
                    break;
            }
        }
    };

    // Close Snackbar
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className='TopDischarge'>
            <Box
                sx={{
                    width: 500,
                    maxHeight: 1200,
                    mx: 'auto',
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Discharge Form</h2>

                {/* Patient Info (keep as is) */}
                <div className='PatientDetail'>
                    <div className='Detail'>
                        <div style={{ width: '50%' }}>
                            <p><strong>Name:</strong> <span>Akash</span></p>
                            <p><strong>Gender:</strong> <span>Male</span></p>
                            <p><strong>Age:</strong> <span>23</span></p>
                            <p><strong>Blood Group:</strong> <span>A+</span></p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p><strong>Contact Number:</strong> <span>6543456543</span></p>
                            <p><strong>Email:</strong> <span>akash@gmail.com</span></p>
                            <p><strong>Marital Status:</strong> <span>Single</span></p>
                            <p><strong>Address:</strong> <span>B, C, D, F</span></p>
                        </div>
                    </div>
                    <div className='Detail'>
                        <div style={{ width: '50%' }}>
                            <p><strong>Admit Date:</strong> <span>12/05/2025</span></p>
                            <p><strong>Ward:</strong> <span>ABC</span></p>
                            <p><strong>Doctor Name:</strong> <span>AKS</span></p>
                            <p><strong>Admission Type:</strong> <span>Emergency</span></p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p><strong>Reason:</strong> <span>Fever</span></p>
                            <p><strong>Admission Fees:</strong> <span>₹5000 (Online)</span></p>
                            <p><strong>ID:</strong> <span>Aadhar Card</span></p>
                        </div>
                    </div>
                </div>

                {/* Discharge Date */}
                <h4 style={{ textAlign: 'left', marginBottom: '0' }}>Discharge Date</h4>
                <TextField
                    type='date'
                    name='dischargeDate'
                    value={formData.dischargeDate}
                    onChange={handleChange}
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    error={errors.dischargeDate}
                    helperText={
                        errors.dischargeDate
                            ? 'Please enter a valid discharge date (not in past)'
                            : ''
                    }
                    InputLabelProps={{ shrink: true }}
                />

                {/* Payment Mode */}
                <h4 style={{ textAlign: 'left', marginBottom: '0' }}>Mode of Payment</h4>
                <TextField
                    select
                    label='Mode of Payment'
                    name='paymentMode'
                    value={formData.paymentMode}
                    onChange={handleChange}
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    error={errors.paymentMode}
                    helperText={errors.paymentMode ? 'Please select a payment method' : ''}
                >
                    <MenuItem value='cash'>Cash</MenuItem>
                    <MenuItem value='card'>Card</MenuItem>
                    <MenuItem value='online'>Online Payment</MenuItem>
                </TextField>

                <Button
                    fullWidth
                    variant='contained'
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Submit Discharge
                </Button>
            </Box>

            {/* Snackbar Component */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={snackbar.message}
                ContentProps={{
                    sx: {
                        backgroundColor:
                            snackbar.severity === 'success' ? '#2e7d32' : '#d32f2f',
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }}
            />
        </div>
    );
}

export default Discharge;

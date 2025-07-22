import './Discharge.css';
import React, { useEffect, useState } from 'react';

// Material
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem, Snackbar } from '@mui/material';

function Discharge() {

    //Get email of individual patient
    const location = useLocation();
    const { email } = location.state || {};
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
    const handleSubmit = async() => {
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
            const data = {
                dischargeDate: formData.dischargeDate,
                paymentMode: formData.paymentMode
            };

           await fetch(`http://localhost:5000/dischargeDate/${email}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                    setSnackbar({
                        open: true,
                        message: 'Discharge form submitted successfully!',
                        severity: 'success',
                    });

                    // Redirect to payment route
                    switch (formData.paymentMode) {
                        case 'cash':
                            navigate('/receipt', { state: { email: email } })
                            break;
                        case 'card':
                            navigate('/card', { state: { name: 'DischareFees', email: email } });
                            break;
                        case 'online':
                            navigate('/onlinepayment', { state: { name: 'DischareFees', email: email } });
                            break;
                        default:
                            console.log("Invalid payment method");
                            break;
                    }
                })
                .catch(err => {
                    console.error("Error updating discharge:", err);
                    setSnackbar({
                        open: true,
                        message: 'Error submitting discharge form!',
                        severity: 'error',
                    });
                });
        }
    };

    // Close Snackbar
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    //Get data of patient throw email
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        if (!email) return;

        const fetchPatient = async () => {
            try {
                const res = await fetch(`http://localhost:5000/GetByEmailInDecharge/${email}`);
                const data = await res.json();

                // Ensure data.data is an array
                if (Array.isArray(data?.data)) {
                    setPatients(data.data);
                } else if (data?.data) {
                    // If a single object is returned, wrap it in an array
                    setPatients([data.data]);
                } else {
                    setPatients([]); // fallback
                }
            } catch (err) {
                console.error(err);
                setPatients([]); // fallback in case of error
            }
        };

        fetchPatient();
    }, [email]);



    return (
        <div className='TopDischarge'>
            <Box
                sx={{
                    width: 900,
                    maxHeight: 1200,
                    mx: 'auto',
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Discharge Form</h2>

                {/* Patient Info (keep as is) */}
                <div className="PatientDetail">
                    {patients && Array.isArray(patients) && patients.length > 0 ? (
                        patients.map((item, index) => (
                            <div className="detail-section" key={index}>
                                {/* Patient Info Block 1 */}
                                <div className="detail-row">
                                    <div className="detail-col">
                                        <p><strong>Name:</strong> <span>{item.fullName}</span></p>
                                        <p><strong>Gender:</strong> <span>{item.gender}</span></p>
                                        <p><strong>Age:</strong> <span>{item.age}</span></p>
                                        <p><strong>Blood Group:</strong> <span>{item.bloodGroup}</span></p>
                                    </div>
                                    <div className="detail-col">
                                        <p><strong>Contact Number:</strong> <span>{item.contact}</span></p>
                                        <p><strong>Email:</strong> <span>{item.email}</span></p>
                                        <p><strong>Marital Status:</strong> <span>{item.maritalStatus}</span></p>
                                        <p><strong>Address:</strong> <span>{item.address}</span></p>
                                    </div>
                                </div>

                                {/* Patient Info Block 2 */}
                                <div className="detail-row">
                                    <div className="detail-col">
                                        <p><strong>Admit Date:</strong> <span>{item.admissionDate}</span></p>
                                        <p><strong>Ward:</strong> <span>{item.department}</span></p>
                                        <p><strong>Doctor Name:</strong> <span>{item.doctor}</span></p>
                                        <p><strong>Admission Type:</strong> <span>{item.admissionType}</span></p>
                                    </div>
                                    <div className="detail-col">
                                        <p><strong>Reason:</strong> <span>{item.admissionReason}</span></p>
                                        <p><strong>Admission Fees:</strong>
                                            <span>
                                                {
                                                    item.AdmitFeesCard?.length > 0
                                                        ? `₹${item.AdmitFeesCard[0].Amount}`
                                                        : item.AdmitFeesUPI?.length > 0
                                                            ? `₹${item.AdmitFeesUPI[0].money}`
                                                            : 'Not Paid'
                                                }
                                            </span>

                                        </p>
                                        <p><strong>ID:</strong> <span>{item.identification}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No patient data available.</p>
                    )}
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
                    sx={{ mt: 2, p: 2 }}
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

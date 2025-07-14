import './Addmission.css'
import { Link, useNavigate } from 'react-router-dom';
//Material 
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';

// Bootstrap
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

function Admission() {
    //Navigation 
    const navigate = useNavigate();
    //Snakbar
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const handleSuccessClose = () => {
        setSuccessOpen(false);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    //Get and set in the input value
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('')
    const [age, SetAge] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [emergencyNumber, setEmergencyNumber] = useState('')
    const [marital, setMarital] = useState('')
    const [identificationDocu, setIdentificationDouc] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [addmissionDate, setAddmissionDate] = useState('')
    const [department, setDepartment] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [typeOfAddmission, setTypeOfAddmission] = useState('')
    const [reasionForAdmission, setReasionForAdmission] = useState('')
    const [paymentMode, setpaymentMode] = useState('')


    // Error in input
    const [errors, setErrors] = useState({
        fullName: false,
        gender: false,
        age: false,
        bloodGroup: false,
        contactNumber: false,
        email: false,
        emergencyNumber: false,
        marital: false,
        identificationDocu: false,
        permanentAddress: false,
        addmissionDate: false,
        department: false,
        doctorName: false,
        typeOfAddmission: false,
        reasionForAdmission: false,
        paymentMode: false
    });


    const inputFeild = (e) => {
        const label = e.target.labels?.[0]?.innerText || e.target.name || e.target.id;
        const value = e.target.value;

        switch (label) {
            case 'Full Name':
                setFullName(value);
                setErrors(prev => ({ ...prev, fullName: value.trim().length < 3 }));
                break;
            case 'Gender':
                setGender(value);
                setErrors(prev => ({ ...prev, gender: value === '' }));
                break;
            case 'Age':
                SetAge(value);
                setErrors(prev => ({ ...prev, age: value === '' }));
                break;
            case 'Blood Group':
                setBloodGroup(value);
                setErrors(prev => ({ ...prev, bloodGroup: value === '' }));
                break;
            case 'Contact Number':
                setContactNumber(value);
                setErrors(prev => ({ ...prev, contactNumber: value.length !== 10 }));
                break;
            case 'Email':
                setEmail(value);
                setErrors(prev => ({ ...prev, email: !/\S+@\S+\.\S+/.test(value) }));
                break;
            case 'Emergency Number':
                setEmergencyNumber(value);
                setErrors(prev => ({ ...prev, emergencyNumber: value.length !== 10 }));
                break;
            case 'Marital Status':
                setMarital(value);
                setErrors(prev => ({ ...prev, marital: value === '' }));
                break;
            case 'Identification Documents':
                setIdentificationDouc(value);
                setErrors(prev => ({ ...prev, identificationDocu: value === '' }));
                break;
            case 'Permanent Address':
                setPermanentAddress(value);
                setErrors(prev => ({ ...prev, permanentAddress: value.trim().length < 5 }));
                break;
            case 'Admission Date':
                setAddmissionDate(value);
                const today = new Date().toISOString().split('T')[0];
                setErrors(prev => ({
                    ...prev,
                    addmissionDate: value === '' || value > today
                }));
                break;
            case 'Department / Ward':
                setDepartment(value);
                setErrors(prev => ({ ...prev, department: value === '' }));
                break;
            case 'Doctor’s Name':
                setDoctorName(value);
                setErrors(prev => ({ ...prev, doctorName: value === '' }));
                break;
            case 'Type of Admission':
            case 'Type of Admission ':
                setTypeOfAddmission(value);
                setErrors(prev => ({ ...prev, typeOfAddmission: value === '' }));
                break;
            case 'Reason for Admission':
                setReasionForAdmission(value);
                setErrors(prev => ({ ...prev, reasionForAdmission: value === '' }));
                break;
            case 'Mode of Payment':
                setpaymentMode(value);
                setErrors(prev => ({ ...prev, paymentMode: value === '' }));
                break;
            default:
                console.log("Unhandled field:", label);
        }
    };

    const validateAllFields = () => {
        const newErrors = {
            fullName: fullName.trim().length < 3,
            gender: gender === '',
            age: age === '',
            bloodGroup: bloodGroup === '',
            contactNumber: contactNumber.length !== 10,
            email: !/\S+@\S+\.\S+/.test(email),
            emergencyNumber: emergencyNumber.length !== 10,
            marital: marital === '',
            identificationDocu: identificationDocu === '',
            permanentAddress: permanentAddress.trim().length < 5,
            addmissionDate: addmissionDate === '',
            department: department === '',
            doctorName: doctorName === '',
            typeOfAddmission: typeOfAddmission === '',
            reasionForAdmission: reasionForAdmission === '',
            paymentMode: paymentMode === '',
        };

        setErrors(newErrors);

        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = () => {
        if (validateAllFields()) {
            setSuccessOpen(true);
            setTimeout(() => {
                window.location.reload();
            }, 200);

            switch (paymentMode) {
                case 'cash':
                    alert("Thank you")
                    window.location.reload();
                    break;
                case 'card':
                    navigate('/card', { state: { name: 'AdmitFees' } })
                    break;
                case 'online':
                    navigate('/onlinepayment', { state: { name: 'AdmitFees' } });
                    break;
                default:
                    console.log("Something is missing ")
                    break;
            }
            // const data = {
            //     fullName, gender, age, bloodGroup, contactNumber, email, emergencyNumber, marital, identificationDocu,
            //     permanentAddress, addmissionDate, department, doctorName, typeOfAddmission, reasionForAdmission, paymentMode
            // }
            // fetch('http://localhost:5000/api/patientData', {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Accept": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error(`HTTP error! Status: ${response.status}`);
            //         }
            //         return response.json();
            //     })
            //     .then(result => {
            //         console.log("Success:", result);
            //     })
            //     .catch(error => {
            //         console.error("Error:", error);
            //     });
        } else {
            setErrorOpen(true);
        }
    };

    return (
        <div className="MainDiv">
            {/* Top Nav */}
            <Navbar expand="lg" className='TopNav'>
                <Container className='container'>
                    <h1>Welcome Sir</h1>
                </Container>
            </Navbar>

            <div className='Seconddiv'>
                {/* Left Card */}
                <Card className='card1'>
                    <Card.Body>
                        <Card.Title className='CardTitle'>Pateints</Card.Title>
                        <Card.Text>
                            <div className='CardTextdiv'>
                                <div className='person'>
                                    <PersonIcon sx={{ fontSize: 40, color: '#05295f' }} />
                                    <Link to='/discharge' className='link'>Akash</Link>
                                </div>
                                <DeleteIcon sx={{ color: 'rgb(11, 91, 11)', fontSize: 28, cursor: 'pointer', '&:hover': { color: 'rgb(121, 12, 12)', } }} />
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>
                {/* Right Card */}
                <Card className='card2'>
                    <Card.Body>
                        <Card.Title className='CardTitle'>Admission Form</Card.Title>
                        <Card.Text className='cardtext'>
                            <h2>Personal Information</h2>
                            <div className='CT1'>
                                <TextField
                                    error={errors.fullName}
                                    helperText={errors.fullName ? "Full Name must be at least 3 characters" : ""}
                                    id="Full Name"
                                    label="Full Name"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.gender}
                                    helperText={errors.gender ? "Please select gender" : ""}
                                    label="Gender"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name='Gender'
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    error={errors.age}
                                    helperText={errors.age ? "Age is required" : ""}
                                    id="Age"
                                    label="Age"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.bloodGroup}
                                    helperText={errors.bloodGroup ? "This field is required" : ""}
                                    label="Blood Group"
                                    variant="outlined"
                                    fullWidth defaultValue=""
                                    name='Blood Group'
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A−</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B−</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB−</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O−</MenuItem>
                                </TextField>
                            </div>
                            <div className='CT1'>
                                <TextField
                                    error={errors.contactNumber}
                                    helperText={errors.contactNumber ? "Number Should be 10 digit" : ""}
                                    id="Contact Number"
                                    label="Contact Number"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                                <TextField
                                    error={errors.email}
                                    helperText={errors.email ? "Please Enter valid email" : ""}
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                                <TextField
                                    error={errors.emergencyNumber}
                                    helperText={errors.emergencyNumber ? "Number Should be 10 digit" : ""}
                                    id="Emergency Number"
                                    label="Emergency Number"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.marital}
                                    helperText={errors.marital ? "This field is required" : ""}
                                    label="Marital Status"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="Marital Status"
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="accident">Maried</MenuItem>
                                    <MenuItem value="surgery">Single</MenuItem>
                                </TextField>
                            </div>
                            <div className='CT1'>
                                <TextField
                                    select
                                    error={errors.identificationDocu}
                                    helperText={errors.identificationDocu ? "This field is required" : ""}
                                    label="Identification Documents"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="Identification Documents"
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                                    <MenuItem value="PAN Card">PAN Card</MenuItem>
                                    <MenuItem value="Voter ID">Voter ID</MenuItem>
                                    <MenuItem value="Driving License">Driving License</MenuItem>
                                </TextField>

                                <TextField
                                    error={errors.permanentAddress}
                                    helperText={errors.permanentAddress ? "Please enter the valid address" : ""}
                                    id="Permanent Address"
                                    label="Permanent Address"
                                    variant="outlined"
                                    onChange={inputFeild}
                                />
                            </div>
                            <h2>Admission Details</h2>
                            <div className='CT1'>
                                <TextField
                                    error={errors.addmissionDate}
                                    helperText={
                                        errors.addmissionDate
                                            ? "This field is required and date should not be in the future"
                                            : ""
                                    }
                                    label="Admission Date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.department}
                                    helperText={errors.department ? "This field is required" : ""}
                                    defaultValue=""
                                    label="Department / Ward"
                                    variant="outlined"
                                    name="Department / Ward"
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="general">General Medicine</MenuItem>
                                    <MenuItem value="surgery">Surgery</MenuItem>
                                    <MenuItem value="orthopedics">Orthopedics</MenuItem>
                                    <MenuItem value="cardiology">Cardiology</MenuItem>
                                    <MenuItem value="neurology">Neurology</MenuItem>
                                    <MenuItem value="pediatrics">Pediatrics</MenuItem>
                                    <MenuItem value="gynecology">Gynecology & Obstetrics</MenuItem>
                                    <MenuItem value="icu">ICU (Intensive Care Unit)</MenuItem>
                                    <MenuItem value="nicu">NICU (Neonatal ICU)</MenuItem>
                                    <MenuItem value="psychiatry">Psychiatry</MenuItem>
                                    <MenuItem value="dermatology">Dermatology</MenuItem>
                                    <MenuItem value="ent">ENT (Ear, Nose, Throat)</MenuItem>
                                    <MenuItem value="urology">Urology</MenuItem>
                                    <MenuItem value="oncology">Oncology</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    error={errors.doctorName}
                                    helperText={errors.doctorName ? "This field is required" : ""}
                                    label="Doctor’s Name"
                                    variant="outlined"
                                    defaultValue=''
                                    name='Doctor’s Name'
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="Dr. A. Kumar">Dr. A. Kumar (Cardiologist)</MenuItem>
                                    <MenuItem value="Dr. B. Sharma">Dr. B. Sharma (Neurologist)</MenuItem>
                                    <MenuItem value="Dr. C. Verma">Dr. C. Verma (Orthopedic)</MenuItem>
                                    <MenuItem value="Dr. D. Mehta">Dr. D. Mehta (Pediatrician)</MenuItem>
                                    <MenuItem value="Dr. E. Sinha">Dr. E. Sinha (Dermatologist)</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    error={errors.typeOfAddmission}
                                    helperText={errors.typeOfAddmission ? "This field is required" : ""}
                                    label="Type of Admission "
                                    variant="outlined"
                                    defaultValue=""
                                    name="Type of Admission "
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="emergency">Emergency</MenuItem>
                                    <MenuItem value="urgent">Urgent</MenuItem>
                                    <MenuItem value="elective">Elective (Planned)</MenuItem>
                                    <MenuItem value="newborn">Newborn</MenuItem>
                                    <MenuItem value="trauma">Trauma</MenuItem>
                                    <MenuItem value="maternity">Maternity</MenuItem>
                                    <MenuItem value="referral">Referral</MenuItem>
                                </TextField>
                            </div>
                            <div className='CT1'>
                                <TextField
                                    select
                                    error={errors.reasionForAdmission}
                                    helperText={errors.reasionForAdmission ? "This field is required" : ""}
                                    label="Reason for Admission"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="Reason for Admission"
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="accident">Accident/Injury</MenuItem>
                                    <MenuItem value="surgery">Scheduled Surgery</MenuItem>
                                    <MenuItem value="infection">Infection</MenuItem>
                                    <MenuItem value="cardiac">Cardiac Issue</MenuItem>
                                    <MenuItem value="respiratory">Respiratory Problem</MenuItem>
                                    <MenuItem value="maternity">Maternity</MenuItem>
                                    <MenuItem value="checkup">General Check-up</MenuItem>
                                    <MenuItem value="mental-health">Mental Health Concern</MenuItem>
                                    <MenuItem value="diabetes">Diabetes Complications</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                                <TextField
                                    select
                                    error={errors.paymentMode}
                                    helperText={errors.paymentMode ? "This field is required" : ""}
                                    label="Mode of Payment"
                                    variant="outlined"
                                    fullWidth
                                    name='Mode of Payment'
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="cash">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',fontWeight:'bold'}}>
                                            Cash
                                            <AttachMoneyIcon sx={{ color: 'green' }} />
                                        </span>
                                    </MenuItem>

                                    <MenuItem value="card">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',fontWeight:'bold'}}>
                                            Card
                                            <CreditCardIcon sx={{ color: 'red' }} />
                                        </span>
                                    </MenuItem>

                                    <MenuItem value="online">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',fontWeight:'bold'}}>
                                            Online Payment
                                            <PaymentsIcon sx={{ color: 'blue' }} />
                                        </span>
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className="form-footer">
                                <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {/* Success Snackbar */}
            <Snackbar
                open={successOpen}
                autoHideDuration={3000}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ backgroundColor: '#07590aff', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                    Form submitted successfully!
                </Box>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ backgroundColor: '#590e09ff', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                    Please fill in all required fields correctly.
                </Box>
            </Snackbar>

        </div>
    )
}
export default Admission;
import './Addmission.css'
import { useNavigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';

function Admission() {
    const navigate = useNavigate();

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Please fill in all required fields correctly.");

    const handleSuccessClose = () => setSuccessOpen(false);
    const handleErrorClose = () => setErrorOpen(false);

    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emergencyNumber, setEmergencyNumber] = useState('');
    const [marital, setMarital] = useState('');
    const [identificationDocu, setIdentificationDouc] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [addmissionDate, setAddmissionDate] = useState('');
    const [department, setDepartment] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [typeOfAddmission, setTypeOfAddmission] = useState('');
    const [reasonForAdmission, setReasonForAdmission] = useState('');
    const [paymentMode, setpaymentMode] = useState('');

    const [loading, setLoading] = useState(false);

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
        reasonForAdmission: false,
        paymentMode: false
    });

    const inputFeild = (e) => {
        const label = e.target.labels?.[0]?.innerText || e.target.name || e.target.id;
        const value = e.target.value;

        switch (label) {
            case 'Full Name':
                setErrors(prev => ({ ...prev, fullName: value.trim().length < 3 }));
                setFullName(value);
                break;
            case 'Gender':
                setErrors(prev => ({ ...prev, gender: value === '' }));
                setGender(value);
                break;
            case 'Age':
                setErrors(prev => ({ ...prev, age: value === '' }));
                setAge(value);
                break;
            case 'Blood Group':
                setErrors(prev => ({ ...prev, bloodGroup: value === '' }));
                setBloodGroup(value);
                break;
            case 'Contact Number':
                setErrors(prev => ({ ...prev, contactNumber: value.length !== 10 }));
                setContactNumber(value);
                break;
            case 'Email':
                setErrors(prev => ({ ...prev, email: !/\S+@\S+\.\S+/.test(value) }));
                setEmail(value);
                break;
            case 'Emergency Number':
                setErrors(prev => ({ ...prev, emergencyNumber: value.length !== 10 }));
                setEmergencyNumber(value);
                break;
            case 'Marital Status':
                setErrors(prev => ({ ...prev, marital: value === '' }));
                setMarital(value);
                break;
            case 'Identification Documents':
                setErrors(prev => ({ ...prev, identificationDocu: value === '' }));
                setIdentificationDouc(value);
                break;
            case 'Permanent Address':
                setErrors(prev => ({ ...prev, permanentAddress: value.trim().length < 5 }));
                setPermanentAddress(value);
                break;
            case 'Admission Date':
                const today = new Date().toISOString().split('T')[0];
                setErrors(prev => ({
                    ...prev,
                    addmissionDate: value === '' || value > today || value<today
                }));
                setAddmissionDate(value);
                break;
            case 'Department / Ward':
                setErrors(prev => ({ ...prev, department: value === '' }));
                setDepartment(value);
                break;
            case 'Doctor’s Name':
                setErrors(prev => ({ ...prev, doctorName: value === '' }));
                setDoctorName(value);
                break;
            case 'Type of Admission':
                setErrors(prev => ({ ...prev, typeOfAddmission: value === '' }));
                setTypeOfAddmission(value);
                break;
            case 'Reason for Admission':
                setErrors(prev => ({ ...prev, reasonForAdmission: value === '' }));
                setReasonForAdmission(value);
                break;
            case 'Mode of Payment':
                setErrors(prev => ({ ...prev, paymentMode: value === '' }));
                setpaymentMode(value);
                break;
            default:
                console.warn("Unhandled field:", label);
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
            reasonForAdmission: reasonForAdmission === '',
            paymentMode: paymentMode === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = async () => {
        if (validateAllFields()) {
            setLoading(true);

            const data = {
                fullName, gender, age, bloodGroup, contactNumber, email, emergencyNumber, marital,
                identificationDocu, permanentAddress, addmissionDate, department, doctorName,
                typeOfAddmission, reasonForAdmission, paymentMode
            };

            try {
                const response = await fetch('http://localhost:5000/AddPatient', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                console.log("Success:", result);
                setSuccessOpen(true);

                setTimeout(() => {
                    switch (paymentMode) {
                        case 'cash':
                            alert("Thank you");
                            break;
                        case 'card':
                            navigate('/card', { state: { name: 'AdmitFees', email: email } });
                            break;
                        case 'online':
                            navigate('/onlinepayment', { state: { name: 'AdmitFees', email: email } });
                            break;
                        default:
                            console.log("Unknown payment mode");
                            break;
                    }
                }, 2000);

            } catch (error) {
                console.error("Error submitting form:", error);
                setErrorMessage("Server error. Please try again later.");
                setErrorOpen(true);
            }
        } else {
            setErrorMessage("Please fill in all required fields correctly.");
            setErrorOpen(true);
        }
    };

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/AllPatientName')
            .then(res => res.json())
            .then(data => setPatients(data?.data || []))
            .catch(err => console.error(err));
    }, []);

    const PatientData = (email) => {
        const patient = patients.find(p => p.email === email);

        if (!patient) {
            setErrorMessage('Patient not found');
            setErrorOpen(true);
            return;
        }

        if (patient.Discharge[0]?.DischargeDate) {
            navigate('/receipt', { state: { email } });
        } else {
            navigate('/discharge', { state: { email } });
        }
    };

    const deleteById = async (email) => {
        if (!email) {
            setErrorMessage('No email provided for deletion.');
            setErrorOpen(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/deletePatient/${email}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (response.ok) {
                setErrorMessage('Patient deleted successfully!');
                setErrorOpen(true);

                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Wait 2 seconds before reloading
            } else {
                setErrorMessage('Deletion failed: ' + (result.message || 'Unknown error.'));
                setErrorOpen(true);
            }

        } catch (error) {
            console.error("Error during deletion:", error);
            setErrorMessage("A network error occurred while deleting.");
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
                            {patients.map((item, index) => (
                                <div key={index} className='CardTextdiv'>
                                    <div className='person'>
                                        <PersonIcon
                                            sx={{ fontSize: 40, color: '#05295f', cursor: 'pointer' }}
                                        />
                                        <Button onClick={() => PatientData(item.email)} className='link'>{item.fullName}</Button>
                                    </div>
                                    <DeleteIcon
                                        sx={{
                                            color: 'rgb(11, 91, 11)',
                                            fontSize: 28,
                                            cursor: 'pointer',
                                            '&:hover': { color: 'rgb(121, 12, 12)' },
                                        }}
                                        onClick={() => deleteById(item.email)}
                                    />
                                </div>
                            ))}
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
                                    id='Full Name'
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name='Full Name'
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.gender}
                                    helperText={errors.gender ? "Please select gender" : ""}
                                    id='Gender'
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
                                    name='Age'
                                    fullWidth
                                    defaultValue=''
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.bloodGroup}
                                    helperText={errors.bloodGroup ? "This field is required" : ""}
                                    id='Blood Group'
                                    label="Blood Group"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
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
                                    name='Contact Number'
                                    fullWidth
                                    defaultValue=''
                                    onChange={inputFeild}
                                />
                                <TextField
                                    error={errors.email}
                                    helperText={errors.email ? "Please Enter valid email" : ""}
                                    id="Email"
                                    label="Email"
                                    variant="outlined"
                                    name='Email'
                                    fullWidth
                                    defaultValue=''
                                    onChange={inputFeild}
                                />
                                <TextField
                                    error={errors.emergencyNumber}
                                    helperText={errors.emergencyNumber ? "Number Should be 10 digit" : ""}
                                    id="Emergency Number"
                                    label="Emergency Number"
                                    variant="outlined"
                                    defaultValue=''
                                    name='Emergency Number'
                                    fullWidth
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.marital}
                                    helperText={errors.marital ? "This field is required" : ""}
                                    id='Marital Status'
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
                                    id='Identification Documents'
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
                                    defaultValue=''
                                    name='Permanent Address'
                                    fullWidth
                                    onChange={inputFeild}
                                />
                            </div>
                            <h2>Admission Details</h2>
                            <div className='CT1'>
                                <TextField
                                    error={errors.addmissionDate}
                                    helperText={
                                        errors.addmissionDate
                                            ? "Date should not be in the future or past or empty"
                                            : ""
                                    }
                                    id='Admission Date'
                                    label="Admission Date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=''
                                    name='Admission Date'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputFeild}
                                />
                                <TextField
                                    select
                                    error={errors.department}
                                    helperText={errors.department ? "This field is required" : ""}
                                    defaultValue=""
                                    id='Department / Ward'
                                    label="Department / Ward"
                                    variant="outlined"
                                    name="Department / Ward"
                                    fullWidth
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
                                    id='Doctor’s Name'
                                    label="Doctor’s Name"
                                    variant="outlined"
                                    fullWidth
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
                                    id='Type of Admission'
                                    label="Type of Admission"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="Type of Admission"
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
                                    error={errors.reasonForAdmission}
                                    helperText={errors.reasonForAdmission ? "This field is required" : ""}
                                    id='Reason for Admission'
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
                                    id='Mode of Payment'
                                    label="Mode of Payment"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=''
                                    name='Mode of Payment'
                                    onChange={inputFeild}
                                >
                                    <MenuItem value="cash">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', fontWeight: 'bold' }}>
                                            Cash
                                            <AttachMoneyIcon sx={{ color: 'green' }} />
                                        </span>
                                    </MenuItem>

                                    <MenuItem value="card">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', fontWeight: 'bold' }}>
                                            Card
                                            <CreditCardIcon sx={{ color: 'red' }} />
                                        </span>
                                    </MenuItem>

                                    <MenuItem value="online">
                                        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', fontWeight: 'bold' }}>
                                            Online Payment
                                            <PaymentsIcon sx={{ color: 'blue' }} />
                                        </span>
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className="form-footer">
                                <Button variant="outlined" color="primary" onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {/* Snackbar Success */}
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

            {/* Snackbar Error */}
            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ backgroundColor: '#590e09ff', color: '#fff', px: 2, py: 1, borderRadius: 1 }}>
                    {errorMessage}
                </Box>
            </Snackbar>
        </div>
    )
}
export default Admission;
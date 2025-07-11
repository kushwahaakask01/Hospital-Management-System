import './Addmission.css'

//Material 
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';

// Bootstrap
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import { useState } from 'react';

function Admission() {
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
                                <TextField id="Full Name" label="Full Name" variant="outlined" />
                                <TextField select label="Gender" variant="outlined" fullWidth defaultValue="" name='Gender'>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField id="Age" label="Age" variant="outlined" />
                                <TextField select label="Blood Group" variant="outlined" fullWidth defaultValue="" name='Blood Group'>
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
                                <TextField id="Contact Number" label="Contact Number" variant="outlined" />
                                <TextField id="Email" label="Email" variant="outlined" />
                                <TextField id="Emergency Number" label="Emergency Number" variant="outlined" />
                                <TextField
                                    select
                                    label="Reason for Admission"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="Reason for Admission"
                                >
                                    <MenuItem value="accident">Accident/Injury</MenuItem>
                                    <MenuItem value="surgery">Scheduled Surgery</MenuItem>
                                    <MenuItem value="infection">Infection (e.g., COVID-19, pneumonia)</MenuItem>
                                    <MenuItem value="cardiac">Cardiac Issue (e.g., chest pain, heart attack)</MenuItem>
                                    <MenuItem value="respiratory">Respiratory Problem (e.g., asthma, COPD)</MenuItem>
                                    <MenuItem value="maternity">Maternity (Labor/Delivery)</MenuItem>
                                    <MenuItem value="checkup">General Check-up</MenuItem>
                                    <MenuItem value="mental-health">Mental Health Concern</MenuItem>
                                    <MenuItem value="diabetes">Diabetes Complications</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </div>
                            <div className='CT1'>
                                <TextField
                                    select
                                    label="Identification Documents"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
                                    name="identification"
                                >
                                    <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                                    <MenuItem value="PAN Card">PAN Card</MenuItem>
                                    <MenuItem value="Voter ID">Voter ID</MenuItem>
                                    <MenuItem value="Driving License">Driving License</MenuItem>
                                </TextField>

                                <TextField id="Permanent Address" label="Permanent Address" variant="outlined" />

                                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                            </div>
                            <h2>Admission Details</h2>
                            <div className='CT1'>
                                <TextField label="Admission Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />

                                <TextField select defaultValue="" label="Department / Ward" variant="outlined">
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

                                <TextField select label="Doctor’s Name" variant="outlined" defaultValue='' name='Doctor’s Name'>
                                    <MenuItem value="Dr. A. Kumar">Dr. A. Kumar (Cardiologist)</MenuItem>
                                    <MenuItem value="Dr. B. Sharma">Dr. B. Sharma (Neurologist)</MenuItem>
                                    <MenuItem value="Dr. C. Verma">Dr. C. Verma (Orthopedic)</MenuItem>
                                    <MenuItem value="Dr. D. Mehta">Dr. D. Mehta (Pediatrician)</MenuItem>
                                    <MenuItem value="Dr. E. Sinha">Dr. E. Sinha (Dermatologist)</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Type of Admission "
                                    variant="outlined"
                                    defaultValue=""
                                    name="Type of Admission "
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
                                    label="Reason for Admission"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue=""
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
                                    label="Mode of Payment"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="cash">Cash</MenuItem>
                                    <MenuItem value="card">Card</MenuItem>
                                    <MenuItem value="insurance">Insurance</MenuItem>
                                </TextField>
                            </div>
                            <div className="form-footer">
                                <Button variant="outlined" color="primary">Submit</Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
export default Admission;
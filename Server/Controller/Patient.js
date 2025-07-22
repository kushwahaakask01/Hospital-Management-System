const Patient = require('../Model/Patient');

//Add the pateint detail.................................................................
const AddPatient = async (req, resp) => {
    try {
        const {
            fullName,
            gender,
            age,
            bloodGroup,
            contactNumber,
            email,
            emergencyNumber,
            marital,
            identificationDocu,
            permanentAddress,
            addmissionDate,
            department,
            doctorName,
            typeOfAddmission,
            reasonForAdmission,
            paymentMode
        } = req.body;

        // ✅ Basic validation
        if (!fullName || !email || !contactNumber) {
            return resp.status(400).json({ message: 'Missing required fields: fullName, email, or contactNumber' });
        }

        console.log('New Patient Body:', req.body);
        // ✅ Create new patient using the exact schema field names
        const patient = new Patient({
            fullName: fullName,
            gender: gender,
            age: age,
            bloodGroup: bloodGroup,
            contact: contactNumber,
            email: email,
            emergencyContact: emergencyNumber,
            maritalStatus: marital,
            identification: identificationDocu,
            address: permanentAddress,
            admissionDate: addmissionDate,
            department: department,
            doctor: doctorName,
            admissionType: typeOfAddmission,
            admissionReason: reasonForAdmission,
            paymentMode: paymentMode
        });

        // ✅ Save to DB
        await patient.save();

        return resp.status(200).json({ message: 'Patient Added Successfully' });

    } catch (error) {
        console.error("Error adding patient:", error);
        return resp.status(500).json({ message: 'Error from server side', error: error.message });
    }
};

//Admit fees throw Card..................................................................
async function AdmitFeesByCard(req, resp) {
    try {
        const email = req.params.email;
        const { name, cardNumber, cvv, expireDate, amount, otp, } = req.body;

        if (!email || !name || !cardNumber || !cvv || !expireDate || !amount || !otp) {
            return resp.status(400).json({ message: 'Missing required fields' });
        }

        const result = await Patient.updateOne(
            { email: email },
            {
                $push: {
                    AdmitFeesCard: {
                        CardHolder: name,
                        CardNumber: cardNumber,
                        CardCVV: cvv,
                        ExpiryDate: expireDate,
                        Amount: amount,
                        OTP: otp
                    }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return resp.status(404).json({ message: 'Patient not found or card not added' });
        }

        return resp.status(200).json({ message: 'Admit fees added successfully' });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Discharge Fees throw Card..............................................................
async function DischargeFeesByCard(req, resp) {
    try {
        const email = req.params.email;
        const { name, cardNumber, cvv, expireDate, amount, otp, } = req.body;

        if (!email || !name || !cardNumber || !cvv || !expireDate || !amount || !otp) {
            return resp.status(400).json({ message: 'Missing required fields' });
        }

        const result = await Patient.updateOne(
            { email: email },
            {
                $push: {
                    DischrgeFeesCard: {
                        CardHolder: name,
                        CardNumber: cardNumber,
                        CardCVV: cvv,
                        ExpiryDate: expireDate,
                        Amount: amount,
                        OTP: otp
                    }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return resp.status(404).json({ message: 'Patient not found or card not added' });
        }

        return resp.status(200).json({ message: 'Discharge fees added successfully' });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Admit fees throw upi...................................................................
async function AdmitFeesByUpi(req, resp) {
    try {
        const email = req.params.email;
        const { upiId, otp, money } = req.body;
        const result = await Patient.updateOne(
            { email: email },
            {
                $push: {
                    AdmitFeesUPI: {
                        upiId: upiId,
                        otp: otp,
                        money: money
                    }
                }
            })
        if (result.modifiedCount === 0) {
            return resp.status(404).json({ message: 'Money is not added throw Upi(Admit Fees)' });
        }

        return resp.status(200).json({ message: 'Money is added successfully throw Upi(Admit Fees)' });
    } catch (error) {
        return resp.status(500).json({ message: 'Server error', error: error.message });
    }
}

//discharge fees throw upi ..............................................................
async function DischargeFeesByUpi(req, resp) {
    try {
        const email = req.params.email;
        const { upiId, otp, money } = req.body;
        const result = await Patient.updateOne(
            { email: email },
            {
                $push: {
                    DishchargeFeesUPi: {
                        upiId: upiId,
                        otp: otp,
                        money: money
                    }
                }
            })
        if (result.modifiedCount === 0) {
            return resp.status(404).json({ message: 'Money is not added throw Upi(DischargeFees)' });
        }

        return resp.status(200).json({ message: 'Money is added successfully throw Upi(DischargeFees)' });
    } catch (error) {
        return resp.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Get All Patient in Admissin for show the name in admissin .............................
async function AllPatientName(req, resp) {
    try {
        const patients = await Patient.find({});

        if (!patients || patients.length === 0) {
            return resp.status(404).json({ message: 'No patients found' });
        }

        return resp.status(200).json({ message: 'Patients found', data: patients });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Push the discharge data in database ...................................................
const DischargeDate = async (req, res) => {
    try {
        const email = req.params.email;
        const { dischargeDate, paymentMode } = req.body;
        if (!dischargeDate || !paymentMode) return res.status(400).json({ message: 'Missing required fields' });
        const result = await Patient.updateOne(
            { email: email },
            {
                $push: {
                    Discharge: {
                        DischargeDate: dischargeDate,
                        PaymentMode: paymentMode,
                    }
                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Patient not found or card not added' });
        }

        return res.status(200).json({ message: 'Discharge fees added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
//Get All data in discharge form.........................................................
const GetByEmailInDischarge = async (req, res) => {
    try {
        const email = req.params.email;
        const patient = await Patient.findOne({ email: email })
        if (!patient) return res.status(404).json({ message: 'No patients found' });
        return res.status(200).json({ message: 'Patients found', data: patient });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Get all data in receipt................................................................
const GetAllInReciepByEmail = async (req, resp) => {
    try {
        const email = req.params.email;
        const patient = await Patient.findOne({ email: email });
        if (!patient) return resp.status(404).json({ message: 'Patient not found' });
        return resp.status(200).json({ message: 'Patient found', data: patient })
    } catch (error) {
        resp.status(500).json({ message: 'Server Error', error: error.message })
    }
}

module.exports = {
    AddPatient,
    AdmitFeesByCard,
    DischargeFeesByCard,
    AdmitFeesByUpi,
    DischargeFeesByUpi,
    AllPatientName,
    DischargeDate,
    GetByEmailInDischarge,
    GetAllInReciepByEmail
};

const express = require('express');
const router = express.Router();
const {
    AddPatient,
    AdmitFeesByCard,
    AdmitFeesByUpi,
    DischargeFeesByCard,
    DischargeFeesByUpi,
    AllPatientName,
    DischargeDate,
    GetByEmailInDischarge,
    GetAllInReciepByEmail
} = require('../Controller/Patient')

router.post('/AddPatient', AddPatient);
router.put('/CreditCardAdmitFees/:email', AdmitFeesByCard);
router.put('/CreditCardDischargeFees/:email', DischargeFeesByCard)
router.put('/UPIadmitfees/:email', AdmitFeesByUpi);
router.put('/dischargeFees/:email', DischargeFeesByUpi)
router.get('/AllPatientName', AllPatientName);
router.put('/dischargeDate/:email', DischargeDate);
router.get('/GetByEmailInDecharge/:email', GetByEmailInDischarge)
router.get('/GetInRecieptByEmail/:email', GetAllInReciepByEmail);


module.exports = router;


const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  CardHolder: String,
  CardNumber: String,
  CardCVV: String,
  ExpiryDate: String,
  AdmitFees: String,
  Amount: String,
  OTP: String,
  PaymentDate: { type: Date, default: new Date() }
}, { _id: false });

const UpiPayment = new mongoose.Schema({
  upiId: String,
  otp: String,
  money: String,
  PaymentDate: { type: Date, default: new Date() }
})

const dischargeSchema = new mongoose.Schema({
  DischargeDate: String,
  PaymentMode: String,
}, { _id: false })

const patientSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  age: String,
  bloodGroup: String,
  contact: String,
  email: String,
  emergencyContact: String,
  maritalStatus: String,
  identification: String,
  address: String,
  admissionDate: String,
  department: String,
  doctor: String,
  admissionType: String,
  admissionReason: String,
  paymentMode: String,
  AdmitFeesCard: [cardSchema],
  AdmitFeesUPI: [UpiPayment],
  Discharge: [dischargeSchema],
  DischrgeFeesCard: [cardSchema],
  DishchargeFeesUPi: [UpiPayment]

}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;

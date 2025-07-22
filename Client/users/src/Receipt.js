import './Receipt.css';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Receipt() {
   const location = useLocation();
   const email = location.state?.email || '';
   const [patients, setPatients] = useState([]);

   useEffect(() => {
      if (!email) return;

      const fetchPatient = async () => {
         try {
            const res = await fetch(`http://localhost:5000/GetInRecieptByEmail/${email}`);
            const data = await res.json();

            if (Array.isArray(data?.data)) {
               setPatients(data.data);
            } else if (data?.data) {
               setPatients([data.data]);
            } else {
               setPatients([]);
            }
         } catch (err) {
            console.error('Fetch Error:', err);
            setPatients([]);
         }
      };

      fetchPatient();
   }, [email]);

   const handlePrint = () => {
      window.print();
   };

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5',
         }}
      >
         <Paper
            elevation={3}
            sx={{
               maxWidth: 800,
               width: '100%',
               padding: 4,
               backgroundColor: '#ffffff',
               borderRadius: 2,
               boxShadow: 3,
               textAlign: 'left',
            }}
         >
            <Typography variant="h5" align="center" gutterBottom>
               Payment Receipt
            </Typography>

            {patients.length > 0 ? (
               patients.map((item, index) => {
                  const AdmitCardPayment = item.AdmitFeesCard?.[0];
                  const AdmitUpiPayment = item.AdmitFeesUPI?.[0];
                  const AdmitPaymentDate = AdmitCardPayment?.PaymentDate || AdmitUpiPayment?.PaymentDate || "N/A";
                  const AdmitAmountPaid = AdmitCardPayment?.Amount ?? AdmitUpiPayment?.money ?? "N/A";

                  const DischargeCardPayment = item.DischrgeFeesCard?.[0];
                  const DischrgeUpiPayment = item.DishchargeFeesUPi?.[0];
                  const DischargePaymentDate = DischargeCardPayment?.PaymentDate || DischrgeUpiPayment?.PaymentDate || "N/A";
                  const DischargeAmountPaid = DischargeCardPayment?.Amount ?? DischrgeUpiPayment?.money ?? "N/A";

                  return (
                     <Box key={index}>
                        {/* Receipt section to print */}
                        <div id="receiptSection">
                           <div className="detail">
                              <Typography><strong>Name:</strong> {item.fullName}</Typography>
                              <Typography><strong>Email:</strong> {item.email}</Typography>
                           </div>

                           <div className="detail">
                              <Typography><strong>Gender:</strong> {item.gender}</Typography>
                              <Typography><strong>Age:</strong> {item.age}</Typography>
                              <Typography><strong>Blood Group:</strong> {item.bloodGroup}</Typography>
                              <Typography><strong>Contact:</strong> {item.contact}</Typography>
                           </div>

                           <div className="detail">
                              <Typography><strong>Emergency Contact:</strong> {item.emergencyContact}</Typography>
                              <Typography><strong>Marital Status:</strong> {item.maritalStatus}</Typography>
                              <Typography><strong>Identification:</strong> {item.identification}</Typography>
                              <Typography><strong>Address:</strong> {item.address}</Typography>
                           </div>

                           <div className="detail">
                              <Typography><strong>Admit Date:</strong> {item.admissionDate?.slice(0, 10)}</Typography>
                              <Typography><strong>Department:</strong> {item.department}</Typography>
                              <Typography><strong>Doctor Name:</strong> {item.doctor}</Typography>
                              <Typography><strong>Admission Type:</strong> {item.admissionType}</Typography>
                              <Typography><strong>Admission Reason:</strong> {item.admissionReason}</Typography>
                           </div>

                           <div className="detail">
                              <Typography><strong>Admit Fees:</strong> ₹{AdmitAmountPaid}</Typography>
                              <Typography><strong>Admit Payment Date:</strong> {AdmitPaymentDate?.slice(0, 10)}</Typography>
                              <Typography><strong>Discharge Amount:</strong> ₹{DischargeAmountPaid}</Typography>
                              <Typography><strong>Discharge Payment Date:</strong> {DischargePaymentDate?.slice(0, 10)}</Typography>
                           </div>
                        </div>

                        {/* Print Button */}
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={handlePrint}
                           sx={{ mt: 2 }}
                        >
                           Print Receipt
                        </Button>
                     </Box>
                  );
               })
            ) : (
               <Typography align="center">No receipt data found.</Typography>
            )}
         </Paper>
      </Box>
   );
}

export default Receipt;

import { useState } from 'react';
import './Frontpage.css';
import Hospital from './Image/Hospital.png';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

function Frontpage() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="Main">

            {/* Top Bar */}
            <Box className="Topdiv" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <LocalHospitalIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome to AKs Hospital
                        </Typography>
                        <Link to="/about" className="nav-link" style={{ marginRight: '20px' }}>About</Link>
                        <Link to="/admission" className="nav-link">Admission</Link>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Image Section*/}
            <div className="ImageWrapper">
                <img src={Hospital} className="Image" alt="Hospital" />

                <div className="OverlayButton">
                    <Button variant="outlined" onClick={handleClickOpen}>
                        CONTENT
                    </Button>
                </div>

                {/* Dialog Content */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Welcome to AKs Hospital – Where Compassion Meets Excellence."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            At AKs Hospital, we provide trusted, affordable, and expert healthcare services.
                            From emergency care to specialized treatments, our goal is to ensure your health, safety,
                            and comfort at every step. Your health is our mission — your trust, our success.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Frontpage;

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        localStorage.setItem('disclaimer', JSON.stringify(true))
        setOpen(false);
    };

    React.useEffect(() => {
        if(!JSON.parse(localStorage.getItem('disclaimer'))) return handleClickOpen()        
    }, [])

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" style={{ textAlign: 'center' }} onClose={handleClose}>
                    Disclaimer
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom style={{ textAlign: 'justify' }}>
                        CoinSniper gives user the opportunity to post information about crypto projects.Please note that CoinSniper does not verify the user generated content on this website. CoinSniper does not provide any financial advice, act as financial services provider or broker, or in any other way aid in the formation of any transactions in cryptocurrency or otherwise.
                    </Typography>
                    <Typography gutterBottom style={{ textAlign: 'justify' }}>
                        Also note that, the cryptocurrency listed on this website could potentially be scams, i.e. designed to induce you to invest financial resources that may be lost forever and not be recoverable once investments are made. You are responsible to Do Your Own Research (DYOR) regarding any information listed on this website.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Okay, I understand
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

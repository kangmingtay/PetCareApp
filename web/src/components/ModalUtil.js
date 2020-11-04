import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
    color: theme.palette.primary.contrastText,
  },
}));

const ModalUtil = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
                {props.children}
            </div>            
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalUtil;
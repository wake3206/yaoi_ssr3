import React, { Component } from 'react';
import { 
  Dialog,
  DialogContent,
  Zoom
} from '@material-ui/core'
import { FaCheckCircle } from 'react-icons/fa';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    backgroundColor: "transparent"
  },
  paper: {
    backgroundColor: "#2f2f2fe8",
    color:'#fff'
  },
  paperFullWidth:{
    maxWidth:'400px'
  }
};

class StatusDialog extends Component {


	render() {
    //console.log('render Home')
    const { open,handleClose,classes } = this.props
    const checked = true;


		return (

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{visibility:"unset"}}
        fullWidth={true}
        BackdropProps={{
          classes: {
              root: classes.root
            }
          }}
        classes={{
          paper: classes.paper,
          paperFullWidth:classes.paperFullWidth
        }}

        >
        <DialogContent 
          style={{textAlign:'center',paddingTop:'40px',paddingBottom:'40px'}} 
          
          >
    
            
          <Zoom in={true}  style={{ transitionDelay: checked ? 200 : 0 }} >
            <FaCheckCircle size={70} color="#33ce05" />
          </Zoom>
          <Zoom in={true}  style={{ transitionDelay: checked ? 300 : 0 }} >
            <h4>บันทึกสำเร็จ</h4>
          </Zoom>
          
            
        
        </DialogContent>
      
    </Dialog>
      
		);
	}

}

export default withStyles(styles)(StatusDialog)
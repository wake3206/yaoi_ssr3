import React,{Component}  from "react";
//import { Grid,Row, Col } from 'react-bootstrap';
import { Container } from 'reactstrap';
import LogoLite from './LogoLite'
import AccountInfo from './AccountInfo'
import MenuHeader from './MenuLite'
import { connect } from 'react-redux'
import { addUer,logout } from "../../../redux/actions/AuthAction";

import { 
  Grid,
  Hidden,
  Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
//import MenuIcon from '@material-ui/icons/Menu';
import {  Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FaLine,FaFacebookSquare,FaGooglePlusG,FaTwitter } from 'react-icons/fa';

import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  //console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


//import './header.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


class HeaderMain extends Component {


  constructor(){
    super()
    this.state = {
      modelLogout:false
    }
  }

  componentWillMount(){
    this.props.addUer()
  }

  handleLogout = () => {
    
    this.setState({
      modelLogout: true
    });
  }

  toggleDialogLogOut = () =>{
    this.setState({
      modelLogout: !this.state.modelLogout
    });
  }

  handleDialogLogout = (direc)=>{
    this.setState({
      modelLogout: direc
    });
  }

  isLogout = () =>{
    console.log('is isLogout')
    this.props.logout()
    this.props.history.push('/login')
  }


  render(){
    //console.log('render HeaderMain test8');

    const { classes,auth } = this.props;
    //console.log('main auth',auth)

    //let style = {border:'1px solid red'}
    let style = {}

    return (
      <div style={{height:'99px',backgroundColor:'rgb(80, 190, 173)'}}>
        <Modal isOpen={this.state.modelLogout} toggle={this.toggleDialogLogOut} >
          <ModalBody>
            <h3>ต้องการออกจากระบบหรือไม่ ?</h3>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.isLogout} >Logout</Button>
            <Button olor="inherit" onClick={this.toggleDialogLogOut} >Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <Hidden smDown>
          <div style={{backgroundColor:'#50bead'}}>
            <Container>
              <div className="container" style={{width:'100%'}} >

                <div className="row">

                  <div className="col-md-4" style={Object.assign(style)}>
                    <div style={{display:'inline-flex',position:'relative'}}>
            
                      <LogoLite />
                  
                      <div className="vdivide"></div>
                      
                      <div style={{paddingTop:'10px',marginLeft:'20px',color:'rgb(236, 234, 234)'}}>
                        <FaLine size={23}  />
                        <FaFacebookSquare size={23} style={{marginLeft:'10px'}} />
                        <FaGooglePlusG size={23}  style={{marginLeft:'10px'}} />
                        <FaTwitter  size={23}  style={{marginLeft:'10px'}}  />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 text-right"  style={Object.assign(style)}></div>
                  <div className="col-md-3 text-center"  style={style} >
                    <AccountInfo auth={ auth } onLogout={this.handleLogout} />
                  </div>

                </div>
                
              </div>
            </Container>
          </div>
          <div style={{backgroundColor:'#50bead',borderBottom:'1px solid rgb(40, 136, 121)'}}>
            <Container >
              <div className="container"  >
                <div className="row">
                  <div className="col-md-12 hidden-xs" style={Object.assign(style)}>
                    <MenuHeader />
                  </div>
                </div>
              </div>
            </Container >
          </div>
        </Hidden>

      

       

      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth:state.auth,
    history: state.RouteInfo.history
  }
}

export default  withStyles(styles)(
  connect(mapStateToProps,{ addUer,logout })(
    HeaderMain
  )
)


// (
//   <Hidden smDown>
//           <div style={{backgroundColor:'#50bead'}}>
//             <Container>
//               <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start" >
//                 <Grid item md={4} xs={4} style={Object.assign(style)}>
//                   <div style={{display:'inline-flex',position:'relative'}}>
          
//                     <LogoLite />
                 
//                     <div className="vdivide"></div>
                    
//                     <div style={{paddingTop:'10px',marginLeft:'20px',color:'rgb(236, 234, 234)'}}>
//                       <FaLine size={23}  />
//                       <FaFacebookSquare size={23} style={{marginLeft:'10px'}} />
//                       <FaGooglePlusG size={23}  style={{marginLeft:'10px'}} />
//                       <FaTwitter  size={23}  style={{marginLeft:'10px'}}  />
//                     </div>
//                   </div>
                 
//                 </Grid>

//                 <Grid item md={5} xs={5} className="text-right" style={Object.assign(style)}>
                 
//                 </Grid>
        
//                 <Grid item md={3} xs={9} className="text-center" style={style} >
//                   <AccountInfo auth={ auth } onLogout={this.handleLogout} />
//                 </Grid>
//               </Grid>
//             </Container>
//           </div>
//           <div style={{backgroundColor:'#50bead',borderBottom:'1px solid rgb(40, 136, 121)'}}>
//             <Container >
//               <Grid container spacing={0} alignItems="flex-start" >
               
//                 <Grid item md={12} sm={10} className="hidden-xs" style={Object.assign(style)}>
//                   <MenuHeader />
//                 </Grid>
               
//               </Grid>
//             </Container >
//           </div>
//         </Hidden>
// )

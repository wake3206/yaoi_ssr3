import React, { Component } from 'react';
import Router from 'next/router'
import { FaSignOutAlt,FaSearch,FaBell } from 'react-icons/fa';
import { 
	Grid,
	Button
} from '@material-ui/core'
import { connect } from 'react-redux'
import {  Modal, ModalBody, ModalFooter } from 'reactstrap';
import { logout } from '../../../redux/actions/AuthAction'
//import { NavLink,Nav,NavItem ,Navbar} from 'reactstrap';



class AccountInfo extends Component {

	constructor(){
		super()
		this.state = {
			modalLogout:false
		}
	}

	toggleDialogLogOut = () =>{
    this.setState({
      modalLogout: !this.state.modalLogout
    });
	}

	openModalLogout = () => {
		this.setState({
      modalLogout: true
    });
	}

	isLogout = () =>{
		Router.push('/login')
		this.setState({
      modalLogout: false
		});
		this.props.logout()
	}
	




	render() {

		const { auth } = this.props
		const { modalLogout } = this.state
		//console.log('auth',auth)

		const user = (auth.user) ? auth.user:{}

		//console.log('all props',auth)

		return (

      <div style={{color:'#fff'}}>

				<style jsx>{`
					.onMOver:hover {
						cursor: pointer;
					}
				`}</style>
        
				<Grid style={{paddingTop:'10px'}} >
					<Grid item container spacing={16} direction="row" justify="flex-end" alignItems="center"  >
						<Grid item md={5} style={{textAlign:'right'}}  >
							<FaSearch size={20} />
							<FaBell  size={20} style={{marginLeft:'10px'}} />
						</Grid>
						<Grid item md={7} style={{textAlign:'center'}} >
							<div style={{display:'inline-flex'}} >
								<div style={{fontSize:'16px'}}>{user.username}</div>
								<div style={{marginLeft:'5px'}} className="onMOver" >
									<FaSignOutAlt  onClick={this.openModalLogout}  size={20}/>
								</div>
							</div>
							
						</Grid>
					</Grid>
				</Grid>

				<Modal isOpen={modalLogout} toggle={this.toggleDialogLogOut} >
          <ModalBody>
            <h3>ต้องการออกจากระบบหรือไม่ ?</h3>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.isLogout} >Logout</Button>
            <Button olor="inherit" onClick={this.toggleDialogLogOut} >Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>

		);
	}

}

const mapStateToProps = (state) => {
	return {
		auth:state.auth
	}
}


export default connect(mapStateToProps,{ logout })(AccountInfo);


import React, { Component } from 'react';
import { 
	Grid,
	Divider
} from '@material-ui/core'
import WritingItem from "./WritingItem";
import { 
	Container,
	Button 
} from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux'
import { loadMyFiction } from '../../redux/actions/WritingAction'
import { PulseLoader } from 'react-spinners';
import Router from 'next/router'
//import { getCookie } from '../utility/cookie'

class MyWriting extends Component {

	constructor(){
		super()
		this.state = {
			models:[],
			loading:false
		}
	}

	componentWillMount(){

		//this.loadItems()
		// const { authInf } = this.props
		// this.props.loadMyFiction(authInf)

	}

	loadItems = () =>{

		this.setState({loading:true})
		
		let auth = JSON.parse(localStorage.getItem('auth')) || null

		if(auth !== null){

			fetch(`/api/writing/fetch_mywriting`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}`
			})
			.then( raw => raw.json() )
			.then((res) =>{
	
				if(!res.status){
					console.log('error',res.msg)
				}else{
					
					this.setState({models:res.values})
					
				}
	
				this.setState({loading:false})
					 
			})
			.catch(err => {
				console.log('err',err)
				this.setState({loading:false})
			})
		}

	}


	addNew = () =>{
		Router.push('/new_writing')
	}


	render() {
		console.log('render MyWriting components')

		//const { models ,loading} = this.state
		const { myFiction } = this.props
		const models  = myFiction.myFictionItems
		const loading = myFiction.loading 



		// const { authInf } = this.props
		//console.log('render -> myFiction',myFiction)


		let lists = <div></div>;

		if(loading){
			lists = <Grid item md={12} 
									style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> 
								<PulseLoader
								sizeUnit={"px"}
								size={50}
								color={'#d8d5d5'}
								loading={loading}
							/>  
							</Grid>
		}else if(models.length <= 0){

			lists = <Grid item md={12} 
								style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> ยังไม่มีงานเขียน  </Grid>

		}else{

			let cDelay = 0;
			lists = models.map((i,k)=>{
				cDelay += 50;
				return <WritingItem mode="edit" width={3} key={k} delay={cDelay} model={i} />
			})
		}

		

		return (
			
			<div>
				<Container>
					<Grid container spacing={16} style={{marginTop:'20px'}}  >
						<Grid item md={12} style={{textAlign:'left'}}  > 
							<Grid container >	
								<Grid  item md={6}  > 
									<h3>งานเขียนของฉัน</h3>
								</Grid>
								<Grid item md={6} style={{textAlign:'right'}}  > 
									<Button outline color="success" onClick={this.addNew}>
										<span><FaPlus size={15} /></span>{'  '}
										<span>เพิ่มงานเขียน</span>
									</Button>
								</Grid>
							</Grid>
							<Divider />
						</Grid>
					</Grid>

					<Grid container spacing={16} style={{marginTop:'20px'}}  >	
						{ lists }
					</Grid>

					
				</Container>
			</div>
     
      
		);
	}

}

const mapStateToProps = (state) => {
  return {
		authInf:state.auth,
		RouteInfo: state.RouteInfo,
		myFiction:state.WritingReducer
  }
}

export default connect(mapStateToProps,{ loadMyFiction })(MyWriting)


// (
// 	<Grid item md={2} style={{textAlign:'left'}}  > 
// 								<Card  className="d-flex card__zoom" style={{height:'100%',background:'#ccc'}}>
// 									<CardBody className="align-items-center d-flex justify-content-center" >
// 										<div>
// 											<div style={{color:'#555'}}><FaPlus style={{marginLeft:'8px'}} size={90} /></div>
// 										</div>
									
// 									</CardBody>
// 								</Card>
// 							</Grid>
// )
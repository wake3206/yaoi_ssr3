import React, { Component } from 'react';
import { 
	Grid,
	Divider
	
} from '@material-ui/core'
import { Container } from 'reactstrap';
import WritingItem from "../MyWriting/WritingItem";
import { connect } from 'react-redux'
import { fetchNewFeed,fetchByCate } from '../../redux/actions/WritingAction'



class CategoriesPresentLists extends Component {

	constructor(){
		super()
		this.state = {
			artFeedNew:[],
			artBlog:[],
			artLover:[],
			artDrama:[],
			load_artFeedNew:false,
			load_artBlog:false,
			load_artLover:false,
			load_artDrama:false,
		}
	}

	componentDidMount(){
		this.onFetchFeddNew()
		this.onFetchByCate('artBlog',7)
		this.onFetchByCate('artLover',1)
		this.onFetchByCate('artDrama',4)
	}

	onFetchFeddNew = async () =>{

		const { auth,fetchNewFeed }  = this.props

		if(auth !== null){

			const res = await  fetchNewFeed(auth)

			if(!res && !res.status){
				console.log('error',res.msg)
			}else{

				const model = (res.values) ? res.values:{}
				
				this.setState({artFeedNew:model})
				
			}

		}

	}

	onFetchByCate = async (stateName,cateId) =>{

		const { auth,fetchByCate }  = this.props

		if(auth !== null){

			const res = await fetchByCate(cateId,auth)

			if(!res && !res.status){
				console.log('error',res.msg)
			}else{

				const model = (res.values) ? res.values:{}
				
				this.setState({[stateName]:model})
				
			}

		}

	}


	render() {
		//console.log('render Home')

		const { artFeedNew,artBlog,artLover,artDrama } = this.state
		// const { routeInf } = this.props;

		// console.log('routeInf',routeInf)


		return (
			<Container>
				<Grid container spacing={16} style={{marginTop:'20px'}}  >
					<Grid item md={12} style={{textAlign:'left'}}  > 
						<h3>งานเขียนออกใหม่</h3>
						<Divider />
					</Grid>
					{ 
						(artFeedNew.length <= 0) ?
						<Grid item md={12} 
								style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> ยังไม่มีงานเขียน  </Grid>
						:
						artFeedNew.map((i,k)=>{
							return <WritingItem mode="view" key={k} width={3} model={i} />
						})	 
					}
				</Grid>
				<Grid container spacing={16} style={{marginTop:'20px'}}  >
					<Grid item md={12} style={{textAlign:'left'}}  > 
						<h3>บทความ</h3>
						<Divider />
					</Grid>
					{ 
						(artBlog.length <= 0) ?
						<Grid item md={12} 
								style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> ยังไม่มีงานเขียน  </Grid>
						:
						artBlog.map((i,k)=>{
							return <WritingItem mode="view"  key={k} width={3} model={i}  />
						})	 
					}
				</Grid>
				<Grid container spacing={16} style={{marginTop:'20px'}}  >
					<Grid item md={12} style={{textAlign:'left'}}  > 
						<h3>นิยายรัก</h3>
						<Divider />
					</Grid>
					{ 
						(artLover.length <= 0) ?
						<Grid item md={12} 
								style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> ยังไม่มีงานเขียน  </Grid>
						:
						artLover.map((i,k)=>{
							return <WritingItem mode="view"  key={k} width={3} model={i}  />
						})	 
					}
				</Grid>
				<Grid container spacing={16} style={{marginTop:'20px'}}  >
					<Grid item md={12} style={{textAlign:'left'}}  > 
						<h3>นิยายดราม่า</h3>
						<Divider />
					</Grid>
					{ 
						(artDrama.length <= 0) ?
						<Grid item md={12} 
								style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
							> ยังไม่มีงานเขียน  </Grid>
						:
						artDrama.map((i,k)=>{
							return <WritingItem mode="view"  key={k} width={3} model={i}  />
						})	 
					}
				</Grid>
			</Container>
 
		);
	}

}

const mapStateToProps = (state) =>{
	return {
		auth:state.auth
		
	}
}

export default connect(mapStateToProps,{ fetchNewFeed,fetchByCate })(CategoriesPresentLists)
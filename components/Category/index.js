import React, { Component } from 'react';
import {
 Container,
} from 'reactstrap';
import { 

	Grid,
	Divider
	
} from '@material-ui/core'
import WritingItem from "../MyWriting/WritingItem";
import { connect } from 'react-redux'
import { fetchByCate } from '../../redux/actions/WritingAction'

class Category extends Component {

  constructor(){
		super()
		this.state = {
      
			artBlog:[],
			artLover:[],
      artDrama:[],
      artYaoi:[],
      artYuri:[],
      artMysterious:[],
      artFantasy:[],
      artLiterature:[],
      artOther:[],
      
			load_artBlog:false,
			load_artLover:false,
      load_artDrama:false,
      load_artYaoi:false,
      load_artYuri:false,
      load_artMysterious:false,
      load_artFantasy:false,
      load_artLiterature:false,
      load_artOther:false
      
		}
	}

	componentDidMount(){
    
		this.onFetchByCate('artBlog',7)
		this.onFetchByCate('artLover',1)
    this.onFetchByCate('artDrama',4)

    this.onFetchByCate('artYaoi',2)
    this.onFetchByCate('artYuri',3)
    this.onFetchByCate('artMysterious',5)
    this.onFetchByCate('artFantasy',6)
    this.onFetchByCate('artLiterature',8)
    this.onFetchByCate('artOther',9)
    
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
    const { children } = this.props
    const { 
      artBlog,
			artLover,
      artDrama,
      artYaoi,
      artYuri,
      artMysterious,
      artFantasy,
      artLiterature,
      artOther,
      load_artBlog,
			load_artLover,
      load_artDrama,
      load_artYaoi,
      load_artYuri,
      load_artMysterious,
      load_artFantasy,
      load_artLiterature,
      load_artOther,
     } = this.state

		return (

      <Container>
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

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>นิยาย Yaoi</h3>
            <Divider />
          </Grid>
          { 
            (artYaoi.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artYaoi.map((i,k)=>{
              return <WritingItem mode="view"  key={k} width={3} model={i}  />
            })	 
          }
        </Grid>

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>นิยาย Yuri</h3>
            <Divider />
          </Grid>
          { 
            (artYuri.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artYuri.map((i,k)=>{
              return <WritingItem mode="view"  key={k} width={3} model={i}  />
            })	 
          }
        </Grid>

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>นิยายลึกลับ</h3>
            <Divider />
          </Grid>
          { 
            (artMysterious.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artMysterious.map((i,k)=>{
              return <WritingItem mode="view"  key={k} width={3} model={i}  />
            })	 
          }
        </Grid>

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>นิยายแฟนตาซี</h3>
            <Divider />
          </Grid>
          { 
            (artFantasy.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artFantasy.map((i,k)=>{
              return <WritingItem mode="view"  key={k} width={3} model={i}  />
            })	 
          }
        </Grid>

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>วรรณกรรม</h3>
            <Divider />
          </Grid>
          { 
            (artLiterature.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artLiterature.map((i,k)=>{
              return <WritingItem mode="view"  key={k} width={3} model={i}  />
            })	 
          }
        </Grid>

        <Grid container spacing={16} style={{marginTop:'20px'}}  >
          <Grid item md={12} style={{textAlign:'left'}}  > 
            <h3>อื่นๆ</h3>
            <Divider />
          </Grid>
          { 
            (artOther.length <= 0) ?
            <Grid item md={12} 
                style={{textAlign:'center',fontSize:'40px',color:'#d8d5d5',fontWeight:'bolder'}}  
              > ยังไม่มีงานเขียน  </Grid>
            :
            artOther.map((i,k)=>{
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

export default connect(mapStateToProps,{ fetchByCate })(Category)
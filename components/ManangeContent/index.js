import React, { Component } from 'react';
import { 
  Grid,
  Divider
} from '@material-ui/core'
import dynamic from 'next/dynamic'
//import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { loadFictionByTitle ,setContentNow,loadArticleById} from '../../redux/actions/WritingAction'
import { 
  Container,
  Button,
  Breadcrumb,
  BreadcrumbItem 
} from 'reactstrap';
import { FaEdit} from 'react-icons/fa';
import CoverTop from './CoverTop'
import Preface from './Preface'
import ContentForm from './ContentForm'
import StatusDialog from '../utility/StatusDialog'
import Router from 'next/router'


const ContentFormSSR = dynamic(
  import('./ContentForm'),
  { 
    ssr: false ,
    loading: () => (<h1>Loading...</h1>)
  }
)

class ManangeContent extends Component {

  constructor(){
    super()
    this.state = {
      succOpen:false
    }
  }


  handleClose = () =>{
    this.setState({succOpen:false})
  }

  componentDidMount(){
    const { id,loadArticleById,objAuth } = this.props 
    //console.log('query id',id);

    //this.props.loadFictionByTitle(match.params.fictionId)
    loadArticleById(id,objAuth)

  }

  goto = (path) => {
    Router.push(path)
  }

  showStatusDialog = (newContent) => {
    
    const { id,loadArticleById,objAuth } = this.props 
    //console.log('query id',id);

    //this.props.loadFictionByTitle(match.params.fictionId)
    //loadArticleById(id,objAuth)
    

    this.setState({succOpen:true})
    setTimeout(()=>{
      this.setState({succOpen:false})
    },2000)
  }


	render() {
    
    const { model } = this.props 
    //console.log('render Home',model)
    //console.log('model',model)
    const { succOpen } = this.state

    //onsole.log('loading:',loading,'model',model);

		return (

      <div style={{backgroundColor:'#f5f5f5'}}>

        <style jsx global>{`
          .avatar: {
            margin: 0,
          }
          .bigAvatar: {
            width: 50,
            height: 50,
          }
        `}</style>

				<div>
          <Container className="addform" style={{paddingBottom:'200px'}} >
            <Grid container spacing={0} style={{}}  >
              <Grid item md={12} style={{textAlign:'left'}}  > 
                <div>
                 
                  <Breadcrumb >
                    <BreadcrumbItem onClick={()=>this.goto('/my_writing')} ><a >งานเขียนของฉัน</a></BreadcrumbItem>
                    <BreadcrumbItem active>เขียนเนื้อหา</BreadcrumbItem>
                  </Breadcrumb>
                 
                </div>
              </Grid>
            </Grid>
           
            <Grid container spacing={16} style={{backgroundColor:'#fff'}}  >
              <Grid item md={12} style={{textAlign:'right'}}  > 
                <Button 
                    outline 
                    color="success" 
                    style={{float:'right'}} 
                    onClick={()=>this.goto(`/edit_writing/${model.id}`)}
                  >
                  <span><FaEdit size={15} /></span>{'  '}
                  <span>แก้ไข</span>
								</Button>
              </Grid>
              <Grid item md={12} > 
                <CoverTop {...this.props} />
              </Grid>
              <Grid item md={12}  >
                <Preface {...this.props} />
              </Grid>
              <Grid item md={12}>
                <Divider light />
                <ContentForm {...this.props} showStatusDialog={this.showStatusDialog} />
              </Grid>
            </Grid>
            <Grid item md={9}>

            </Grid>
					</Container>
				</div>
        <StatusDialog open={succOpen} handleClose={this.handleClose} />
      </div>
      
		);
	}

}

const mapStateToProps = (state) => {
  return {
    match:state.RouteInfo.match,
    model:state.WritingReducer.fictionByTitle,
    loading:state.WritingReducer.loading,
    authInf:state.auth,
    history:state.RouteInfo.history
  }
}

export default connect(mapStateToProps,{loadFictionByTitle,setContentNow,loadArticleById})(
  ManangeContent
)


// (
//   style={{
//     paddingRight:'30px',
//     paddingLeft:'30px',
//     backgroundImage:`url(${bg})`,
//     backgroundSize:'cover',
//     height:'400px'
//   }} 
// )
import React, { Component } from 'react';
import { 
  Grid,
  Divider
} from '@material-ui/core'
//import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { 
  loadFictionByTitle ,
  setContentNow,
  loadArticleById,
  updateViewersAndReload
} from '../../redux/actions/WritingAction'
import { 
  Container,
  Breadcrumb,
  BreadcrumbItem 
} from 'reactstrap';
import CoverTop from '../ManangeContent/CoverTop'
import Preface from '../ManangeContent/Preface'
//import ManageContent from './ManageContent'
import StatusDialog from './../utility/StatusDialog'
import Content from './Content'
import Router from 'next/router'



class ViewArticle extends Component {

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
    
    const { id,objAuth,loadArticleById,updateViewersAndReload } = this.props;


    //loadArticleById(id,objAuth)
    //update viewers
    updateViewersAndReload(id,objAuth)

  }

  goto = (path) => {
    Router.push(path)
  }

  showStatusDialog = (newContent) => {
    
    const { id } = this.props 
   

    this.props.loadFictionByTitle(id)
    this.setState({succOpen:true})
    setTimeout(()=>{
      this.setState({succOpen:false})
    },2000)
  }


	render() {
    //console.log('render Home')
    const { model } = this.props 
    //console.log('model',model)
    const { succOpen } = this.state

    //onsole.log('loading:',loading,'model',model);

		return (

      <div style={{backgroundColor:'#f5f5f5'}}>
				<div>
          <Container className="addform" style={{paddingBottom:'200px'}} >
            <Grid container spacing={0} style={{}}  >
              <Grid item md={12} style={{textAlign:'left'}}  > 
                <div>
                 
                  <Breadcrumb >
                    <BreadcrumbItem onClick={()=>this.goto('/')} ><a >หน้าหลัก</a></BreadcrumbItem>
                    <BreadcrumbItem active>{model.title}</BreadcrumbItem>
                  </Breadcrumb>
                 
                </div>
              </Grid>
            </Grid>
           
            <Grid container spacing={16} style={{backgroundColor:'#fff'}}  >
              
              <Grid item md={12} > 
                <CoverTop {...this.props} />
              </Grid>
              <Grid item md={12}  >
                <Preface {...this.props} />
              </Grid>
              <Grid item md={12}>
                <Divider light />
                <Content model={model} />
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
    model:state.WritingReducer.fictionByTitle,
    loading:state.WritingReducer.loading
  }
}

export default connect(mapStateToProps,{
  loadFictionByTitle,
  setContentNow,
  loadArticleById,
  updateViewersAndReload
})( ViewArticle)

import React, { Component } from 'react';
import { 
  Grid,
  Zoom
} from '@material-ui/core'
import { 
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle
} from 'reactstrap';
import { FaEye ,FaCommentAlt } from 'react-icons/fa';
import Router from 'next/router'
import { API } from '../../config'
import { connect } from 'react-redux'



class WritingItem extends Component {

  constructor(props){
    super(props)
    const routeUrl = (props.mode === 'edit') ? '/edit_content/':'/article/'
    this.state = {
      mode:'view',
      routeUrl
    }
  }

  goto = () =>{

    const { model,history } = this.props
    const { routeUrl } = this.state
    Router.push(routeUrl+model.id)

  }


	render() {
    //console.log('render Home')
    const { width,delay,model } = this.props
    //console.log('WritingItem model',model)

    //limit string
    let synopsis = model.synopsis
    if(model.synopsis){
      const len = model.synopsis.length
      const strLimit = 100;

      if(len> strLimit){
        synopsis =  model.synopsis.substr(0,strLimit)+'...'
      }
    }
    //--

    const pathImg = (model.cover_path_name !== '') ? 
      `${API}/images/covers/${model.cover_path_name}`
      :"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    
		return (
      <Zoom in={true}  style={{ transitionDelay: (delay)?delay:0 }} >
        <Grid item md={width} style={{textAlign:'left'}} onClick={this.goto}  > 
          
          <Card className="card__zoom" style={{height:'400px'}}>
            <div 
              style={{
                color:'rgb(86, 86, 86)',
                position:'absolute',
                right:'0',
                padding:'10px',
                bottom:'1px'
              }}
              >
              <div style={{float:'left'}}>
                <FaEye style={{verticalAlign:'middle'}} size={20} />{' '}
                <span style={{verticalAlign:'middle'}} >{model.amt_read}</span>
              </div>
              <div style={{float:'left',marginLeft:'10px'}}>
                <FaCommentAlt style={{verticalAlign:'middle'}} size={20} />{' '}
                <span style={{verticalAlign:'middle'}} >{model.amt_comment}</span>
              </div>
              
            </div>

            
            <CardImg top width="100%" height="208" src={pathImg} alt="Card image cap" />
            <CardBody>
              <CardTitle>{model.title}</CardTitle>
              <CardSubtitle>{model.author}</CardSubtitle>
              <CardText>{synopsis}</CardText>
              
            </CardBody>
          </Card>
          
        </Grid>
      </Zoom>
		);
	}

}

const mapStateToProps = (state) =>{
  return {
    history:state.RouteInfo.history
  }
}

export default connect(mapStateToProps,{})(WritingItem)
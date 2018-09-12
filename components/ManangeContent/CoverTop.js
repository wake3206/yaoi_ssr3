import React, { Component } from 'react';
import { 
  Card,
  CardImg
} from 'reactstrap';
//import bg from './Storm_and_Light.jpg'
import { FaEye ,FaCommentAlt } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners'
import { API } from '../../config' 
//import blankImg from './blank_img.png'

class CoverTop extends Component {

  constructor(){
    super()
    this.state = {
      loading:true
    }
  }

  componentWillReceiveProps(prop){
    //console.log('componentWillReceiveProps',prop)
    const { loading  } = prop
    this.setState({loading})
  }


	render() {
    //console.log('render Home')
    const { model } = this.props 
    const { loading } = this.state
    //console.log('loading',loading,model.user)
    const user = (model.user === undefined) ? {}:model.user 
    const category = (model.category  === undefined) ? {}:model.category 
    const contentRateing = (model.content_rating  === undefined) ? {}:model.content_rating 

    //console.log('loading',loading)

    const pathImg = (!loading && model.cover_path_name !== undefined) ? 
      `${API}/images/covers/${model.cover_path_name}`
      :"/static/images/blank_img.png"

    //console.log('pathImg',pathImg)

		return (

      <div className="container" style={{position:'relative'}}>
        <div style={{zIndex:'1',position:'absolute',top:'50%',left:'50%'}}>
          <PropagateLoader
              sizeUnit={"px"}
              size={20}
              color={'#fcfdfba1'}
              loading={loading}
              
            />
        </div>
        
        <div className="imgBlurWidget imgBlurCenter">

          <div  style={{
            background:`url(/static/images/Storm_and_Light.jpg) no-repeat center center fixed`,
            backgroundSize: 'cover',
            overflow: 'hidden',
            filter: 'blur(23px)',
            position: 'absolute',
            height: '500px',
            top: '-50px',
            left: '-50px',
            right: '-50px',
            bottom: '-50px'
          }}></div>


          
          <div className="text imgBlurCenter" style={{padding:'20px' }}>
            
            <div className="container" style={{color:'#fff'}}   >
              <div className="row">
                <div className="col-md-3"  >
                  <Card 
                    style={{
                      width:'250px',
                      height:'252px',
                      marginLeft:'auto',
                      marginRight:'auto'
                    }}>
                    <CardImg 
                      top 
                      width="250px" 
                      height="250px" 
                      src={pathImg} alt="Card image cap" 
                    />
                  </Card>
                </div>  
                <div className="col-md-9" >
                  <div  className="container"   >
                    <div className="col-md-12" >
                      <h1>{!loading && model.title}</h1>
                    </div>
                    <div className="col-md-12">
                      <div>
                        {!loading && model.synopsis} 
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{marginTop:'40px'}}>
                
                  <div  className="container"  >
                    <div className="row">
                      <div className="col-md-3">
                        <div className="container row"  >

                          <div className="col-md-4">
                            <img 
                              src={pathImg} 
                              alt="..." 
                              style={{width:'50px',height:'50px'}} 
                              className="rounded-circle border border-info" 
                            />
                          </div>
                          <div className="col-md-8">
                            <div >{model.author}</div>
                            <div >{user.username}</div>
                          </div>
                        </div>
                      </div>
                   
                      <div className="col-md-9" style={{textAlign:'right'}}>
                        <div 
                          style={{
                            padding:'10px',
                            bottom:'1px'
                          }}
                          >
                          <div style={{float:'right',marginRight:'25px'}}>
                          {!loading && contentRateing.name}
                          </div>
                          <div style={{float:'right',marginRight:'25px'}}>
                            {!loading && category.name}
                          </div>
                          <div style={{float:'right',marginRight:'25px'}}>
                            <FaEye style={{verticalAlign:'middle'}} size={20} />{' '}
                            <span style={{verticalAlign:'middle'}} >{!loading && model.amt_read}</span>
                          </div>
                          <div style={{float:'right',marginRight:'25px'}}>
                            <FaCommentAlt style={{verticalAlign:'middle'}} size={20} />{' '}
                            <span style={{verticalAlign:'middle'}} >{!loading && model.amt_comment}</span>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>

              </div>       

             
            </div>

          </div>

        </div>
      </div>
      
		);
	}

}

export default CoverTop
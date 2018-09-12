import React,{ Component } from 'react';
//import { Form,Image} from 'semantic-ui-react'
import { 
	Card, 
  CardImg,
  CardImgOverlay,
  Input
} from 'reactstrap';
import { API } from '../../config'
//import blankImg from '../manageWriting/blank_img.png'


class ImageUpload extends Component {

  constructor(props) {
    super(props);

    let image = '/static/images/blank_img.png';
    if(props.model !== undefined && props.model.cover_path_name !== undefined){
      image = `${API}/images/covers/${props.model.cover_path_name}`
    }
    this.state = {
      file: '',
      imagePreviewUrl:image
    };
  }

  componentWillReceiveProps(props){
    if(props.model !== undefined && props.model.cover_path_name !== undefined){
      this.setState({imagePreviewUrl:`${API}/images/covers/${props.model.cover_path_name}`})
    }
    
    
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    //console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

    this.props.setImg(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    //const { model } = this.props
    //console.log('loading',loading,'path name',model.cover_path_name);
    //let imagePreviewUrl = blankImg 

    if(imagePreviewUrl === undefined){
      imagePreviewUrl = blankImg
    }

    // if(model.cover_path_name !== undefined){
    //   imagePreviewUrl =  "/images/covers/"+model.cover_path_name
    // }

    return (
      <div className="previewComponent">
       <Card style={{width:'250px',height:'250px',marginLeft:'auto',marginRight:'auto'}}>
          <CardImg 
            top 
            width="250px" 
            height="250px" 
            src={imagePreviewUrl} alt="Card image cap" 
          />
          <CardImgOverlay>
            <Input 
                type="file" 
                style={{width:'100%',height:'100%',opacity:'0'}}
                name="imgFile"
                onChange={(e)=>this._handleImageChange(e)}
              />
          </CardImgOverlay>
        </Card>
      </div>
    )
  }

}

export default ImageUpload;
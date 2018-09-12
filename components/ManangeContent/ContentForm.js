import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  Grid
} from '@material-ui/core'
import { 
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw,convertFromRaw} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import { ClipLoader } from 'react-spinners';
import { API } from '../../config'



class ContentForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      editorState:EditorState.createEmpty(),
      saving:false
    }
  }

  componentWillReceiveProps(nP){

    const {model} = nP
    //console.log('componentWillReceiveProps',model)
    let render = '';
    //console.log('lentght===>',props.model.fiction_contents.fiction_contents.lenght)
    
    if(model.fiction_contents !== undefined && model.fiction_contents.length > 0){

      render = EditorState.createWithContent(
        convertFromRaw(JSON.parse(model.fiction_contents[0].content))
      )


    }else{
      render =  EditorState.createEmpty()
    }

    this.setState({
      editorState:render
    });
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onSaveContent = () =>{

    this.setState({saving:true})

    let formData = new FormData();
    const { auth,model,showStatusDialog } = this.props
    //const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    const content =  JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))

  
    
    console.log('authInf',auth)
    formData.append('content',content)
    formData.append('fiction_id',model.id)
    formData.append('user_id',auth.user.id)

    //formData.append('name','3333')

    //const URL = 'http://localhost:3003';
    //let auth = JSON.parse(localStorage.getItem('auth')) || null

    //console.log('onSubmit =>',value)

    let config = {
      method: 'POST',
      headers: { 
        //'Content-Type':'application/x-www-form-urlencoded' ,
        //"Content-Type": "application/json; charset=utf-8",
        //"Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'Authorization': `Bearer ${auth.token}`
      },
      body: formData
    }

    fetch(`${API}/api/writing/save_content`, config)
    .then( raw => raw.json() )
    .then((res) =>{

      if(res.status === 'error'){
        console.log('error',res.msg)
      }else{
        //this.setState({succOpen:true})
        console.log('res',res)
        if(showStatusDialog !== undefined){
          showStatusDialog(content)
        }
        
      }

      this.setState({saving:false})
         
    })
    .catch(err => {
      console.log('err',err)
      this.setState({saving:false})
    })

  }

	render() {
    //console.log('render Home')
    const { editorState,saving } = this.state
    //const { model } = this.props 
    //fiction_contents

		return (
      <Form className="form" role="form" >
        <Grid container style={{marginTop:'25px'}} >
          <Grid item md={12} style={{textAlign:'center'}}>
            <h3>เนื้อเรื่อง</h3>
          </Grid>
          <Grid item md={12} style={{textAlign:'center'}}>
            <Editor
              editorState={editorState}
              wrapperClassName="addcontent-wrapper"
              editorClassName="addcontent-editor"
              onEditorStateChange={this.onEditorStateChange}

            />
          </Grid>
          <Grid item md={12}>
            <FormGroup className="text-center">
              <Button 
                block  
                color="info"
                onClick={this.onSaveContent}
              >
                <ClipLoader
                
                  sizeUnit={"px"}
                  size={25}
                  color={'#fff'}
                  loading={saving}
                />
                {!saving && 'บันทึก'}
              </Button> 
            </FormGroup>  
          </Grid>
        </Grid>
      </Form>
		);
	}

}

const mapStateToProps = (state) => {
  return {
		auth:state.auth
  }
}

export default connect(mapStateToProps)(ContentForm)
import React, { Component } from 'react';
import { 
  Grid,
  DialogContent,
  Dialog,
  Zoom
} from '@material-ui/core'
import { 
  Container,
  Button,
  Breadcrumb,
  BreadcrumbItem ,
  FormGroup,
  Form
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { 
  RenderTextField,
  RenderTextAreaField ,
  RenderDropdownField
} from '../utility/forms/RenderFields'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw,convertFromRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import { stateFromHTML } from 'draft-js-import-html'
import ImageUpload from './ImageUpload'
import { connect } from 'react-redux'
import { loadFictionById,emtyFictionForm,setInitFormAdd } from '../../redux/actions/WritingAction'
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa';
import { API } from '../../config'
import Router from 'next/router'



const validate = values => {
  //console.log('validate',values);
  const errors = {}

  if (!values.title) {
    errors.title = "กรูณากรอก ชื่อเรื่อง"
  }

  if (!values.articleSynopsis) {
    errors.articleSynopsis = "กรูณากรอก คำโปรย"
  }

  if (!values.authorName) {
    errors.authorName = "กรูณากรอก นามปากกา"
  }

  if (!values.category) {
    errors.category = "กรูณาเลือก หมวดหมู่"
  }

  if (!values.contentRating) {
    errors.contentRating = "กรูณาเลือก ระดับเนื้อหา"
  }

  return errors
}


class ManageWriting extends Component {

  constructor(){
    super()
    this.state = {
      editorState: EditorState.createEmpty(),
      imgCoverFile:null,
      saving:false,
      succOpen:false,
      loading:false,
      categoryItems:[],
      contentRatingItems:[],
      mode:'new',
      fictionId:undefined
    }
  }

  componentDidMount(){
    //const { authInf } = this.props
    const { id,loadFictionById,emtyFictionForm,authInf } = this.props 
    //let auth = JSON.parse(localStorage.getItem('auth')) || null

    


    if(id !== undefined){
      this.setState({mode:'edit',fictionId:id})
      loadFictionById(id,authInf)
    }else{
      emtyFictionForm()
    }

    //load category
    this.loadCategory(authInf)
    //--
    this.loadContentRating(authInf)

  }
  
  componentWillReceiveProps(nP){

    const { model } = nP
    //console.log('componentWillReceiveProps',model)
    let render = '';
    //console.log('componentWillReceiveProps')
    
    if(model.preface !== undefined){

      // console.log('af props===>',model.preface)
      // console.log('bf props===>',this.props.model.preface)

      render = EditorState.createWithContent(
        convertFromRaw(JSON.parse(model.preface))
      )

      //console.log('render to html',draftToHtml(convertToRaw(render.getCurrentContent())))
    }else{
      render =  EditorState.createEmpty()
    }

    this.setState({
      editorState:render
    });

    
  }

  loadContentRating = (auth) =>{
    this.setState({loading:true})
    if(auth !== null){

			fetch(`${API}/api/writing/fetch_content_rating`, {
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
          
          //console.log('model value:',res.values)
          if(res.values.length > 0){

            const contentRatingItems = res.values.map((i)=>{
              return {text:i.name,value:i.id}
            })
					  this.setState({contentRatingItems})

          }
				}
	
				this.setState({loading:false})
					 
			})
			.catch(err => {
				console.log('err',err)
				this.setState({loading:false})
			})
			

		}
  }

  loadCategory = (auth) =>{
    this.setState({loading:true})
    if(auth !== null){

			fetch(`${API}/api/writing/fetch_category`, {
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
          
          //console.log('model value:',res.values)
          if(res.values.length > 0){

            const categoryItems = res.values.map((i)=>{
              return {text:i.name,value:i.id}
            })
					  this.setState({categoryItems})

          }
				}
	
				this.setState({loading:false})
					 
			})
			.catch(err => {
				console.log('err',err)
				this.setState({loading:false})
			})
			

		}
  }

  onSubmit = (value) =>{

    this.setState({saving:true})

   
    let formData = new FormData();
    const { authInf,model ,setInitFormAdd} = this.props
    const { mode } = this.state
    //const article_rec = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    const article_rec = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    //console.log('authInf',authInf)
    formData.append('article_rec',article_rec)
    formData.append('user_id',authInf.user.id)

    for(let k in value){
      formData.append(k,value[k])
    }

    formData.append('imgCoverFile',this.state.imgCoverFile)

    if(mode === 'edit'){
      formData.append('id',model.id)
      model.preface = article_rec
      setInitFormAdd(model)
    }

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
        'Authorization': `Bearer ${authInf.token}`
      },
      body: formData
    }

    fetch(`${API}/api/writing/addnew`, config)
    .then( raw => raw.json() )
    .then((res) =>{

      if(res.status === 'error'){
        console.log('error',res.msg)
      }else{
        
        if(mode === 'edit'){
          //load(model.id)

        }
        this.setState({succOpen:true})
        //console.log(res)
      }

      this.setState({saving:false})
         
    })
    .catch(err => {
      console.log('err',err)
      this.setState({saving:false})
    })

  }

  setImg = (file) =>{
    this.setState({imgCoverFile:file})
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  goTo = (path) =>{
    //const { history } = this.props
    Router.push(path)
  }

  handleClose = () => {
    this.setState({succOpen:false})
  }


	render() {

    const { editorState,saving,succOpen,categoryItems,contentRatingItems } = this.state
    const { handleSubmit,model } = this.props

    //console.log('initialValues',initialValues,'model',model)
    //console.log('model=',model)
   
    // if(mode === 'edit'){
    //   console.log('edit load initialValues',initialValues);
    //   console.log('model',model)
    // }

    let checked = true;

		return (
			

      <div style={{backgroundColor:'#f5f5f5'}}>
			
				<div>
       
					<Container className="addform" style={{paddingBottom:'200px'}} >
            <Grid container spacing={0} style={{}}  >
              <Grid item md={12} style={{textAlign:'left'}}  > 
                <div>
                 
                  <Breadcrumb >
                    <BreadcrumbItem ><a >งานเขียนของฉัน</a></BreadcrumbItem>
                    <BreadcrumbItem active>เพิ่มงานเขียน</BreadcrumbItem>
                  </Breadcrumb>
                 
                </div>
              </Grid>
            </Grid>
            <Form className="form" role="form" >
              <Grid container spacing={16} style={{backgroundColor:'#fff'}}  >
                <Grid item md={12}   > 
                  
                </Grid>
                <Grid item md={12} style={{paddingRight:'30px',paddingLeft:'30px'}}   > 
                  
                  <Grid container justify="center" >
                    <Grid item md={4}   > 
                      <ImageUpload setImg={this.setImg} {...this.props} />
                    </Grid>
                    <Grid item md={8}  > 
                      <Field 
                        id="title"
                        name="title" 
                        component={RenderTextField} 
                        label="ชื่อเรื่อง"
                      />
                      <Field 
                        id="articleSynopsis"
                        name="articleSynopsis" 
                        component={RenderTextAreaField} 
                        label="คำโปรย"
                        style={{height:'134px'}}
                      />
                    </Grid>
                    <Grid container spacing={32}  > 
                      <Grid item md={4}   > 
                        <Field 
                          id="authorName"
                          name="authorName" 
                          component={RenderTextField} 
                          label="นามปากกา"
                        />
                      </Grid>
                      <Grid item md={4}   > 
                        <Field 
                          id="category"
                          name="category" 
                          component={RenderDropdownField} 
                          label="หมวดหมู่"
                          option={categoryItems}
                        />
                      </Grid>
                      <Grid item md={4}   > 
                        <Field 
                          id="contentRating"
                          name="contentRating" 
                          component={RenderDropdownField} 
                          label="ระดับเนื้อหา"
                          option={contentRatingItems}

                        />
                      </Grid>
                    </Grid>

                  </Grid>
                 
                  <Grid container style={{marginTop:'30px'}} justify="center" >
                    <Grid item md={12} style={{textAlign:'center'}}  > 
                      <h3>คำนำเรื่อง</h3>
                    </Grid>
                    <Grid item md={12} style={{textAlign:'center'}}  > 
                      <Editor
                          editorState={editorState}
                          wrapperClassName="addWrite-wrapper"
                          editorClassName="addWrite-editor"
                          onEditorStateChange={this.onEditorStateChange}
                        />
                    </Grid>
                    <Grid item md={12}   > 
                      <FormGroup className="text-center">
                        <Button 
                          block  
                          color="info"
                          onClick={handleSubmit(this.onSubmit)}
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
                    {
                      model.title !== undefined &&
                      <Grid item md={12}   > 
                        <FormGroup className="text-center">
                          <Button 
                            
                            block  
                            onClick={()=>this.goTo(`/manage_writing/${model.id}`)}
                          >
                            เขียนเนื้อเรื่อง
                          </Button> 
                        </FormGroup>  
                      </Grid>

                    }
                    
                  </Grid>

                </Grid>
              </Grid>
            </Form>
					</Container>


          <Dialog
            open={succOpen}
            onClose={this.handleClose}
            onBackdropClick={this.handleClose}
            aria-labelledby="form-dialog-title"
            style={{visibility:"unset"}}
            fullWidth={true}
           

            >
            <DialogContent style={{textAlign:'center',paddingTop:'40px',paddingBottom:'40px'}} >
        
                
              <Zoom in={true}  style={{ transitionDelay: checked ? 200 : 0 }} >
                <FaCheckCircle size={70} color="green" />
              </Zoom>
              <Zoom in={true}  style={{ transitionDelay: checked ? 300 : 0 }} >
                <h4>บันทึกสำเร็จ</h4>
              </Zoom>
              <Zoom in={true}  style={{ transitionDelay: checked ? 700 : 0 }} >
                <div style={{marginTop:'40px'}}>
                  <Button style={{width:'160px'}} onClick={()=>this.goTo(`/edit_content/${model.id}`)}  color="success">เขียนเนื้อเรื่อง</Button>{'    '}
                  <Button style={{width:'160px'}} onClick={() => this.goTo('/my_writing') }  outline color="secondary">ไปงานเขียนของฉัน</Button>
                </div>
              </Zoom>
                
            
            </DialogContent>
          
          </Dialog>

				</div>
      </div>
      
		);
	}

}

const mapStateToProps = (state) =>{
  return {
    authInf:state.auth,
    history: state.RouteInfo.history,
    match:state.RouteInfo.match,
    model:state.WritingReducer.fictionByTitle,
    loading:state.WritingReducer.loading,
    initialValues:state.WritingReducer.initFormAdd
  }
}
//initialValues:state.WritingReducer.initFormAdd

ManageWriting = reduxForm({
  form: 'formAddWriting',
  enableReinitialize: true,
  validate
})(ManageWriting);

ManageWriting = connect(mapStateToProps,{ 
  loadFictionById,
  emtyFictionForm ,
  setInitFormAdd
})(ManageWriting);

export default ManageWriting;


// export default connect(mapStateToProps,{ loadFictionById,change })(
//   reduxForm({form:'formAddWriting',validate})(AddWritingForm)
// )


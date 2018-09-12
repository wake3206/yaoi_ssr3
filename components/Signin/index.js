import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { 
  Grid
} from '@material-ui/core'
import { 
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import { Field, reduxForm,SubmissionError } from 'redux-form'
import { RenderTextField } from '../utility/forms/RenderFields'
import { signIn } from '../../redux/actions/AuthAction'
import { ClipLoader } from 'react-spinners';
import Router from 'next/router'
//import { css } from 'react-emotion';

//import 'bootstrap/dist/css/bootstrap.min.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height:'500px'
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const validate = values => {
  //console.log('validate',values);
  const errors = {}
  if (!values.username) {
    errors.username = "username ไม่ถูกต้อง"
  }

  if (!values.password) {
    errors.password = "password ไม่ถูกต้อง"
  }
 

  return errors
}


class Signin extends Component {

  constructor(props){
    super(props)
    this.state = {
      bgRefBody:'',
      loading:false
    }
  }

  componentDidMount() {
    var orig = document.body.className;
    this.setState({bgRefBody:orig})
    //console.log(orig);  //Just in-case to check if your code is working or not
    document.body.className = orig + (orig ? ' ' : '') + 'cyan-bg'; //Here gray-by is the bg color which I have set
  }

  componentWillUnmount() {
      document.body.className = this.state.bgRefBody ;
  }

  msgError = (msg) => {
    
    let fName = '';
    if(msg === 'Incorrect username.'){
      fName = 'username'
    }else if(msg === 'Incorrect password.'){
      fName = 'password'
    }

    return fName
  }

  onSubmit = (value) =>{
    //console.log('onSubmit =>',value)
    this.setState({loading:true})

    const { signIn } = this.props

    return signIn(value).then((res)=>{
      //console.log('onSubmit fn->',res)
      this.setState({loading:false})
      if(res.status){
        //localStorage.setItem('token',res.token)
        Router.push('/')

      }else{
        console.log('1error ',res)
        const errorMsg = { [this.msgError(res.msg)]: res.msg, _error: res.msg}
        throw new SubmissionError(errorMsg)
      }


     
    }).catch((error)=>{
      console.log('2error ',error)
    
      this.setState({loading:false})
      const errorMsg = { [this.msgError(error.msg)]: error.msg, _error: error.msg}
      throw new SubmissionError(errorMsg)
    })



  }
  
  render() {

    //const { classes } = this.props;
    const { handleSubmit } = this.props
    const { loading } = this.state
    //console.log('history',history);
    let style = {}

    // const override = css`
    //       display: block;
    //       margin: 0 auto;
    //       border-color: red;
    //   `;

    return (
      <div>
        <Grid  style={{marginTop:'70px'}} container spacing={0} justify="center"  >
          <Grid item md={12}   style={{style}} >
            <div className="card" style={{width:'600px',marginLeft:'auto',marginRight:'auto'}}>
              <div className="text-center card-header">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <Form className="form" role="form" >
                  <Field 
                    id="username"
                    name="username" 
                    component={RenderTextField} 
                    label="Username"
                  />
                  <Field 
                    id="password"
                    name="password" 
                    component={RenderTextField} 
                    label="password"
                    type="password"
                  />
                  <FormGroup className="text-center">
                    <Button 
                      block  
                      onClick={handleSubmit(this.onSubmit)}
                      disabled={loading}
                    >
                      <ClipLoader
                      
                        sizeUnit={"px"}
                        size={25}
                        color={'#fff'}
                        loading={loading}
                      />
                      {!loading && 'Login'}
                    </Button> 
                  </FormGroup>   
                 
                </Form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.RouteInfo.history
  }
}

export default withStyles(styles)( 
  connect(mapStateToProps,{signIn})(
    reduxForm({form:'formSignin',validate})(Signin) 
  )
);
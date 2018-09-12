import React, { Component } from "react";
import Signin from '../components/Signin'
import { Container } from 'reactstrap';

class Login extends Component {

  render(){
    return (
    <Container>
      <Signin />
    </Container>
    )
  }
}

export default Login
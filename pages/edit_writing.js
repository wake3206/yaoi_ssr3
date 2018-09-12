import React, { Component } from "react";
import MainLayout from '../components/Layouts'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'
import ManageWriting from '../components/ManageWriting'
import { withRouter } from 'next/router'

class EditWriting extends Component {

  static async getInitialProps (ctx) {
    //console.log('getInitialProps url')
   
    return {}
  }

  render(){

    const { router:{query} } = this.props 

    return (
    <div>
      <MainLayout>
        <ManageWriting id={query.id} />
      </MainLayout>
    </div>
    )
  }
}

export default routeInfo(isAuth(withRouter(EditWriting)))
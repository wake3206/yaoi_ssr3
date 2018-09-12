import React, { Component } from "react";
import MainLayout from '../components/Layouts'
import Home from '../components/Home'
//import { requireAuth } from '../components/utility/AuthUtility'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'
//



class Index extends Component {

  static async getInitialProps (ctx) {
    //console.log('ctx',ctx)
    console.log('getInitialProps Index')

    //await requireAuth(ctx)

    return {}
  }

  render(){
    return (
    <div>
      <MainLayout>
        <Home />
      </MainLayout>
    </div>
    )
  }
}

export default routeInfo(isAuth(Index))
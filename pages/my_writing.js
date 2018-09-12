import React, { Component } from "react";
import MainLayout from '../components/Layouts'
//import { requireAuth } from '../components/utility/AuthUtility'
import { loadMyFiction,loadMyFictionAsyn } from '../redux/actions/WritingAction'
import MyWriting from '../components/MyWriting'
import cookies from 'next-cookies'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'

class MyWritingPage extends Component {

  static async getInitialProps (ctx) {
    console.log('getInitialProps MyWritingPage')
    //ctx.req.url
    //await requireAuth(ctx)
    //console.log('api_host',process.env)
    let objAuth = {}
    if(ctx.isServer){

      const { auth } = cookies(ctx);
      objAuth = JSON.parse(auth)
     
      await loadMyFiction(objAuth)(ctx.store.dispatch)
      
    }else{

      //console.log('state',ctx.store.getState())

      const { auth } = ctx.store.getState()
      loadMyFiction(auth)(ctx.store.dispatch)
    }
   
    return {}
  }

  render(){
    return (
    <div>
      <MainLayout>
        <MyWriting />
      </MainLayout>
    </div>
    )
  }
}

export default routeInfo(isAuth(MyWritingPage))
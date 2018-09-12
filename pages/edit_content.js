import React, { Component } from "react";
import MainLayout from '../components/Layouts'
import ManangeContent from '../components/ManangeContent'
import { withRouter } from 'next/router'
import cookies from 'next-cookies'
//import { loadArticleById } from '../redux/actions/WritingAction'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'

class EditWriting extends Component {

  static async getInitialProps (ctx) {
    console.log('getInitialProps url')
    //console.log('query',ctx.query)
    //const { id } = ctx.query
    const { auth } = cookies(ctx);
    const objAuth = JSON.parse(auth)

    //await loadArticleById(id,objAuth)(ctx.store.dispatch)
  
    return { objAuth }
  }

  render(){

    const { router:{query},objAuth } = this.props 


    //console.log('router query',query)

    return (
      <div>
        <MainLayout>
          <ManangeContent id={query.id} objAuth={objAuth} />
        </MainLayout>
      </div>
    )
  }
}

export default routeInfo(isAuth(withRouter(EditWriting)))

// (<ManangeContent id={query.id} />)
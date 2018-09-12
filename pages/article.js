import React, { Component } from "react";
import { withRouter } from 'next/router'
import MainLayout from '../components/Layouts'
import ViewArticle from '../components/ViewArticle'
import cookies from 'next-cookies'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'


class Article extends Component {

  static async getInitialProps (ctx) {
    console.log('getInitialProps url')
    const { auth } = cookies(ctx);
    const objAuth = JSON.parse(auth)

    //await loadArticleById(id,objAuth)(ctx.store.dispatch)
  
    return { objAuth }
  }

  render(){

    const { router:{query},objAuth } = this.props 
    return (
      <div>
        <MainLayout>
          <ViewArticle id={query.id} objAuth={objAuth} />
        </MainLayout>
      </div>
    )
  }
}

export default routeInfo(isAuth(withRouter(Article)))
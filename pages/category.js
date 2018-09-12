import React, { Component } from "react";
import MainLayout from '../components/Layouts'
import Category from '../components/Category'
//import { requireAuth } from '../components/utility/AuthUtility'
import { routeInfo  } from '../components/utility/HOC/routeHOC'
import { isAuth  } from '../components/utility/HOC/authHOC'
//



class CategoryPage extends Component {

  static async getInitialProps (ctx) {
    //console.log('ctx',ctx)
    //console.log('getInitialProps url')

    //await requireAuth(ctx)

    return {}
  }

  render(){
    return (
    <div>
      <MainLayout>
        <Category />
      </MainLayout>
    </div>
    )
  }
}

export default routeInfo(isAuth(CategoryPage))
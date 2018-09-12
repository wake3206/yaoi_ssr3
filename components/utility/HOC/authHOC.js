import { requireAuth } from '../../utility/AuthUtility'

export const isAuth = Page => {

  const PageAuth = props => <Page {...props} />

  PageAuth.getInitialProps = async context => {

    //console.log('HOC context',context)
    requireAuth(context)
  
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {})
    }
  }

  return PageAuth
}

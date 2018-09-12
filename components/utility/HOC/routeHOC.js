
import { setCurrentURL  } from '../../../redux/actions/RouteAction'

export const routeInfo = Page => {

  const PageAuth = props => <Page {...props} />

  PageAuth.getInitialProps = async context => {

    //console.log('HOC context',context)
    let pathName = (context.isServer) ? context.req.url:context.pathname;
    setCurrentURL(pathName)(context.store.dispatch)
  
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {})
    }
  }

  return PageAuth
}

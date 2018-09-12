import { addUer } from '../../redux/actions/AuthAction'
//import { getCookie } from '../../components/utility/cookie'
import cookies from 'next-cookies'
import Router from 'next/router';

const requireAuth =  async (ctx) => {

  if(ctx.isServer) {
    //console.log('is server',ctx.req.headers.cookie)
    if(ctx.req.headers.cookie) {
      const { auth } = cookies(ctx);
      if(auth === undefined){
        ctx.res.writeHead(301, {Location: '/login'})
        ctx.res.end()
      }else{
        ctx.store.dispatch(addUer(JSON.parse(auth)));
      }
     
    }
  } else {
    //console.log('all state',ctx.store.getState())
    const token = ctx.store.getState().auth.token;
 
    if(token === undefined){
      Router.replace('/login')
    }

  }

}

export {
  requireAuth
}
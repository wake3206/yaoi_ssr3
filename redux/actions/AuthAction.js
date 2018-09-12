//import { deflateSync } from "zlib";
import actionType from '../constants'
import { setCookie,removeCookie } from '../../components/utility/cookie'
import config from '../../config'
const URL = config.API;//'http://localhost:3003';


export const signUp = (datas) => {
  return (dispatch) => {

    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `username=${datas.username}&password=${datas.password}&email=${datas.email}`
    }

    return fetch(`${URL}/api/auth/signup`, config)
      .then((response) =>{
        //console.log('raw response',response)
        return response.json()
      })
      .then(({ user, response,error,status,msg }) =>  {

        console.log('user',user,'response',response,'error',error)
        if (!status) {

          return Promise.reject({ user, response,error,status,msg })

        } else {

          return Promise.resolve({ user, response,error,status,msg })

         }
      })
      .catch(err => {
        return Promise.reject(err)
      })



  }

  
}

export const signIn = (datas) => {
  return (dispatch) => {

    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `username=${datas.username}&password=${datas.password}&email=${datas.email}`
    }

    return fetch(`${URL}/api/auth/signin`, config)
      .then((response) =>{
        //console.log('raw response',response)
        return response.json()
      })
      .then( (res) =>  {

        if (!res.status) {

          return Promise.reject({...res})

        } else {

          let model = {isAuth:true,...res}

          //console.log('model',model)

          dispatch({
            type: actionType.LOGIN_ADD,
            payload: model
          })
          setCookie('auth', model);
          localStorage.setItem('auth', JSON.stringify(model))
          return Promise.resolve(model)

        }
      })
      .catch(err => {
        return Promise.reject(err)
      })



  }

  
}

export const logout = () =>{
  return (dispatch)=>{

    dispatch({
      type: actionType.LOGIN_CLEAR
    })
    removeCookie('auth');
    localStorage.removeItem('auth')

  }
}

export const addUer = (model) => {
  return (dispatch) => {

    //console.log('addUer',model)
    //let model = JSON.parse(localStorage.getItem('auth'))
    if( model ){
      model.user.token = model.token;
      dispatch({
        type: actionType.LOGIN_ADD,
        payload: model
      })
    }
    //console.log('addUer model',model)
   
  }
}



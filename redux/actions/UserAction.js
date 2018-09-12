//import { deflateSync } from "zlib";

const URL = 'http://localhost:3003';

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
        return response.json().then(user => ({ user, response }))
      })
      .then(({ user, response }) =>  {

        //console.log('user',user,'response',response)
        if (!response.ok) {
          return Promise.reject(user)
        } else {

          //console.log(user)
          // history.push('/secret');
          localStorage.setItem('auth', JSON.stringify({isAuth:true,token:'211',user}))
          return Promise.resolve(user)

          // If login was successful, set the token in local storage
          //localStorage.setItem('id_token', user.id_token)
          //localStorage.setItem('id_token', user.access_token)
          // Dispatch the success action
          //dispatch(receiveLogin(user))
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })



  }

  
}



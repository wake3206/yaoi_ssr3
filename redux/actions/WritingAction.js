import actionType from '../constants'
import 'isomorphic-unfetch'
import {  API } from '../../config'
//import { getCookie } from '../../components/utility/cookie'

export const loadMyFiction = (auth) => {
	//console.log('loadMyFiction')
	return async (dispatch) => {

		dispatch({ type: actionType.MYFICTION_LOADING,payload: true})
		if(auth !== null){

			try {

				const headerOpt = {
					method: 'POST',
					headers: { 
						'Content-Type':'application/x-www-form-urlencoded' ,
						'Authorization': `Bearer ${auth.token}`
					},
					body: `user_id=${auth.user.id}`
				}

				//const hostAPI = (process.env.api_host) ? process.env.url_api:API


				const json = await fetch(`${API}/api/writing/fetch_mywriting`,headerOpt )
				const res = await json.json()

				//console.log('res',res)
				
				dispatch({ 
					type: actionType.LOAD_MYFICTION,
					payload: res.values
				})
				
			} catch (error) {
				console.log('error',error)
			}

			dispatch({ type: actionType.MYFICTION_LOADING,payload: false})


		}

	}
}

export const  loadMyFictionAsyn = (auth) => {

	console.log('loadMyFictionAsyn')
  return (dispatch) => {

    dispatch({ type: actionType.MYFICTION_LOADING,payload: true})
		
		//let auth = JSON.parse(localStorage.getItem('auth')) || null
		//const auth = JSON.parse(getCookie('auth')) || null

		if(auth !== null){

			fetch(`${API}/api/writing/fetch_mywriting`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}`
			})
			.then( raw => raw.json() )
			.then((res) =>{

				console.log('res',res)
	
				if(!res.status){
					console.log('error',res.msg)
				}else{
					
					dispatch({ 
            type: actionType.LOAD_MYFICTION,
            payload: res.values
          })
					
				}
	
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
					 
			})
			.catch(err => {
				console.log('err',err)
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
			})
		}


   
  }
}

export const loadArticleById = (id,auth) => {
	return async (dispatch)=>{

		dispatch({ type: actionType.MYFICTION_LOADING,payload: true})

		try {

			const raw = await fetch(`${API}/api/writing/fetch_fiction_by_name`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}&id=${id}`
			})

			const res = await raw.json()

			//console.log('select Viewers',res)
			//console.log('res',res)
			dispatch({ 
				type: actionType.LOAD_MYFICTION_BY_TITLE,
				payload: res.values
			})

			
		} catch (error) {
			
		}

		dispatch({ type: actionType.MYFICTION_LOADING,payload: false})

	}
}

export const loadFictionByTitle = (id,auth) =>{
	return (dispatch) =>{

		dispatch({ type: actionType.MYFICTION_LOADING,payload: true})

		//let auth = JSON.parse(localStorage.getItem('auth')) || null

		if(auth !== null){

			fetch(`${API}/api/writing/fetch_fiction_by_name`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}&id=${id}`
			})
			.then( raw => raw.json() )
			.then((res) =>{
	
				if(!res.status){
					console.log('error',res.msg)
				}else{
					//console.log('fetch value',res.values)
					dispatch({ 
            type: actionType.LOAD_MYFICTION_BY_TITLE,
            payload: res.values
          })
					
				}
	
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
					 
			})
			.catch(err => {
				console.log('err',err)
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
			})
		}


	}
}

export const loadFictionById = (id,auth) =>{
	return (dispatch) =>{

		//console.log('call loadFictionById')

		dispatch({ type: actionType.MYFICTION_LOADING,payload: true})

		//let auth = JSON.parse(localStorage.getItem('auth')) || null

		if(auth !== null){

			fetch(`${API}/api/writing/fetch_fiction_by_id`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}&id=${id}`
			})
			.then( raw => raw.json() )
			.then((res) =>{
	
				if(!res.status){
					console.log('error',res.msg)
				}else{
					//console.log('fetch value',res.values)
					const model = (res.values) ? res.values:{}

					
					//console.log('fetch->model',model)
					dispatch({ 
            type: actionType.MYFICTION_INIT_FORM_ADD,
            payload:{
							raw:model,
							initial:{
								title : model.title,
								articleSynopsis: model.synopsis,
								authorName: model.author,
								category: model.category_id,
								contentRating: model.content_rating_id,
								preface: model.preface
							}
						} 
					})
					// dispatch({ 
          //   type: actionType.LOAD_MYFICTION_BY_TITLE,
          //   payload: res.values
          // })
					
				}
	
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
					 
			})
			.catch(err => {
				console.log('err',err)
				dispatch({ type: actionType.MYFICTION_LOADING,payload: false})
			})
		}


	}
}

export const emtyFictionForm = ()=>{
	return (dispatch)=>{

		dispatch({ 
			type: actionType.MYFICTION_INIT_FORM_ADD,
			payload:{
				raw:{},
				initial:{}
			} 
		})

	}
}

export const setInitFormAdd = (model) => {
	
	return (dispatch)=>{
		dispatch({ 
			type: actionType.MYFICTION_INIT_FORM_ADD,
			payload:{
				raw:model,
				initial:{
					title : model.title,
					articleSynopsis: model.synopsis,
					authorName: model.author,
					category: model.category_id,
					contentRating: model.content_rating_id,
					preface: model.preface
				}
			} 
		})
	}
}

export const setContentNow = (model) => {
	return (dispatch)=>{
		console.log('setContentNow',model)
		dispatch({ 
			type: actionType.LOAD_MYFICTION_BY_TITLE,
			payload: model
		})
	}
}

export const updateViewersAndReload = (fictionId,auth) => {

	return async (dispatch) => {

		const raw = await fetch(`${API}/api/writing/update_viewers`, {
			method: 'POST',
			headers: { 
				'Content-Type':'application/x-www-form-urlencoded' ,
				'Authorization': `Bearer ${auth.token}`
			},
			body: `fiction_id=${fictionId}`
		})

		const res = await raw.json()

		//console.log('updateViewers',res)
		if(res && res.status ){
			//dispatch({ type: actionType.UPDATE_AMT_VIEWERS,payload: res.values.amt_read})

			dispatch({ 
				type: actionType.LOAD_MYFICTION_BY_TITLE,
				payload: res.values
			})

		}
	


	}

}

export const fetchNewFeed = (auth) =>  {
	
	return async (dispatch) => {

		try {

			const raw = await fetch(`${API}/api/writing/fetch_new_article`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}`
			})

			const res = await raw.json()
			return res;
			
		} catch (error) {
			console.log('err',error)
		}


	}

}

export const fetchByCate = (cateId,auth) =>  {
	
	return async (dispatch) => {

		try {

			const raw = await fetch(`${API}/api/writing/fetch_by_cate`, {
				method: 'POST',
				headers: { 
					'Content-Type':'application/x-www-form-urlencoded' ,
					'Authorization': `Bearer ${auth.token}`
				},
				body: `user_id=${auth.user.id}&category_id=${cateId}`
			})

			const res = await raw.json()
			return res;
			
		} catch (error) {
			console.log('err',error)
		}

		
	}

}
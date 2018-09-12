import actionType from '../constants'
//import _ from 'lodash'

var init = {
  loading:false,
  myFictionItems:[],
  fictionByTitle:{},
  initFormAdd:{}
}

const WritingReducer =  (state = init, action) => {

  let newStage = Object.assign({},state)

  switch(action.type) {
    case actionType.LOAD_MYFICTION:
      //console.log('LOAD_MYFICTION',action.payload)
      newStage.myFictionItems = action.payload
      return newStage;

    case actionType.MYFICTION_LOADING:
      //console.log(' MYFICTION_LOADING',action.payload)
      newStage.loading = action.payload
      return newStage

    case actionType.LOAD_MYFICTION_BY_TITLE:
      //console.log('LOAD_MYFICTION_BY_TITLE',action.payload)
      newStage.fictionByTitle = action.payload
      return newStage
    
    case actionType.MYFICTION_INIT_FORM_ADD:
      
      newStage.fictionByTitle = action.payload.raw
      newStage.initFormAdd = action.payload.initial

      //console.log('newStage',newStage)
      return newStage

    case actionType.UPDATE_AMT_VIEWERS:

      if(newStage.fictionByTitle.amt_read !== undefined){
        console.log('UPDATE_AMT_VIEWERS',action.payload)
        newStage.fictionByTitle.amt_read = action.payload

        return {...newStage,amt_read:action.payload}

      }else{
        return newStage;
      }

      
    default:
      return state
  }
}

export default WritingReducer;
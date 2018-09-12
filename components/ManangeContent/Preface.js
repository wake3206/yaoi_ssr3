import React, { Component } from 'react';
import { 
  Grid
} from '@material-ui/core'
// import { convertFromRaw,EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import { stateToHTML } from 'draft-js-export-html';
// import { convertToHTML } from 'draft-convert'


class Preface extends Component {


	render() {
    //console.log('render Home')
    const { model } = this.props 
    //console.log(model.preface)
    //const toHtml = (model.preface === undefined)?'':draftToHtml(convertFromRaw( JSON.parse(model.preface) ))
    // const toHtml = (model.preface === undefined)?'':stateToHTML(convertFromRaw( JSON.parse(model.preface)))
    // console.log(toHtml)
    let toHtml = '';

    if(model.preface !== undefined){
      // let render = EditorState.createWithContent(
      //   convertFromRaw(JSON.parse(model.preface))
      // )

      // console.log('->',render.getCurrentContent())

      toHtml = draftToHtml(JSON.parse(model.preface))

    }

    //console.log(toHtml)

		return (

      <Grid container style={{marginTop:'30px'}} >
        <Grid item md={12} style={{textAlign:'center'}}>
          <h3>คำนำเรื่อง</h3>
        </Grid>
        <Grid item md={12} style={{paddingTop:'10px'}}>
          <div dangerouslySetInnerHTML={{__html: toHtml}}></div>
        </Grid>
      </Grid>
      
		);
	}

}

export default Preface
import React, { Component } from 'react';
import { 
  Grid
} from '@material-ui/core'
import draftToHtml from 'draftjs-to-html';


class Content extends Component {


	render() {
    //console.log('render Home')
    let toHtml = '';

    const { model } = this.props 

    //console.log(model)

    if(model.fiction_contents !== undefined && model.fiction_contents.length > 0){
      // let render = EditorState.createWithContent(
      //   convertFromRaw(JSON.parse(model.preface))
      // )

      // console.log('->',render.getCurrentContent())

      toHtml = draftToHtml(JSON.parse(model.fiction_contents[0].content))

    }


		return (

      <Grid container spacing={0} style={{marginTop:'25px'}}   >
        <Grid item md={12} style={{textAlign:'center'}}>
           <h3>เนื้อเรื่อง</h3>
        </Grid>
        <Grid item md={12} > 
          <div dangerouslySetInnerHTML={{__html: toHtml}}></div>
        </Grid>
      </Grid>
			
      
		);
	}

}

export default Content
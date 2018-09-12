import React, { Component } from 'react';
import { 
  Grid
} from '@material-ui/core'

import SlidePreview from "./SlidePreview";
import CategoriesPresentLists from "./CategoriesPresentLists";


class Home extends Component {


	render() {
		console.log('render Home1')
		return (

			<div>
				<Grid container spacing={0} alignItems="center" >
					<Grid item md={12} style={{textAlign:'center'}} > 
						<SlidePreview />
					</Grid>
					<Grid item md={12} style={{textAlign:'center'}} > 
						<CategoriesPresentLists />
					</Grid>
				</Grid>
			</div>
     
      
		);
	}

}

export default Home
import React, { Component } from 'react';
import  HeaderMain from "./Header";
import { 
  Grid
} from '@material-ui/core'

class MainLayout extends Component {


	render() {
		//console.log('render Home')
		const { children } = this.props
		return (

      <div>
				<HeaderMain />
				<div>
					{ children }
				</div>
      </div>
      
		);
	}

}

export default MainLayout
import React, { Component } from 'react';

export default class LogoLite extends Component {


	render() {

    let sty1 = {fontSize:'32px',color:'#fff'};


		return (

     <div style={{position:'relative',width:'90px',textAlign:'left',marginLeft:'8px'}}>
      <div style={sty1}>YAOI</div>
      <div style={{
        fontSize:'12.5px',
        color:'rgb(247, 233, 158)',
        position:'absolute',
        top:'35px',
        left:'4px'
      }}>by Snufflehp</div>
     </div>
		);
	}

}
import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
//import * as icons from 'react-icons/lib/md';
//<Glyphicon glyph="align-left" />
export default class SearchHeader extends Component {


	render() {

		return (

      <div className="SearchInput" style={{}} >
        <input className="align-middle"  style={{background:'#e2e2e2'}} type="text" id="" placeholder="ค้นหานิยาย" />
        <button className="btnSearch align-middle" style={{color:"#ffc96b"}}>
          <FaSearch style={{fontSize:"20px"}} />
        </button>
      </div>
      
		);
	}

}
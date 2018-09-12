import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink 
} from 'reactstrap';
import { connect } from 'react-redux'
import Router from 'next/router'

const menuLists = [
  {name:'หนัาหลัก',link:'/'},
  {name:'เรื่องฮิต',link:'/hit'},
  {name:'หมวดหมู่',link:'/category'},
  {name:'ที่เก็บหนังสือ',link:'/my_library'},
  {name:'งานเขียนของฉัน',link:'/my_writing'}
]


class MenuHeader extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick = (e,obj) => {
    console.log('handleClick',obj);
    // this.setState({
    //   sel:obj.item.link
    // })
    //const { RouteInfo } = this.props;
    //console.log('RouteInfo',RouteInfo )
    //RouteInfo.history.push(obj.link)

    Router.push(obj.link)

  }

	render() {

    //const sel = '/home'
    const { RouteInfo } = this.props;
    //console.log('RouteInfo',RouteInfo)
    //const urlMatch = RouteInfo.match

    const lists = menuLists.map((i,k)=>{

     // console.log('k',k)
      const active = (i.link === RouteInfo.currentUrl) ? true:false;
      return (
        <NavItem key={k}>
          <NavLink 
            key={k}
            active={active} 
            model={i}
            onClick={ (e) => this.handleClick( e, i)  } 
            href="#"
          >
          {i.name}
         </NavLink>
        </NavItem>
      )
    })

		return (

      <div>
        <Navbar className="mainMenu" style={{
            marginLeft:'0px',
            paddingTop:'10px',
            paddingBottom:'0px',
            paddingLeft:'0px'
          }} dark expand="md">
        
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav  className="" navbar>
              { lists }
            </Nav>
          </Collapse>
        </Navbar>
      </div>

		);
	}

}

const mapStateToProps = (state) => {
  return {
    RouteInfo: state.RouteInfo
  }
}


export default connect(mapStateToProps,{})(MenuHeader);


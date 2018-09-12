import React from 'react';
import { connect } from 'react-redux'
import { addRoute } from '../../../redux/actions/RouteAction';

const RouteInfoHoc = WrappedComponent => {
   class RouteWrap extends React.Component {

    constructor(props){
      super(props)
      let {history, location, match} = props;
      props.addRoute({history, location, match});
    }
  
    render() {
      //console.log('hoc pros',this.props)
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(()=>({}), { addRoute })(RouteWrap)
}

export default RouteInfoHoc;
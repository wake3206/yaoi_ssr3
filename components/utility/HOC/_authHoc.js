import React from 'react';


const requireAuth = () =>{
  return (WrappedComponent) =>{

    return class authWrap extends React.Component {

      // constructor(props){
      //   super(props)
      //   let {history, location, match} = props;
      //   props.addRoute({history, location, match});
      // }
      componentWillMount(){
        //console.log('componentWillMount')
        this.isLogin()

      }
      componentWillUpdate(){
        //console.log('componentWillUpdate')
        this.isLogin()
      }


      isLogin(){

        const auth = JSON.parse(localStorage.getItem('auth'))
        if( !(auth && auth.isAuth) ){

          let { history } = this.props;
          //console.log('isLogin auth',auth)
          history.push('/login')

        }
      }
    
      render() {
        //console.log('requireAuth',this.props)
        
        return <WrappedComponent {...this.props} />
      }
    }

  }
}

export { requireAuth }

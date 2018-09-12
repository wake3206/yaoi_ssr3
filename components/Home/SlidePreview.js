import React, { Component } from 'react';
import Slider from "react-slick";
// import slick from "slick-carousel/slick/slick.css";
// import siickTheme from "slick-carousel/slick/slick-theme.css";


class SlidePreview extends Component {

  constructor(props){
    super(props)
    this.state = {
      items:[]
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({items:[2,3,4,5,2,3,4]})
    }, 0);
  }

  render() {

    const { items } = this.state

    const lists = items.map((i,k)=>{
      return (
        <div key={k}>
          <img src={`/static/temp_imgs/banner_${i}.png`} style={{height:"300px"}} alt=""  />
        </div>
      )
    })


    const settings = {
      dots: true,
      infinite: true,
      lazyLoad: true,
      //speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 5000,
      //cssEase: "linear",
      //lazyLoad: true,
      variableWidth: true,
      adaptiveHeight: true,
      appendDots: dots => (
        <div
          style={{
            bottom: "-5px"
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),
    };


    return (
      <div style={{height:'300px'}}>
         
        <Slider {...settings} >
          { lists } 
        </Slider>

         
      </div>
      
    )
  }

}

export default SlidePreview
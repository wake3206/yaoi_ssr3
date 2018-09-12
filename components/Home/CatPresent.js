import React, { Component } from 'react';
import { 
	Grid
} from '@material-ui/core'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';



class CatPresent extends Component {


	render() {
		//console.log('render Home')
		return (

      <Grid item md={3} style={{textAlign:'left'}}  > 
        
        <Card className="card__zoom">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        
      </Grid>
 
		);
	}

}

export default CatPresent
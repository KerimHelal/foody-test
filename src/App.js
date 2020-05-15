import React from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      userAvailableDishes: 3,
      dishes: [],
      scheduledDishes: []
    };
  }

  componentDidMount() {
    console.log(moment().utcOffset('-0500').hours() < 7);

    fetch('https://testapi.io/api/sajhu/dishes')
        .then( res => res.json())
        .then((data)=> {
            this.setState({
                dishes: data
            });
        })
  }  

  addDish = (dishId) => {
    if (moment().utcOffset('-0500') < moment().utcOffset('-0500').startOf('day').hour('19').minute('15')) {
      if(this.state.scheduledDishes.length < 3) {
        let scheduledDishes = this.state.scheduledDishes;
        scheduledDishes.push(dishId);
        this.setState(scheduledDishes);
        alert('Dish scheduled successfuly');
      } else {
        alert('You cant schedule more than 3 dishes.')
      }
    } else {
      alert('You cant schedule after 7:15')
    }
  }

  removeDish = (dishId) => {
    let scheduledDishes = this.state.scheduledDishes;
    if( scheduledDishes.filter(dish => dishId === dish)) {
      const index = scheduledDishes.indexOf(dishId);
      if (index > -1) {
      scheduledDishes.splice(index, 1);
      this.setState(scheduledDishes);
    }
  }
}

  getAmountOfDishes = (dishId) => {
    const scheduledDishes = this.state.scheduledDishes;
    return scheduledDishes.filter(id => id === dishId).length;
  }


  render() {
    return (
      <Grid container>
        {this.state.dishes.map(dish => (
        <Grid item xs={12} sm={3} key={dish._id}>
            <Card style={{maxWidth: 300}}>
              <CardMedia
                image={dish.photoUrl}
                title={dish.name}
                style={{height: 140}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {dish.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dish.shortDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => this.removeDish(dish._id)}>
                  <Remove />
                </Button>
                <span>{this.getAmountOfDishes(dish._id)}</span>
                <Button size="small" color="primary" onClick={() => this.addDish(dish._id)}>
                  <Add />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default App;

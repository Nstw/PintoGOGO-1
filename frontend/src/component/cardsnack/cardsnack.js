import React, { Component} from 'react';
import '../cardsnack/cardsnack.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SnackDetail from "../snackdetail/snackdetail";

class cardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    };
  }

  addToCartClick(e) {
    console.log("Click!!!!");
    this.setState({
      clicked: this.state.clicked + 1
    });
    axios.put('/api/orders/add/snack', {
        snack_id: this.props.id,
        snack_name: this.props.name,
        price: this.props.price
    })
    e.preventDefault();
  }

  deleteFromDb() {
    axios
      .delete("/api/menus/snack/del/" + this.props.id)
      .then(res => console.log(res));
  }

    deleteFromDb(){
        axios.delete('/api/menus/snack/del/'+ this.props.id)
        .then(res => console.log(res))
        .then(() => {
            this.props.onMenuCardDeleted(this.props.id);
          });
    }

    sendToMenuDetail(){
    
        return <div>
          <Route path="/snackdetail/:snackId" component={SnackDetail} />
        </div>
    }
    
    render() { 
    const { isAuthenticated, user} = this.props.auth;
    const admin = (
        <React.Fragment>
            <div className="delete--snack__button" onClick={this.deleteFromDb.bind(this)}>
                    <img src={"/img/other/delete.png"} height="20" />
                </div>
        </React.Fragment>
    )
    return (
        
        <section className="snack">
            <div className="cardsnack__block">
                <Link to={'/snackdetail/'+this.props.id}>
                    <img src={this.props.picture} width="200px" className="cardsnack__image"/>
                </Link>
            </div>
            <div className="textundersnack">
                    <p>{this.props.name}<br/>
                    {this.props.calories} Kcal</p>
            </div>
            <div>
                <div className="cart--snack__button" onClick={this.addToCartClick.bind(this)}>
                    <img src={"/img/other/cart.png"} height="20" />
                </div>
                {user.type ? admin : ""}
            </div>
        </section>
                
            
        );
    }
}
cardMenu.propTypes = {
    auth: propTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  })
  

export default connect(mapStateToProps)(cardMenu);

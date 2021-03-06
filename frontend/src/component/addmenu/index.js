import React, { Component} from 'react';
import axios from 'axios'
import {Button, FormGroup, Input } from "reactstrap";
import './style-addmenu.css'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

class Addmenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu_name : "",
            price : "",
            calories : "",
            protein : "",
            carbohydrate : "",
            fat : "",
            img : null,
            description : "",
            sodium : "",
            cholesterol : "",
            status: 0,
            file: "",
            imagePreviewUrl: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    // cannot redirect I don't know why
    renderRedirect(){
        return  <Redirect to = {{
            pathname : "/add/menu"
        }}/>
    }

    componentDidMount() {
        if(!this.props.auth.user.type) {
            return  this.props.history.push('/');
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleChangeImage(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        this.setState({
            img : e.target.files[0]
        },() => {
            console.log(this.state.img)
        })

        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
      
        reader.readAsDataURL(file)
    }
    
    handleSubmit(e) {
       const formData = new FormData()
       formData.append('img',this.state.img, this.state.img.name)
       formData.append('menu_name',this.state.menu_name)
       formData.append('calories',this.state.calories)
       formData.append('price',this.state.price)
       formData.append('protein',this.state.protein)
       formData.append('carbohydrate',this.state.carbohydrate)
       formData.append('fat',this.state.fat)
       formData.append('cholesterol',this.state.cholesterol)
       formData.append('sodium',this.state.sodium)
       formData.append('description',this.state.description)
       
        const menudetail = {
            menu_name : this.state.menu_name,
            price : this.state.price,
            calories : this.state.calories,
            protein : this.state.protein,
            carbohydrate : this.state.carbohydrate,
            fat : this.state.fat,
            description : this.state.description,
            sodium : this.state.sodium,
            cholesterol : this.state.cholesterol,
            img : this.state.img
        }
        axios.post('/api/menus/food/add', formData)
        .then(res => {
            this.setState({status : res.data})
        })
        .then(() => {
            console.log('redirect');
            this.renderRedirect()
        })
        e.preventDefault()
    }    
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="imgpreview"/>);
        }
        const { status } = this.state;
        return <React.Fragment>
            <div className="setbg__addmenu">
              <div className="form-group" className="addmenu__box">
                <h3>Status : {status}</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input className="form-control" type="text" name="menu_name" placeholder="menuname" 
                        value={this.state.menu_name} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" type="textarea" name="description" placeholder="description" 
                        value={this.state.description} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="price" placeholder="price" 
                        value={this.state.price} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="calories" placeholder="carlories" 
                        value={this.state.calories} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="protein" placeholder="protein" 
                        value={this.state.protein} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="carbohydrate" placeholder="carbohydrate" 
                        value={this.state.carbohydrate} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="fat" placeholder="fat" 
                        value={this.state.fat} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="sodium" placeholder="sodium" 
                        value={this.state.sodium} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="cholesterol" placeholder="cholesterol" 
                        value={this.state.cholesterol} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="file" name="img"  
                        accept="image/jpg" onChange={this.handleChangeImage} required />
                        
                    </div>
                    {$imagePreview}
                    <button type="submit" value="submit" className="submit__addmenu--button">
                        SUBMIT
                    </button>
                    </form>
                </div>
            </div>
          </React.Fragment>;
    }
    
}
Addmenu.propTypes = {
    auth : propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps)(withRouter(Addmenu));
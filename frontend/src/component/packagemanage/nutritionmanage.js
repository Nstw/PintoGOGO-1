import React, {Component} from 'react';
import './nutritionmanage.css';

export default class NutritionManage extends Component {
	constructor(props) {
	super(props);

    this.state = {
      		packages: {},
			daymeal: this.props.menu_detail.slice()
		}
		this.compute = this.compute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
	this.setState({
		daymeal: nextProps.menu_detail.slice()
	  }, () => {
		console.log("this from nutrition22", this.state.daymeal)
	  })
  }
  
	
	compute(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < daymeal.length; i++) {
			 sum = sum + daymeal[i][0][x] + daymeal[i][1][x]
		}
		sum = sum/daymeal.length
		return sum;
	}

	sumprice(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < daymeal.length; i++) {
			 sum = sum + daymeal[i][0][x] + daymeal[i][1][x]
		}
		return sum;
	}

	render() {
		return (
			<React.Fragment>
				{console.log("this is from render", this.compute("calories"))}
			<div className='nutritionmanage-box'>
			price: {Math.round(this.sumprice("price")*0.95)} BAHT ( ลดจาก {this.sumprice("price")})
			<br/>
			<br/>
				<p className='nutrition-text'>สารอาหารเฉลี่ยต่อวัน</p>
				<div className='row'>
					<div className='col-sm-7'>
						CALORIES
					</div>
					<div className=' col-sm set-align'>
						{Math.round(this.compute("calories"),2)} kCAL/day
					</div>
				</div>
				<hr></hr>
				<div className='row'>
					<div className='col-sm-7'>
						<p>FAT</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("fat"),2)} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>CHOLESTEROL</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("cholesterol"),2)} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>SODIUM</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("sodium"))} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>CARBOHYDRATE</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("carbohydrate"))} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>PROTEIN</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("protein"))} g/day</p>
					</div>
				</div>
		</div>
		{console.log("this is from render2222")}
			</React.Fragment>
		);
	}
}


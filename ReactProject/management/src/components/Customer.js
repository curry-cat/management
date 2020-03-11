import React from 'react';

class Customer extends React.Component {
    render(){
        return(
            <div>
                <CustomerProfile id={this.props.id} img={this.props.img} name={this.props.name}/>
                <CustomerInfo birth={this.props.birth} gender={this.props.gender} job={this.props.job}/>
            </div>
        )
    }
}

class CustomerProfile extends React.Component {
    render(){
        return(
            <div>
                <img src={this.props.img} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render(){
        return(
            <div>
                <span>{this.props.birth}</span>
                <span>{this.props.gender}</span>
                <span>{this.props.job}</span>
            </div>
        )
    }
}

export default Customer;
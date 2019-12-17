import React, {Component} from 'react';

const axios = require('axios').default;

export default class Login extends Component {
    API_URL = process.env.API_URL;

    constructor(props) {
        super(props);

        this.onChangeUpdateFromInputField = this.onChangeUpdateFromInputField.bind(this);
        this.displayWarningMessage = this.displayWarningMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            msg: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios.post(this.API_URL + '/register', {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        })
            .then((res) => {
                if (res.data.msg) {
                    this.setState({msg: res.data.msg})
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onChangeUpdateFromInputField(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        });
    }

    displayWarningMessage() {
        if (this.state.msg.length > 0) {
            return <span className="alert alert-danger">{this.state.msg}</span>;
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Register</h1>
                {this.displayWarningMessage()}
                <input className="input-field" name="firstName" onChange={this.onChangeUpdateFromInputField} required
                       placeholder="First name"/>
                <input className="input-field" name="lastName" onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Last name"/>
                <input className="input-field" name="username" onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Username"/>
                <input className="input-field" name="password" type="password"
                       onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Password"/>
                <input className="input-field" name="repeatPassword" type="password"
                       onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Confirm password"/>
                <input className="button" type="submit" value="REGISTER"/>
            </form>
        )
    }
};
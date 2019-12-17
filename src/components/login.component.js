import React, {Component} from 'react';
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            msg: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post(process.env.REACT_APP_TEST+'/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                    this.setState(
                        {msg: res.data.msg}
                    )

                    if (res.data.authorized) {
                        localStorage.setItem('username', res.data.user.username);
                        localStorage.setItem('userId', res.data.user.userId);
                        this.props.history.push('/products');
                    }
                }
            )
            .catch((err) => {
                console.log(err);
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
                <h1>Login</h1>
                {this.displayWarningMessage()}
                <input className="input-field" onChange={this.onChangeUsername} required placeholder="Username"/>
                <input className="input-field" type="password" onChange={this.onChangePassword} required
                       placeholder="Password"/>
                <input className="button" type="submit" value="LOGIN"/>
            </form>
        )
    }
};
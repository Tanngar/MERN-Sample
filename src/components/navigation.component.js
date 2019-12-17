import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Auth from "./auth.component";

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: ''
        };

        this.Auth = new Auth();

        this.displayMyReviews = this.displayMyReviews.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.displayLogout = this.displayLogout.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
        this.logOut = this.logOut.bind(this);
    }


    displayLogin() {
        if(!this.Auth.isLoggedIn()) {
            return <li><Link to="/login">Login</Link></li>
        }
    }

    displayRegister() {
        if(!this.Auth.isLoggedIn()) {
            return <li><Link to="/register">Register</Link></li>
        }
    }

    displayLogout() {
        if(this.Auth.isLoggedIn()) {
            return <li><span onClick={this.logOut()}>Logout</span></li>
        }
    }

    displayMyReviews() {
        if(this.Auth.isLoggedIn()) {
            return <li><Link to="/reviews/my-reviews">My Reviews</Link></li>
        }
    }

    logOut() {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.setState({ refresh: Math.random() })
    }

    render() {
        return(
            <div className="navigation">
                <ul>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/reviews/my-reviews">My reviews</Link></li>
                    { this.displayMyReviews() }
                    { this.displayLogin() }
                    { this.displayRegister() }
                    { this.displayLogout() }
                </ul>
            </div>
        )
    }
};
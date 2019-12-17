import React, {Component} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Review from './review.component';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            reviews: [],
            productId: window.location.href.split("/").pop()
        };
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_UR + this.state.productId)
            .then(res => this.setState({product: res.data}))
            .catch((error) => {
                console.log(error);
            })

        axios.get(process.env.REACT_APP_API_UR + this.state.productId)
            .then(res => this.setState({reviews: res.data}))
            .catch((error) => {
                console.log(error);
            })
    }

    reviewsList() {
        if (this.state.reviews.length > 0) {
            return this.state.reviews.map(review => {
                return <Review key={review._id} review={review} productId={this.state.product._id}></Review>
            })
        } else {
            return <span className="alert alert-notification">Sorry, there are no reviews yet.</span>
        }

    }

    render() {
        return (
            <section className="product-article">
                <div className="product-information">
                    <h1>{this.state.product.title}</h1>
                    <h2> {this.state.product.category}</h2>
                    <p>{this.state.product.description}</p>
                </div>
                <div className="product-reviews">
                    <h1>Reviews({this.state.reviews.length}): </h1>
                    <Link to={this.state.productId + "/add-review"} productId = {this.state.product._id}>
                        <button className="button">ADD REVIEW</button>
                    </Link>
                    {this.reviewsList()}
                </div>
            </section>
        )
    }
};
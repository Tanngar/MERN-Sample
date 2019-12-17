import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ProductRow from './productRow.component';

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            reviews: [],
            reviewsCount: ''
        };
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_TEST+'/reviews/')
            .then(res => this.setState({reviews: res.data}))
            .catch((error) => {
                console.log(error);
            });

        axios.get(process.env.REACT_APP_TEST+'/products/')
            .then(res => this.setState({products: res.data}))
            .catch((error) => {
                console.log(error);
            });
    }

    productsList() {
        return this.state.products.map(product => {
            let reviewsCount;

            reviewsCount =  this.state.reviews.filter((review) => {
                return review.productId === product._id
            }).length;

            return <ProductRow key={product._id} product={product} reviewsCount={reviewsCount}></ProductRow>
        })
    }

    render() {
        return (
            <table className="products-table">
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Reviews</th>
                </tr>
                {this.productsList()}
                </tbody>
            </table>
        )
    }
};
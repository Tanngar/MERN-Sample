import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: props.product,
            reviewsCount: props.reviewsCount
        }

    }

    render() {
        return(
            <tr>
                <td><Link to={'products/' + this.state.product._id}>{this.state.product.title}</Link></td>
                <td><Link to={'products/' + this.state.product._id}>{this.state.product.category}</Link></td>
                <td><Link to={'products/' + this.state.product._id}>{this.state.reviewsCount}</Link></td>
            </tr>
        )
    }
};
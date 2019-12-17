import React, {Component} from 'react';
import ProductRow from "./productRow.component";
import Auth from "./auth.component";
import {Link} from "react-router-dom";

const axios = require('axios').default;

export default class MyReviewsComponent extends Component {

    constructor(props) {
        super(props);
        //
        this.onChangeUpdateFromInputField = this.onChangeUpdateFromInputField.bind(this);
        this.reviewsList = this.reviewsList.bind(this);

        this.Auth = new Auth();

        this.state = {
            reviews: [],
            products: []
        }
    }

    componentDidMount() {
        if (!this.Auth.isLoggedIn()) {
            this.props.history.replace("/login")
        } else {
            axios.get(process.env.REACT_APP_API_UR)
                .then(res => {
                    this.setState({products: res.data})
                })
                .catch((error) => {
                    console.log(error);
                });

            axios.get(process.env.REACT_APP_API_UR + localStorage.getItem('userId'))
                .then(res => {
                    this.setState({reviews: res.data})
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onChangeUpdateFromInputField(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    reviewsList() {
        return this.state.reviews.map(review => {
            let product = this.state.products.find((product) => {
                return product._id === review.productId
                }
            );

            return (<tr key={review._id}>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{review.heading}<br/>{review.body}</td>
                <td>
                    <span><Link to={"/reviews/edit-review/" + review._id}>EDIT</Link></span>
                    <span><Link to={"/reviews/delete-review/" + review._id}>DELETE</Link></span>
                </td>
            </tr>)
        })
    }

    render() {
        return (
            <table className="products-table">
                <tbody>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Review</th>
                    <th></th>
                </tr>
                {this.reviewsList()}
                </tbody>
            </table>
        )
    }
};
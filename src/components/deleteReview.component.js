import React, {Component} from 'react';
import Auth from './auth.component';
const axios = require('axios').default;

export default class DeleteReview extends Component {

    constructor(props) {
        super(props);
        //
        this.onChangeUpdateFromInputField = this.onChangeUpdateFromInputField.bind(this);

        this.Auth = new Auth();

        this.state = {
            reviewId: window.location.href.split("/").pop(),
            productId: window.location.href.split("/").slice(-3)[0],
            msg: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios.delete(process.env.API_URL + this.state.productId + '/delete-review/' + this.state.reviewId)
            .then((res) => {
                if (res.data.msg) {
                    this.setState({msg: res.data.msg})
                }
                console.log(res);
                this.props.history.push('/products/' + this.state.productId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        if (!this.Auth.isLoggedIn()) {
            this.props.history.replace("/login")
        }
    }

    onChangeUpdateFromInputField(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Delete review</h1>
                <p>Are you sure you want to delete this review?</p>

                <input className="button" type="submit" value="DELETE"/>
            </form>
        )
    }
};
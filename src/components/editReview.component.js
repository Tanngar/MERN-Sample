import React, {Component} from 'react';
import Auth from "./auth.component";

const axios = require('axios').default;

export default class AddReview extends Component {

    constructor(props) {
        super(props);
        //
        this.onChangeUpdateFromInputField = this.onChangeUpdateFromInputField.bind(this);
        this.displayWarningMessage = this.displayWarningMessage.bind(this);

        this.Auth = new Auth();

        this.state = {
            heading: '',
            body: '',
            author: '',
            authorId: '',
            productId: window.location.href.split("/").slice(-2)[0],
            reviewId: window.location.href.split("/").pop(),
            dateCreated: new Date(),
            msg: ''
        }
    }

    componentDidMount() {
        if (!this.Auth.isLoggedIn()) {
            this.props.history.replace("/login")
        } else {
            this.setState({
                author: localStorage.getItem('username'),
                authorId: localStorage.getItem('userId')
            })
        }

        axios.get(process.env.API_URL + this.state.reviewId)
            .then(res => {
                this.setState({
                    heading: res.data.heading,
                    body: res.data.body,
                    author: res.data.author,
                    authorId: res.data.authorId,
                    productId: res.data.productId,
                    dateCreated: res.data.dateCreated
                })
            })
            .catch((error) => {
                console.log(error);
            })

        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios.put(process.env.API_URL + this.state.productId + '/edit-review/' + this.state.reviewId, {
            heading: this.state.heading,
            body: this.state.body,
            author: this.state.author,
            authorId: this.state.authorId,
            productId: this.state.productId,
            dateCreated: this.state.dateCreated
        })
            .then((res) => {
                if (res.data.msg) {
                    this.setState({msg: res.data.msg})
                }

                this.props.history.push('/products/' + this.state.productId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onChangeUpdateFromInputField(e) {
        this.setState({
            [e.target.name]: e.target.value
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
                <h1>Edit review</h1>
                {this.displayWarningMessage()}

                <input className="input-field" name="heading" defaultValue={this.state.heading}
                       onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Heading"/>
                <textarea className="input-field" rows="30" type="textbox" defaultValue={this.state.body} name="body"
                          onChange={this.onChangeUpdateFromInputField} required
                          placeholder="Review"/>
                <input className="button" type="submit" value="SAVE CHANGES"/>
            </form>
        )
    }
};
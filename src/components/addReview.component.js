import React, {Component} from 'react';
import Auth from './auth.component';
const axios = require('axios').default;


export default class AddReview extends Component {

    constructor(props) {
        super(props);
        //
        this.onChangeUpdateFromInputField = this.onChangeUpdateFromInputField.bind(this);

        this.Auth = new Auth();

        this.state = {
            heading: '',
            body: '',
            author: '',
            authorId: '',
            productId: window.location.href.split("/").slice(-2)[0],
            dateCreated: new Date()
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_TEST + this.state.productId + '/add-review', {
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
        } else {
            this.setState({
                author: localStorage.getItem('username'),
                authorId: localStorage.getItem('userId')
            })
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
                <h1>Add review</h1>
                {/*{this.displayWarningMessage()}*/}

                <input className="input-field" name="heading" onChange={this.onChangeUpdateFromInputField} required
                       placeholder="Heading"/>
                <textarea className="input-field" rows="30" type="textbox" name="body"
                          onChange={this.onChangeUpdateFromInputField} required
                          placeholder="Review"/>
                <input className="button" type="submit" value="ADD REVIEW"/>
            </form>
        )
    }
};
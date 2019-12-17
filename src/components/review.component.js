import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewId: props.review._id,
            heading: props.review.heading,
            body: props.review.body,
            author: props.review.author,
            authorId: props.review.authorId,
            dateCreated: props.review.dateCreated,
            productId: props.productId
        };

        this.renderActionPanel = this.renderActionPanel.bind(this);

    }

    renderActionPanel() {
        if(this.state.authorId === localStorage.getItem('userId')) {
            return <div className={'action-panel'}>
                <span><Link to={this.state.productId + "/edit-review/" + this.state.reviewId }>EDIT</Link></span>
                <span><Link to={this.state.productId + "/delete-review/" + this.state.reviewId }>DELETE</Link></span>
            </div>
        }
    }


    render() {
        return (
            <div className="review">
                <h2>{this.state.heading}</h2>
                <p>{this.state.body}</p>
                <span className="author bold-text">{this.state.author}</span>
                <span className="date">{this.state.dateCreated.substring(0,10)}</span>
                { this.renderActionPanel() }
            </div>
        )
    }
};
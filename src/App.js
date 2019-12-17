import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Login from './components/login.component';
import Register from './components/register.component';
import Products from './components/products.component';
import Product from './components/product.component';
import Header from './components/header.component';
import Footer from './components/footer.component';
import AddReview from './components/addReview.component';
import EditReview from './components/editReview.component';
import DeleteReview from './components/deleteReview.component';
import MyReviewsComponent from './components/myReviews.component';

function App() {
  return (
    <Router>
      <Header/>
        <main>
            <Route exact path='/' component={Products} />
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/reviews/my-reviews" exact component={MyReviewsComponent}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/products/:id" exact component={Product}></Route>
            <Route path="/products/:id/add-review" exact component={AddReview}></Route>
            <Route path="/products/:productId/edit-review/:reviewId" exact component={EditReview}></Route>
            <Route path="/products/:productId/delete-review/:reviewId" exact component={DeleteReview}></Route>
            <Route path="/reviews/delete-review/:id" exact component={DeleteReview}></Route>
            <Route path="/reviews/edit-review/:id" exact component={EditReview}></Route>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;

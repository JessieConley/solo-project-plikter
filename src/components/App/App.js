import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import RegisterPage from "../RegisterPage/RegisterPage";
import AddChildForm from "../AddChildForm/AddChildForm";
import AddChildConfirmation from "../AddChildConfirmation/AddChildConfirmation";
import TaskManagerTable from "../TaskManagerTable/TaskManagerTable";
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.

           
       
        
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            <ProtectedRoute exact path="/home" component={UserPage} />
            <Route exact path="/register-page" component={RegisterPage} />
            <ProtectedRoute
              exact
              path="/add-child-form"
              component={AddChildForm}
            />
            <ProtectedRoute
              exact
              path="/add-child-confirmation"
              component={AddChildConfirmation}
            />
            <ProtectedRoute
              exact
              path="/task-manager-table"
              component={TaskManagerTable}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );}
}

export default connect()(App);

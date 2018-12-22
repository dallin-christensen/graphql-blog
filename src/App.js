import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjpx5k8me0ayr01hczq4hsoha/master'
})

//cjpx5rzd6lydb0a23214pnziv

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">

            <Switch>
              <Route exact path='/' component={Posts} />
              <Route path='/post/:id' component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

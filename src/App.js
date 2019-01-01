import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'
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
            <header className='App-header'>
              <Link to={'/'}>
                <h1 className='App-title'>GraphQL</h1>
              </Link>
            </header>
            <main>
              <Switch>
                <Route exact path='/' component={Posts} />
                <Route exact path='/post/new' component={NewPost} />
                <Route path='/post/:id' component={Post} />
              </Switch>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

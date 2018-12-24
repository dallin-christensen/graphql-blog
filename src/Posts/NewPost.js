import React, { Component } from 'react'
import PostForm from './PostForm'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class NewPost extends Component {
  state = {
    title: '',
    body: '',
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { title, body } = this.state
    return (
      <div>
        <h1>New Post</h1>
        <Mutation
          mutation={NEW_POST}
          variables={{
            title,
            body,
          }}
        >
          {
            (createPost) => (
              <div>
                <input
                  type='text'
                  placeholder='title'
                  value={title}
                  name='title'
                  onChange={this.handleInput}
                />
                <textarea
                  type='text'
                  placeholder='body'
                  value={body}
                  name='body'
                  onChange={this.handleInput}
                />
                <button 
                  onClick={() => {
                    createPost()
                      .then(() => this.setState({ title: '', body: '' }))
                      .catch((err) => console.warn(err))
                  }}
                >
                  Submit
                </button>
              </div>
            )
          }

        </Mutation>
        
        {/* <PostForm /> */}
      </div>
    )
  }
}

const NEW_POST = gql`
mutation createPost($title: String!, $body: String!) {
  createPost(data: {
    status: PUBLISHED
    title: $title
    body: $body
  }) {
    title
    body
    id
  }
}
`

export default NewPost

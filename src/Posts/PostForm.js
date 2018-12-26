import React, { Component } from 'react'

class PostForm extends Component {
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
    const { onSubmit } = this.props
    return (
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
            onSubmit({
              variables: {
                title,
                body,
              }
            })
              .then(() => this.setState({ title: '', body: '' }))
              .catch((err) => console.warn(err))
          }}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default PostForm
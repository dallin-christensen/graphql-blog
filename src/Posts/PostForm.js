import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.instanceOf(Object),
    onSuccess: PropTypes.func,
  }
  static defaultProps = {
    post: {},
    onSuccess: () => null,
  }
  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || '',
  }
  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  render() {
    const { title, body, id } = this.state
    const { onSubmit, onSuccess } = this.props
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
          className='button'
          onClick={() => {
            onSubmit({
              variables: {
                title,
                body,
                id,
              }
            })
              .then(() => onSuccess())
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
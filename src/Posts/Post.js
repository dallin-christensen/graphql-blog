import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

class Post extends Component {
  render() {
    const { id } = this.props.match.params
    return (
      <Query
        query={POST_QUERY}
        variables={{ id }}
      >
        {({ data, loading }) => {
          if (loading) return 'loading...'
          const { post } = data
          return <h1>{post.title}</h1>
        }}
      </Query>
    )
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id}) {
      id
      title
      body
    }
  }
`

export default Post

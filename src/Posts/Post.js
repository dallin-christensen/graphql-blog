import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import UpdatePost from './UpdatePost'
import EditMode from './EditMode'

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
          const { post, isEditMode } = data
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              {
                isEditMode
                  ? (
                    <section>
                      <h1>Edit Post</h1>
                      <UpdatePost post={post} />
                    </section>
                  )
                  : (
                    <section>
                      <h1>{post.title}</h1>
                      <Mutation
                        mutation={UPDATE_POST}
                        variables={{
                          id: post.id,
                          check: !post.check,
                        }}
                        optimisticResponse={{
                          __typename: 'Mutation',
                          updatePost: {
                            __typename: 'Post',
                            check: !post.check,
                          },
                        }}
                        update={(cache, { data: { updatePost } }) => {
                          const data = cache.readQuery({
                            query: POST_QUERY,
                            variables: {
                              id: post.id
                            }
                          })
                          data.post.check = updatePost.check
                          cache.writeQuery({
                            query: POST_QUERY,
                            data: {
                              ...data,
                              post: data.post,
                            }
                          })
                        }}
                      >
                        {
                          (updatePost) => (
                            <input
                              type='checkbox'
                              checked={post.check}
                              onChange={updatePost}
                            />
                          )
                        }
                      </Mutation>
                    </section>
                  )
              }        
            </div>
          )
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
      check
    }
    isEditMode @client
  }
`

const UPDATE_POST = gql`
mutation updatePost($id: ID!, $check: Boolean){
  updatePost(where: { id: $id }, data: { check: $check }) {
    check
  }
}
`

//cjqdxi95kof9b0a2321ejacft

export default Post

import React from 'react'
import PropTypes from 'props-types'

function Posts({ posts }) {
  return (
    <ul>
      {this.props.post.map((post, i) => (
        <li key={i}>{post.title}</li>
      ))}
    </ul>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts

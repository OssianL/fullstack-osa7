import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const User = props => {
  const user = props.users.find(user => user.id === props.userId)
  if(user === undefined) return null
  let blogs = user.blogs.map(blogId => props.blogs.find(blog => blog.id === blogId))
  blogs = blogs.filter(blog => blog !== undefined)
  if(blogs === undefined) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <List>
        {blogs.map(blog => <List.Item key={blog.id}>{blog.title}</List.Item>)}
      </List>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(User)
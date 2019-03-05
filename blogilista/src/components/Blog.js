import React from 'react'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button, List } from 'semantic-ui-react'

const Blog = props => {
  const comment = useField('text')

  const blog = props.blogs.find(blog => blog.id === props.blogId)
  if(blog === undefined) return null

  const handleBlogLike = async () => {
    blog.likes++
    props.updateBlog(blog)
  }

  const handleBlogRemove = async () => {
    if(window.confirm('remove blog ' + blog.title)) {
      props.removeBlog(blog)
    }
  }

  const handleNewComment = async event => {
    event.preventDefault()
    props.addComment(comment.value, blog)
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div><a href={blog.url} >{blog.url}</a></div>
        <div>{blog.likes} likes <Button onClick={handleBlogLike}>like</Button></div>
        <div>added by {blog.user.name}</div>
        {blog.user.name === props.user.name && <div><Button basic color='red' onClick={handleBlogRemove}>remove</Button></div>}
        <h3>comments</h3>
        <Form onSubmit={handleNewComment}>
          <input {...comment} reset='' />
          <Button type='submit'>add comment</Button>
        </Form>
        <List>
          {blog.comments && blog.comments.map(comment => <List.Item key={comment}>{comment}</List.Item>)}
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
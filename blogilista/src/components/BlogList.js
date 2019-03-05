import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { addBlog, updateBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = props => {

  const handleNewBlog = async newBlog => {
    const addedBlog = await blogService.create(newBlog)
    props.addBlog(addedBlog)
    props.setNotification('uusi blogi: ' + addedBlog.title + ' lisättiin', 5)
  }

  return (
    <div>
      <Togglable buttonLabel='lisää blogi'>
        <h2>create new</h2>
        <BlogForm onSubmit={handleNewBlog} />
      </Togglable>
      <Table striped celled>
        <Table.Body>
          {props.blogs.map(blog =>
            <Table.Row key={blog.id} >
              <Table.Cell>
                <Link to={'/blogs/'+blog.id}>{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
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
  addBlog,
  updateBlog,
  removeBlog,
  setNotification,
  initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
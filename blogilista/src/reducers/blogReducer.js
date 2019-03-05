import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  let updatedBlog = null
  switch(action.type) {
  case 'ADD_BLOG':
    return store.concat(action.blog)
  case 'ADD_COMMENT':
    updatedBlog = store.find(blog => blog.id === action.blog.id)
    updatedBlog.comments = updatedBlog.comments.concat(action.comment)
    return store.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  case 'UPDATE_BLOG':
    return store.map(blog => blog.id === action.blog.id ? action.blog : blog)
  case 'REMOVE_BLOG':
    return store.filter(blog => blog.id !== action.blog.id)
  case 'INITIALIZE_BLOGS':
    return action.blogs
  default:
    return store
  }
}

export const addBlog = blog => {
  return async dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      blog
    })
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    const newComment = await blogService.createComment(comment, blog)
    dispatch({
      type: 'ADD_COMMENT',
      comment: newComment.content,
      blog
    })
  }
}

export const updateBlog = blogToUpdate => {
  return async dispatch => {
    const blog = await blogService.update(blogToUpdate)
    dispatch({
      type: 'UPDATE_BLOG',
      blog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes-a.likes)
    dispatch({
      type: 'INITIALIZE_BLOGS',
      blogs
    })
  }
}

export default blogReducer
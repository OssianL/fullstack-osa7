const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return null
  return blogs.reduce((favorite, blog) => {
    if(blog.likes > favorite.likes) {
      return blog
    }
    else return favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null
  const blogCounts = {}
  blogs.forEach(blog => {
    if(!blogCounts[blog.author]) blogCounts[blog.author] = 1
    else blogCounts[blog.author]++
  })
  let topAuthor = ''
  let topBlogs = 0
  for(let author in blogCounts) {
    if(blogCounts[author] > topBlogs) {
      topAuthor = author
      topBlogs = blogCounts[author]
    }
  }
  return {
    author: topAuthor,
    blogs: topBlogs
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null
  const blogLikes = {}
  blogs.forEach(blog => {
    if(!blogLikes[blog.author]) blogLikes[blog.author] = blog.likes
    else blogLikes[blog.author] += blog.likes
  })
  let topAuthor = ''
  let topLikes = 0
  for(let author in blogLikes) {
    if(blogLikes[author] > topLikes) {
      topAuthor = author
      topLikes = blogLikes[author]
    }
  }
  return {
    author: topAuthor,
    likes: topLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
var _ = require('lodash')

const dummy = () => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.length > 1 ? blogs.reduce((a, b) => (a.likes || a) + b.likes) : blogs[0].likes
}

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs[0]
}

const mostBlogs = (blogs) => {
  //    let res = _.groupBy(blogs, 'author')
  let res = _.chain(blogs).groupBy('author').toPairs().sortBy(x => x[1].length).last().value()
  return {
    author: res[0],
    blogs: res[1].length
  }
}

const mostlike = (blogs) => {

  let res = _.chain(blogs).groupBy('author').toPairs().map(x => [x[0], _.reduce(x[1], (a, b) => (a.likes || a) + b.likes, 0)]).sortBy(x => x[1]).last().value()
  return {
    author: res[0],
    likes: res[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlike
}
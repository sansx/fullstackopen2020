const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0
    return blogs.length > 1 ? blogs.reduce((a, b) => (a.likes || a) + b.likes) : blogs[0].likes
}

const favoriteBlog = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes )
    return blogs[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
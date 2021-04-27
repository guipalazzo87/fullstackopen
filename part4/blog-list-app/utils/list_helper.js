const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let initialValue = 0
    let sum = blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes
        , initialValue)
    return sum
}

const favoriteBlog = (blogs) => {

    function indexOfMax(blogs) {
        if (blogs.length === 0) {
            return -1;
        }

        var max = blogs[0].likes;
        var maxIndex = 0;

        for (var i = 1; i < blogs.length; i++) {
            if (blogs[i].likes > max) {
                maxIndex = i;
                max = blogs[i].likes;
            }
        }

        return maxIndex;
    }

    let maxLikesIndex = indexOfMax(blogs)

    let favBlog = {
        title: blogs[maxLikesIndex].title,
        author: blogs[maxLikesIndex].author,
        likes: blogs[maxLikesIndex].likes
    }

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
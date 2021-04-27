const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

test('dummy must return 1. Returned:', () => {
    const result = dummy('arr')

    expect(result).toBe(1)
})
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const listWithThreeBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 1,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
]

describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has three blog, equals the likes of that', () => {
        const result = totalLikes(listWithThreeBlogs)
        expect(result).toBe(18)
    })
})

describe('most liked blog', () => {

    test('most liked blog of a list with only one blog', () => {
        const result = favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('most liked blog of a list with three blogs', () => {
        const result = favoriteBlog(listWithThreeBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})
import React from 'react'

const Courses = (props) => {
    const { courses } = props
    return (
      <div>
        <Header courses={courses} />
      </div>
    )
  }
  
  const Header = ({ courses }) => (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <h2 key={course.id}>
            {course.name}
          </h2>
          <>
            <Content course={course} />
          </>
          <Total course={course} />
        </div>
      )}
    </div>
  )
  
  const Content = (course) => (
    <div>
      {course.course.parts.map(parts =>
        <div key={parts.id}>
          {parts.name} {parts.exercises}
        </div>
      )}
    </div>
  )
  
  const Total = ({ course }) => {
  
    const sum = course.parts
      .map(each => each.exercises)
      .reduce((a, b) => a + b, 0)
  
    return (
      <div>
        <h4>
          total of {sum} exercises
        </h4>
      </div>
    )
  }

  export default Courses
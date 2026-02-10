const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.course.part1} {props.course.exercises1}
      </p>
      <p>
        {props.course.part2} {props.course.exercises2}
      </p>
      <p>
        {props.course.part3} {props.course.exercises3}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default App
import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, veryGood }) => {
  const all = good + neutral + bad + veryGood

  if (all === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / all
  const positive = ((good + veryGood) / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="very good" value={veryGood} />
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [veryGood, setVeryGood] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => setVeryGood(veryGood + 1)} text="very good" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>Statistics</h1>

      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        veryGood={veryGood} 
      />
    </div>
  )
}

export default App
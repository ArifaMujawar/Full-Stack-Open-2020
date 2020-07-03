import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setTotal] = useState(0);

  const handleClickForNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(all + 1);
  };
  const handleClickForBad = () => {
    setBad(bad + 1);
    setTotal(all + 1);
  };
  const handleClickForGood = () => {
    setGood(good + 1);
    setTotal(all + 1);
  };
  return (
    <div>
    <h3>give feedback</h3>
      <Feedback
        handleClickForNeutral={handleClickForNeutral}
        handleClickForBad={handleClickForBad}
        handleClickForGood={handleClickForGood}
      />
      <h3>statistics</h3>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
        average={(good + neutral + bad) / 3}
        positive={(good / all) * 100}
      />
    </div>
  );
};
const Feedback = ({
  handleClickForGood,
  handleClickForBad,
  handleClickForNeutral,
}) => {
  return (
    <div>
      <button onClick={handleClickForGood}>good</button>
      <button onClick={handleClickForNeutral}>neutral</button>
      <button onClick={handleClickForBad}>bad</button>
    </div>
  );
};

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.all}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive}%</p>
      </div>
    );
  }
  return (
    <div>
   <p>No feedback given</p> 
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById("root"));

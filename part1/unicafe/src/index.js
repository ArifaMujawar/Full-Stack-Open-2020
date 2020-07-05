import React, { useState, useEffect } from "react";
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
      {good > 0 || neutral > 0 || bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
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
      <Button onClick={handleClickForGood} text="good" />
      <Button onClick={handleClickForNeutral} text="neutral" />
      <Button onClick={handleClickForBad} text="bad" />
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

const Statistic = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  return (
    <div>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
      <Statistic text="all" value={all} />
      <Statistic
        text="average"
        value={(props.good + props.neutral + props.bad) / 3}
      />
      <Statistic text="positive" value={(props.good / all) * 100} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

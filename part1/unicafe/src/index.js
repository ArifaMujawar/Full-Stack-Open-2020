import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
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
      <p>statistics</p>
      <table>
        {good > 0 || neutral > 0 || bad > 0 ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        ) : (
          <tbody>
            <tr>
              <td>No feedback given</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
const Feedback = (props) => {
  return (
    <div>
      <Button onClick={props.handleClickForGood} text="good" />
      <Button onClick={props.handleClickForNeutral} text="neutral" />
      <Button onClick={props.handleClickForBad} text="bad" />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <td>
      {props.text} {props.value}
    </td>
  );
};

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const positive = (props.good / all) * 100 + "%";
  return (
    <tbody>
      <tr>
        <Statistic text="good" value={props.good} />
      </tr>
      <tr>
        <Statistic text="neutral" value={props.neutral} />
      </tr>
      <tr>
        <Statistic text="bad" value={props.bad} />
      </tr>
      <tr>
        <Statistic text="all" value={all} />
      </tr>
      <tr>
        <Statistic
          text="average"
          value={(props.good + props.neutral + props.bad) / 3}
        />
      </tr>
      <tr>
        <Statistic text="positive" value={positive} />
      </tr>
    </tbody>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

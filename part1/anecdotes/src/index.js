import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [votes, setVotes] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setVotes(props.copy[0]);
  }, [props.copy]);

  useEffect(() => {
    let som = Math.max.apply(null, props.copy);
    setMostVotes(som);
    setIndex(props.copy.indexOf(som));
  }, [props.copy, votes]);

 
  const handleNext = () => {
    const random = Math.floor(Math.random() * 6);
    setSelected(random);
    setVotes(props.copy[random]);
  };
  const handleVote = () => {
    props.copy[selected] += 1;
    setVotes(props.copy[selected]);
  };

  return (
    <div>
      <Helper
        text="Anecdote of the day"
        value={props.anecdotes[selected]}
        votes={votes}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <Helper
        text="Anecdote with most votes"
        value={props.anecdotes[index]}
        votes={mostVotes}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const points = new Array(2, 5, 7, 9, 1, 4); //.fill(0);
const copy = [...points];

const Helper = (props) => {
  return (
    <div>
      <h3>{props.text}</h3>
      <p>{props.value}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};
ReactDOM.render(
  <App anecdotes={anecdotes} copy={copy} />,
  document.getElementById("root")
);

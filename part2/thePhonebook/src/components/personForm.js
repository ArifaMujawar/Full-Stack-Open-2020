import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          name: <input onChange={props.handleNewName} value={props.newName} />
        </div>

        <div>
          number: <input onChange={props.handleNumber} value={props.number} />
        </div>
        <div>
          <button onClick={props.handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

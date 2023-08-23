import React, { useState } from 'react';
import { ErrorAlert } from "./Alert";

const NumberOfEvents = (props) => {
  const [num, setNum] = useState(32);
  const [alert, setAlert] = useState('');

  const handleInputChanged = (event) => {
      const inputNum = event.target.value;
      let updatedNum = inputNum;
      let err = '';

      if (inputNum > 32) {
        err = 'Sorry, we cannot show more than 32 events at once.';
        updatedNum = 32;
      } else if (inputNum <= 0) {
        err = 'Please choose at least 1.';
        updatedNum = 1;
      }

      props.updateEvents(null, updatedNum);
      setNum(updatedNum);
      setAlert(err);
  }

  return (
    <>
      <input
        className='num'
        type='number'
        min={1}
        max={32}
        value={num}
        onChange={handleInputChanged}
      />
      <ErrorAlert text={alert} />
    </>
  );
}

export default NumberOfEvents;

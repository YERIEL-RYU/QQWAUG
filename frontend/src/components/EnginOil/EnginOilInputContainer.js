import React, { useCallback, useState } from 'react';
import EnginOilInputPresenter from './EnginOilInputPresenter';

const EnginOilInputContainer = ({ classes }) => {
  const [inputValue, setInputValue] = useState([]);
  const [DialogOpen, setOnDialogOpen] = useState(false);
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value, e.target.name);
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
      console.log(inputValue);
    },
    [inputValue],
  );
  const onClick = useCallback(() => {
    setInputValue('');
    setOnDialogOpen(false);
  }, []);
  const onDialogOpen = () => {
    setOnDialogOpen(true);
  };
  const onDialogClose = () => {
    setOnDialogOpen(false);
  };
  return (
    <EnginOilInputPresenter
      classes={classes}
      DialogOpen={DialogOpen}
      onDialogOpen={onDialogOpen}
      onDialogClose={onDialogClose}
      onClick={onClick}
      value={inputValue}
      onChange={onChange}
    />
  );
};

export default EnginOilInputContainer;

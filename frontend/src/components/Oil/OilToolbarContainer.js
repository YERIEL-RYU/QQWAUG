import React, { useCallback, useState } from 'react';
import OilToolbarPresenter from './OilToolbar';
import axios from 'axios';

const OilToolbarContainer = (props) => {
  const { numSelected } = props;
  const [DialogOpen, setOnDialogOpen] = useState(false);
  const onDialogOpen = () => {
    setOnDialogOpen(true);
    console.log('주유내역 추가하기');
  };
  const onDialogClose = () => {
    setOnDialogOpen(false);
    console.log('Dialog 닫음');
  };
  const [value, setValue] = useState([]);
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value, e.target.name);
      setValue({ ...value, [e.target.name]: e.target.value });
      console.log(value);
    },
    [value],
  );
  const onSubmit = useCallback(
    (e) => {
      const userid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8000/oil/';
      axios
        .post(url, {
          userid: userid,
          oil_date: value.oil_date,
          oil_liter: value.oil_liter,
          oil_price: value.oil_price,
          oil_total: value.oil_total,
        })
        .catch((error) => console.error());
      setValue('');
      onDialogClose();
    },
    [value],
  );
  return (
    <OilToolbarPresenter
      numSelected={numSelected}
      DialogOpen={DialogOpen}
      onDialogOpen={onDialogOpen}
      onDialogClose={onDialogClose}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default OilToolbarContainer;

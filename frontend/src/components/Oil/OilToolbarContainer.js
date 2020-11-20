import React, { useCallback, useState } from 'react';
import OilToolbarPresenter from './OilToolbar';
import axios from 'axios';

const OilToolbarContainer = (props) => {
  const { numSelected, selected } = props;
  console.log(numSelected);
  const [DialogOpen, setOnDialogOpen] = useState(false);
  const onDialogOpen = () => {
    setOnDialogOpen(true);
  };
  const onDialogClose = () => {
    setOnDialogOpen(false);
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
  const onDelete = useCallback(() => {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    console.log(selected[0].id);
    const id = selected[0].id;
    const url = 'http://localhost:8000/oil/' + userid + '/' + id + '/';
    axios.delete(url, {
      headers: {
        Authorization: 'JWT ' + token,
      },
    });
  });
  return (
    <OilToolbarPresenter
      numSelected={numSelected}
      DialogOpen={DialogOpen}
      onDialogOpen={onDialogOpen}
      onDialogClose={onDialogClose}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default OilToolbarContainer;

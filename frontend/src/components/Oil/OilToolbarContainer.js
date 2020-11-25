import React, { useCallback, useState } from 'react';
import OilToolbarPresenter from './OilToolbar';
import axios from 'axios';

const OilToolbarContainer = (props) => {
  const { numSelected,selected,history } = props;
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
  const onReloader = useCallback(()=>{
   window.location.reload()
  })
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
            oil_total: value.oil_liter*value.oil_price,
        }).then(onReloader())
        .catch((error) => console.error());
      setValue('');
      onDialogClose();
    },
    [value],
  );
  console.log(selected,'oiltoolbarContainer')
  const onDelete = useCallback(
    (e) => {
      console.log(selected.length)
      if (selected.length === 1){
        const userid = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
        const oilid = selected[0].id
        const url = 'http://localhost:8000/oil/'+userid+'/';
        axios
        .delete(url,{
          headers: {
            Authorization: `JWT ${token}`,
          },
          data:{
            oilid: oilid
          }
        }).then((response)=>{
          if(response.status===204){
            window.alert('삭제 되었습니다.');
            onReloader()
          }
          else{
            window.alert('삭제 할 수 없습니다.')
          }
        })
        
        setValue('');
        onDialogClose();
      }
      else if(selected.length !==1) {
        return window.alert('삭제할 내역을 하나만 선택하세요')
      }
    },
    [value,selected],
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
      onDelete={onDelete}
    />
  );
};

export default OilToolbarContainer;

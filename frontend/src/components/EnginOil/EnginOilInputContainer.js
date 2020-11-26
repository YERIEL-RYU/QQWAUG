import React, { useCallback, useState } from 'react';
import EnginOilInputPresenter from './EnginOilInputPresenter';
import axios from 'axios'

const EnginOilInputContainer = (props) => {
  const { title, setOnDialogOpen, DialogOpen, onDialogOpen, enginoilId} = props
  const [inputValue, setInputValue] = useState([]);
  const onDialogClose = () => {
    setOnDialogOpen(false);
  };
  
  const onChange = useCallback(
    (e) => {
      console.log(e.target.value, e.target.name);
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
      console.log(inputValue);
    },
    [inputValue],
  );
  const onClick = useCallback(() => {
    const url = `http://localhost:8000/enginoil/`
    const token = localStorage.getItem('token')
    const userid = localStorage.getItem('userid')
    axios.post(
      url, {
        userid : userid,
        change_date : inputValue.date,
        center : inputValue.where,
        enginoil_img : inputValue.image,
        change_km : inputValue.km
      },
      {headers:{
        Authorization : `JWT ${token}`
      }},
    ).then((response)=>{
      console.log(response.status);
      setOnDialogOpen(false);
      window.location.reload()
    })
  }, [inputValue]);

  const onModify = useCallback(() => {
    
    const token = localStorage.getItem('token')
    const userid = localStorage.getItem('userid')
    const url = `http://localhost:8000/enginoil/${enginoilId}/`
    axios.put(
      url, {
        userid : userid,
        change_date : inputValue.date,
        center : inputValue.where,
        enginoil_img : inputValue.image,
        change_km : inputValue.km
      },
      {headers:{
        Authorization : `JWT ${token}`
      }},
    ).then((response)=>{
      console.log(response.status);
      setOnDialogOpen(false);
      window.location.reload()
    }).catch((error)=>{
      console.log(error)
      if(error.status === 400){
        window.alert('빈칸을 모두 채우세요')
      }
    })
  }, [inputValue, enginoilId]);

  

  return (
    <EnginOilInputPresenter
      title={title}
      DialogOpen={DialogOpen}
      onDialogOpen={onDialogOpen}
      onDialogClose={onDialogClose}
      onClick={onClick}
      value={inputValue}
      onChange={onChange}
      onModify={onModify}
    />
  );
};

export default EnginOilInputContainer;

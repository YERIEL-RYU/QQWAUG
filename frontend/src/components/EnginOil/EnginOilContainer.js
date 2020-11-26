import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EnginOilPresenter from './EnginOilPresenter';
import axios from 'axios'

const EnginOilContainer = () => {
  const rowsPerPage = 9;
  const PATH = '/enginoil';
  const { pageNumber = 1 } = useParams();
  //데이터 시작 && 끝
  const startRow = (Number(pageNumber) - 1) * rowsPerPage;
  const endRow = (Number(pageNumber) - 1) * rowsPerPage + rowsPerPage;
  const [enginoils, setEnginoils] = useState([])
  const [DialogOpen, setOnDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [enginoilId, setEnginoilId] = useState('');

  useEffect(()=>{
    const userid = localStorage.getItem('userid')
    const url = `http://localhost:8000/enginoil/${userid}/`
    const token = localStorage.getItem('token')
    axios.get(url,{
      headers:{
        Authorization : `JWT ${token}`
      }
    }).then((response)=>{
      setEnginoils(response.data)
    })
  },[])

  const onDelete = useCallback((e)=>{
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const url = `http://localhost:8000/enginoil/${userid}/`
    const enginoil_id = e.currentTarget.id
    axios.delete(url, {
      headers:{
        Authorization : `JWT ${token}`
      },
      data:{
        enginoil_id : enginoil_id
      }
    }).then((response)=>{
      if(response.status === 204){
        window.alert('삭제되었습니다.')
        window.location.reload()
      }else{
        window.alert('삭제할 수 없습니다.')
      }
    })
  })

  const onDialogOpen = () => {
    setTitle('엔진오일 교체 내역 등록')
    setOnDialogOpen(true);
  };

  const onModify = useCallback((e)=>{
    console.log(e.currentTarget.id)
    setEnginoilId(e.currentTarget.id)
    setTitle('엔진오일 교체 내역 수정')
    setOnDialogOpen(true);
  })

  return (
    <EnginOilPresenter
      enginoils={enginoils}
      rowsPerPage={rowsPerPage}
      PATH={PATH}
      startRow={startRow}
      endRow={endRow}
      pageNumber={pageNumber}
      onDelete={onDelete}
      //EnginoilInputContainer
      title={title}
      DialogOpen={DialogOpen}
      enginoilId={enginoilId}
      onDialogOpen={onDialogOpen}
      setOnDialogOpen={setOnDialogOpen}
      onModify={onModify}
    />
  );
};

export default EnginOilContainer;

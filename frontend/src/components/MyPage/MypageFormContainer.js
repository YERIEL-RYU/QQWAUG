import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPageFormPresenter from './MyPageFormPresenter';
import axios from 'axios';

const MypageFormContainer = ({ match, history }) => {
  useEffect(() => {
    onTitle();
  }, []);
  const [title, setTitle] = useState('');
  const [userValue, setUserValue] = useState([{
    password:'',
    useremail:''
  }]);
  const [profileValue, setProfileValue] = useState([]);
  const param = match.params.name;
  const onTitle = useCallback(() => {
    if (param === 'password') {
      setTitle('비밀번호');
    } else if (param === 'useremail') {
      setTitle('이메일');
    } else if (param === 'profile_region') {
      setTitle('지역');
    } else if (param === 'profile_gender') {
      setTitle('성별');
    } else if (param === 'profile_img') {
      setTitle('프로필 이미지');
    } else {
      setTitle('');
    }
  });
  const onGoBack = () => {
    history.goBack();
  };
  const userid = localStorage.getItem('userid');
  
  //profile update
  const onProfileSubmit = useCallback(
    (e) => {
      const url = 'http://localhost:8000/users/profile/' + userid + '/';
      const form_data = new FormData();
      form_data.append('userid',userid);
      if(profileValue.profile_img !== undefined){
        form_data.append('profile_img', profileValue.profile_img, profileValue.profile_img.name);
      }else if (profileValue.profile_region !== undefined){
        form_data.append('profiel_region',profileValue.profile_region)
      }else if (profileValue.profile_gender !== undefined) {
        form_data.append('profiel_gender',profileValue.profile_gender)
      }
      axios
        .patch(url, form_data, {
          headers:{
            "content-Type" :  `multipart/form-data;`
          }
        })
        .then((response) => {
          const stauts = response.status;
          if (stauts === 201) {
            window.location.replace('/mypage')
          }
        })
        .catch((error) => {
          console.log(error);
          alert(title + '을 수정할 수 없습니다.');
        });
      setProfileValue([]);
    },
    [profileValue],
  );

  //user update
  const onUserSubmit = useCallback((e)=>{
    const url = `http://localhost:8000/users/user/${userid}/`
    const token = localStorage.getItem('token')
    axios.patch(url,{
      userid: userid,
      password : userValue.password,
      useremail : userValue.useremail
    },{headers:{Authorization : `JWT ${token}`}})
    .then((response)=>{
      const stauts = response.status;
          if (stauts === 201) {
            window.location.replace('/mypage')
          }
    })
    .catch((error) => {
      const status = error.status;
      console.log(status);
      alert(title + '을 수정할 수 없습니다.');
    });
    setUserValue([]);
  },[userValue])

  //value change
  const onChange = useCallback((e) => {
    // console.log(e.target.files[0].name)
    const name = e.target.name;
    if(name !== 'profile_img'){
      const value = e.target.value;
      setUserValue({ [name]: value })
      setProfileValue({ [name]: value });
      console.log(name, value);
    }
    else {
      const value = e.target.files[0];
      setProfileValue({ [name]: value });
      console.log(name, value);
    }
  });
  return (
    <MyPageFormPresenter
      title={title}
      userValue={userValue}
      profileValue={profileValue}
      onGoBack={onGoBack}
      onProfileSubmit={onProfileSubmit}
      onChange={onChange}
      onUserSubmit={onUserSubmit}
    />
  );
};

export default MypageFormContainer;

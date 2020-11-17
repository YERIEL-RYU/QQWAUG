import React, { useCallback, useEffect, useState } from 'react';
import MyPageFormPresenter from './MyPageFormPresenter';
import axios from 'axios';

const MypageFormContainer = ({ match, history }) => {
  useEffect(() => {
    onTitle();
  }, []);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState([]);
  const onTitle = useCallback(() => {
    const param = match.params.name;
    if (param === 'userpassword') {
      setTitle('비밀번호');
    } else if (param === 'useremail') {
      setTitle('이메일');
    } else if (param === 'profileregion') {
      setTitle('지역');
    } else if (param === 'profilegender') {
      setTitle('성별');
    } else if (param === 'profileimg') {
      setTitle('프로필 이미지');
    } else {
      setTitle('');
    }
  });
  const onGoBack = () => {
    history.goBack();
  };
  const onProfileSubmit = useCallback(
    (e) => {
      const userid = localStorage.getItem('userid');
      axios
        .patch(`http://localhost:8000/users/profile/${userid}/`, {
          userid: userid,
          profile_gender: value.userGender,
          profile_region: value.userRegion,
        })
        .then(() => {
          window.location.href('/mypage');
        })
        .catch(() => {
          window.location.href('/mypage');
        });
      setValue([]);
    },
    [value],
  );
  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue({ [name]: value });
    console.log(name, value);
  });
  return (
    <MyPageFormPresenter
      title={title}
      value={value}
      onGoBack={onGoBack}
      onProfileSubmit={onProfileSubmit}
      onChange={onChange}
    />
  );
};

export default MypageFormContainer;

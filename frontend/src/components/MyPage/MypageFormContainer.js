import React, { useCallback, useEffect, useState } from 'react';
import MyPageFormPresenter from './MyPageFormPresenter';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const MypageFormContainer = ({ match, history }) => {
  useEffect(() => {
    onTitle();
  }, []);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState([]);
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
  const url = 'http://localhost:8000/users/profile/' + userid + '/';
  const onProfileSubmit = useCallback(
    (e) => {
      axios
        .patch(url, {
          userid: userid,
          profile_gender: value.profile_gender,
          profile_region: value.profile_region,
          profile_img: value.profile_img,
        })
        .then((response) => {
          const stauts = response.status;
          if (stauts === 201) {
            return <Redirect to="/mypage" />;
          }
        })
        .catch((error) => {
          const status = error.status;
          console.log(status);
          alert(title + '을 수정할 수 없습니다.');
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

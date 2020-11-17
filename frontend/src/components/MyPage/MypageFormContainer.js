import React, { useCallback, useEffect, useState } from 'react';
import MyPageFormPresenter from './MyPageFormPresenter';

const MypageFormContainer = ({ match, history }) => {
  useEffect(() => {
    onTitle();
  }, []);
  const [title, setTitle] = useState('');
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
  return <MyPageFormPresenter title={title} onGoBack={onGoBack} />;
};

export default MypageFormContainer;

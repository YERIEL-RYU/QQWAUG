import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import MyPagePresenter from './MyPagePresenter';

const MyPageContainer = ({ history }) => {
  const { user, profile } = useSelector((state) => ({
    user: state.auth.user,
    profile: state.auth.profile,
  }));
  const onClick = useCallback((e) => {
    console.log(e.target.id);
    const name = e.target.id;
    history.push(`/mypage/${name}`);
  });
  return <MyPagePresenter onClick={onClick} user={user} profile={profile} />;
};

export default MyPageContainer;

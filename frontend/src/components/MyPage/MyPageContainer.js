import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import MyPagePresenter from './MyPagePresenter';

const MyPageContainer = () => {
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/users/profile/${localStorage.getItem(
          'userid',
        )}/`,
      )
      .then((response) => response.data)
      .then(
        ({
          userid,
          username,
          useremail,
          profile_img,
          profile_region,
          profile_gender,
        }) =>
          setUser({
            userId: userid,
            userName: username,
            userEmail: useremail,
            profileImg: profile_img,
            profileRegion: profile_region,
            profileGender: profile_gender,
          }),
      )
      .catch((error) => console.log(error.response));
  }, []);
  const [user, setUser] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    profileImg: '',
    profileRegion: '',
    profileGender: '',
  });
  const onClick = useCallback(() => {
    console.log('클릭이벤트');
  });
  return <MyPagePresenter onClick={onClick} user={user} />;
};

export default MyPageContainer;

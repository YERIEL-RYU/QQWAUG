import React from 'react';
import { makeStyles } from '@material-ui/core';
import MyPageNormalForm from './MypageNormalForm';
import MyPageRegionForm from './MyPageRegionForm';
import MyPageGenderForm from './MypageGenderForm';
import MyPageImageForm from './MyPageImageForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: ' 100%',
    height: '100%',
  },
  section: {
    width: '90%',
    height: 300,
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  title: {
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  content: {
    height: 150,
    paddingTop: 10,
  },
  button: {
    paddingTop: 20,
  },
}));

const MyPageFormPresenter = (props) => {
  const { title, onGoBack, onProfileSubmit, onChange, value } = props;
  const classes = useStyles();
  if (title === '지역') {
    return (
      <MyPageRegionForm
        title={title}
        value={value}
        onGoBack={onGoBack}
        classes={classes}
        onProfileSubmit={onProfileSubmit}
        onChange={onChange}
      />
    );
  } else if (title === '성별') {
    return (
      <MyPageGenderForm
        title={title}
        value={value}
        onGoBack={onGoBack}
        classes={classes}
        onProfileSubmit={onProfileSubmit}
        onChange={onChange}
      />
    );
  } else if (title === '프로필 이미지') {
    return (
      <MyPageImageForm
        title={title}
        value={value}
        onGoBack={onGoBack}
        classes={classes}
        onProfileSubmit={onProfileSubmit}
        onChange={onChange}
      />
    );
  } else {
    return (
      <MyPageNormalForm
        title={title}
        value={value}
        onGoBack={onGoBack}
        classes={classes}
        onChange={onChange}
      />
    );
  }
};

export default MyPageFormPresenter;

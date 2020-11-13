import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function CustomizedMenus(props) {
  const { anchorEl, onMenuClose } = props;

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onMenuClose}
    >
      <MenuItem>
        <Link
          to="/mypage"
          onClick={() => {
            onMenuClose();
          }}
        >
          <ListItemText primary="My page" />
        </Link>
      </MenuItem>
    </StyledMenu>
  );
}

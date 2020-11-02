//MainTemplate
const DRAWEROPEN = 'layout/DRWEROPEN'; // sidebar를 열음
const DRAWERCLOSE = 'layout/DRAWERCLOSE'; //sidebar를 닫음

//Header
const MENUOPEN = 'layout/MENUOPEN'; //mypage 메뉴를 열음

//Menu
const MENUCLOSE = 'layout/MENUCLOSE'; //mypage 메뉴를 닫음

//Sidebar
const SECMENUTOGGLE = 'layout/SECMENUOPEN'; //sidebar에서 하위 메뉴를 열음
const BOOKMARKTOGGLE = 'layout/BOOKMARKTOGGLE'; //bookmark toggle

export const drawerOpen = () => ({ type: DRAWEROPEN });
export const drawerClose = () => ({ type: DRAWERCLOSE });

export const menuOpen = (anchorEl) => ({ type: MENUOPEN, anchorEl });
export const menuClose = () => ({ type: MENUCLOSE });

export const secMenuToggle = () => ({
  type: SECMENUTOGGLE,
});
export const bookMarkToggle = (secMenu) => ({
  type: BOOKMARKTOGGLE,
  secMenu,
});
const initialState = {
  drawerState: false,
  anchorEl: null,
  secMenuOpen: false,
  secMenu: [
    {
      name: '엔진오일',
      link: '/enginoil/1',
      bookMark: false,
    },
    {
      name: '와이퍼',
      link: '/enginoil',
      bookMark: false,
    },
  ],
};

const layout = (state = initialState, action) => {
  switch (action.type) {
    case DRAWEROPEN:
      return {
        ...state,
        drawerState: true,
      };
    case DRAWERCLOSE:
      return {
        ...state,
        drawerState: false,
      };
    case MENUOPEN:
      return {
        ...state,
        anchorEl: action.anchorEl,
      };
    case MENUCLOSE:
      return {
        ...state,
        anchorEl: null,
      };
    case SECMENUTOGGLE:
      return {
        ...state,
        secMenuOpen: !state.secMenuOpen,
      };
    case BOOKMARKTOGGLE:
      return {
        ...state,
        secMenu: state.secMenu.map((menu) =>
          menu === action.secMenu
            ? { ...menu, bookMark: !menu.bookMark }
            : menu,
        ),
      };
    default:
      return state;
  }
};

export default layout;

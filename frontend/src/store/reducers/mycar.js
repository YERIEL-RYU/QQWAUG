const MYCAR = 'mycar/MYCAR';
const MYCAR_SUCCESS = 'mycar/MYCAR_SUCCESS';
const MYCAR_FAILURE = 'mycar/MYCAR_FAILURE';

export const mycar = () => ({
  type: MYCAR,
});
export const mycarSuccess = () => ({
  type: MYCAR_SUCCESS,
});
export const mycarFailure = (error) => ({
  type: MYCAR_FAILURE,
  error,
});
export const requestMyCar = () => {
  return (dispatch) => {};
};

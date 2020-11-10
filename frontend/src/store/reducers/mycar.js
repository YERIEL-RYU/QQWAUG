import axios from 'axios';

const MYCAR = 'mycar/MYCAR';
const MYCAR_SUCCESS = 'mycar/MYCAR_SUCCESS';
const MYCAR_FAILURE = 'mycar/MYCAR_FAILURE';

const api = axios.create({
  baseURI: 'http://localhost:8000/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `JWT ${token}` : '';
  return config;
});

export const myCar = () => ({
  type: MYCAR,
});
export const myCarSuccess = (
  carCompany,
  carName,
  carOld,
  carOil,
  carNumber,
) => ({
  type: MYCAR_SUCCESS,
  carCompany,
  carName,
  carOld,
  carOil,
  carNumber,
});
export const myCarFailure = (error) => ({
  type: MYCAR_FAILURE,
  error,
});
export const requestMyCar = (userid) => {
  return (dispatch) => {
    dispatch(myCar());
    api
      .get('http://localhost:8000/mycar/' + userid + '/')
      .then((response) => response.data)
      .then(({ car_company, car_name, car_old, car_oil, car_number }) =>
        dispatch(
          myCarSuccess(car_company, car_name, car_old, car_oil, car_number),
        ),
      )
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 400:
              dispatch(myCarFailure(error));
              break;

            case 404:
              dispatch(myCarFailure());
              break;

            case 500:
              dispatch(myCarFailure());
              break;

            default:
              dispatch(myCarFailure());
              break;
          }
        } else {
          dispatch(myCarFailure());
        }
      });
  };
};

const initialState = {
  car: { carCompany: '', carName: '', carOld: '', carOil: '', carNumber: '' },
  loading: false,
};

const mycar = (state = initialState, action) => {
  switch (action.type) {
    case MYCAR:
      return {
        ...state,
        loading: true,
      };
    case MYCAR_SUCCESS:
      return {
        car: {
          carCompany: action.carCompany,
          carName: action.carName,
          carOld: action.carOld,
          carOil: action.carOil,
          carNumber: action.carNumber,
        },
        loading: false,
      };
    case MYCAR_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default mycar;

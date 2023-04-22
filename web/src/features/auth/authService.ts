import { Axios } from '../../axios';
import { LoginData, UserData } from './authTypes';

// register user
const register = async (userData: UserData) => {
  const response = await Axios.post('api/user/registration', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData: LoginData) => {
  const response = await Axios.post('api/user/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem('user');
};

export { register, login, logout };

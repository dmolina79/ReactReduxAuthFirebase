import { browserHistory } from 'react-router';
import firebase from '../firebase';
import { 
	AUTH_USER, 
	AUTH_ERROR,
	SIGN_OUT_USER,
	FETCH_MESSAGE

} from './types';

export function signinUser({ email, password }) {
  return function (dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(authUser());
        browserHistory.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(authUser());
        browserHistory.push('/feature');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  };
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function verifyAuth() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signoutUser());
      }
    });
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}

export function signoutUser() {
	return function (dispatch) {
    firebase.auth().signOut()
    .then(() => {
      //browserHistory.push('/'); 
      dispatch({ type: SIGN_OUT_USER });
    })
    .catch(error => {
        console.log('error signing out. Detail ' + error);    
    });
  };
}

/*export function fetchMessage() {
	return function (dispatch) {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then(response => {
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			});
		});
	};
}*/

export function fetchMessage() {
	return {
		type: FETCH_MESSAGE,
		payload: 'hola mami aqui usando firebase'
	};
}


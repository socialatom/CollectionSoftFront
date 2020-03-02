import {
  SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
} from '../constants/actions'

const default_state = {
  userId: '',
  username: '',
  authenticated: false,
  is_authenticating: false,
  error: '',
  idToken: '',
  refreshToken: '',
  accessToken: '',
  userStatus: '',
	userCreateDate: '',
	userEnabled: false,
	userGroup: '',
	userFirstName: '',
  userLastName: '',
  sub: '',
  email_verified: '',
  email: ''
};

export default (state = default_state, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return {...state, authenticated: false, is_authenticating: true, error: ''};
    
    case SIGN_IN_SUCCESS:
      const {payload} = action;
      
      if('userAttributes' in payload) {
        payload.userAttributes.forEach(element => {
          state[element.Name] = element.Value;
        });
      }

      return {
        ...state,
        username: 'username' in payload ? payload.username: state.username,
        userId: 'userId' in payload ? payload.userId: state.userId,
        authenticated: true,
        is_authenticating: false,
        error: '',
        idToken: 'idToken' in payload ? payload.idToken: state.idToken,
        refreshToken: 'refreshToken' in payload ? payload.refreshToken: state.refreshToken,
        accessToken: 'accessToken' in payload ? payload.accessToken: state.accessToken,
        userStatus: 'userStatus' in payload ? payload.userStatus: state.userStatus,
        userCreateDate: 'userCreateDate' in payload ? payload.userCreateDate: state.userCreateDate,
        userEnabled: 'userEnabled' in payload ? payload.userEnabled: state.userEnabled,
        userGroup: 'userGroup' in payload ? payload.userGroup: state.userGroup,
        userFirstName: 'userFirstName' in payload ? payload.userFirstName: state.userFirstName,
        userLastName: 'userLastName' in payload ? payload.userLastName: state.userLastName,
        sub: state.sub,
        email_verified: state.email_verified,
        email: state.email
      }
    
    case SIGN_IN_ERROR:
      return {
        ...default_state,
        authenticated: false,
        is_authenticating: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

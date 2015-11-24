import { combineReducers } 
  from 'redux'

const initialTwilioState = {
  message    : '',
  call       : null,
  padVisible : false 
}

function twilio(state = initialTwilioState, action) {
  switch (action.type) {
    case 'set-message':
      return {
        ...state, message : action.message
      }
    case 'connect':
      return {
        ...state, call : action.call
      }
    case 'disconnect':
      return {
        ...state, call : null
      }
    case 'show-dialpad':
      return {
        ...state, padVisible : true
      }
    case 'hide-dialpad':
      return {
        ...state, padVisible : false
      }
    default:
      return state
  }
}

const reducers = {
  twilio
}

export default combineReducers(reducers)

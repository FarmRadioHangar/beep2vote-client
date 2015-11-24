export function setMessage(message) {
  console.log(message)
  return {
    type : 'set-message',
    message
  }
}

export function connectCall(call) {
  return {
    type : 'connect',
    call
  }
}

export function disconnectCall() {
  return {
    type : 'disconnect'
  }
}

export function showDialPad() {
  return {
    type : 'show-dialpad'
  }
}

export function hideDialPad() {
  return {
    type : 'hide-dialpad'
  }
}

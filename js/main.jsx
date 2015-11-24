import React    from 'react'
import ReactDOM from 'react-dom'
import app      from './reducers'

import { Provider, connect } 
  from 'react-redux'
import { compose, createStore } 
  from 'redux'
import { setMessage, connectCall, disconnectCall, showDialPad, hideDialPad }
  from './actions'

const store = createStore(app)

class TwilioClient extends React.Component {
  constructor(props) {
    super(props)
    this.sendDigits = this.sendDigits.bind(this)
  }
  callOut() {
    let call = Twilio.Device.connect({
      'PhoneNumber': '+49 1573 5985777'
    })
    store.dispatch(connectCall(call))
  }
  hangup() {
    Twilio.Device.disconnectAll()
  }
  sendDigits(digits) {
    const { conn } = this.props
    if (conn) {
      conn.sendDigits(digits)
    }
  }
  render() {
    const { conn, message, padVisible } = this.props
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3'>
            <div className='form-group'>
              <div className='row'>
                <div className='col-xs-12'>
                  <img src='img/logo.png' className='img-responsive' />
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-6 col-sm-5'>
                  <button className='call' onClick={this.callOut.bind(this)}>
                    Call
                  </button>
                </div> 
                <div className='col-xs-6 col-sm-7'>
                  <button className='hangup' onClick={this.hangup.bind(this)}>
                    Hangup
                  </button>
                </div> 
              </div>
            </div>
            <div className='form-group form-group-lg'>
              {!!message && (
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <p style={{background: '#fff', width: '100%', padding: '16px', marginTop: '21px', border: '1px solid #aaa'}}>
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {padVisible && (
              <div className='form-group'>
                <div>
                  <button onClick={() => this.sendDigits('1')}>1</button>
                  <button onClick={() => this.sendDigits('2')}>2</button>
                  <button onClick={() => this.sendDigits('3')}>3</button>
                </div>
                <div>
                  <button onClick={() => this.sendDigits('4')}>4</button>
                  <button onClick={() => this.sendDigits('5')}>5</button>
                  <button onClick={() => this.sendDigits('6')}>6</button>
                </div>
                <div>
                  <button onClick={() => this.sendDigits('7')}>7</button>
                  <button onClick={() => this.sendDigits('8')}>8</button>
                  <button onClick={() => this.sendDigits('9')}>9</button>
                </div>
                <div>
                  <button onClick={() => this.sendDigits('*')}>*</button>
                  <button onClick={() => this.sendDigits('0')}>0</button>
                  <button onClick={() => this.sendDigits('#')}>#</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Twilio.Device.setup('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVBmZGRlNjMxODBlMGViMTE2YzQ0MzM4NTQyMzA4N2QyMCZhcHBQYXJhbXM9JmNsaWVudE5hbWU9amVubnkgc2NvcGU6Y2xpZW50OmluY29taW5nP2NsaWVudE5hbWU9amVubnkiLCJpc3MiOiJBQzQxNGJkNjg2YzcwZjgzMzk2YjdjYTRmZjYxYTUzY2NiIiwiZXhwIjoxNDQ4MzY2MTA3fQ.F0XbmThCMO-ik4LsjVS-RyvE6sIeolFfK4sqUCnFQr4')

Twilio.Device.ready(device => {
  store.dispatch(setMessage('Ready'))
})

Twilio.Device.error(error => {
  store.dispatch(setMessage(error.message))
})

Twilio.Device.connect(conn => {
  store.dispatch(setMessage('Successfully established call'))
  store.dispatch(showDialPad())
})

Twilio.Device.disconnect(conn => {
  store.dispatch(setMessage('Call ended'))
  store.dispatch(hideDialPad())
})

Twilio.Device.incoming(conn => {
  store.dispatch(setMessage(`Incoming connection from ${conn.parameters.From}`))
  conn.accept()
})

const Client = connect(state => state.twilio)(TwilioClient)

ReactDOM.render(
  <Provider store={store}>
    <Client />
  </Provider>,
  document.getElementById('main')
)

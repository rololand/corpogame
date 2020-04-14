import React from 'react';
import axios from 'axios';
import './App.css';
import Logging from './logging/Logging.js'
import LogErrMsg from './logging/LogErrMsg.js'
import Game from './game/Game.js'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.player = {};
    this.state = {
      isUserLogged: false,
      login: "admin",
      password: "admin",
      logErrMsg: ''
    }
  }

  handleLoggingOnClickButton() {
    const url  = 'http://localhost:5000/users/findByUsername/' + this.state.login;
    axios.get(url)
      .then(user => {
        if(user.data.password == this.state.password) {
          this.playerId = user.data._id;
          this.setState({
            isUserLogged: true,
            logErrMsg: ''
          })
        } else {
          this.setState({
            logErrMsg: 'Nieprawidłowe hasło.'
          })
        }
      })
      .catch(err => {
        console.log('Error: ' + err);
        this.setState({
          logErrMsg: 'Podany login nie istnieje.'
        })
      });
  }

  handleChangeLogin(event) {
    const input = event.target.value;
    this.setState({
      login: input
    })
  }

  handleChangePassword(event) {
    const input = event.target.value;
    this.setState({
      password: input
    })
  }

  handleOnClickLogout() {
    this.setState({
      isUserLogged: false
    })
  }

  render() {

    return (
      <div className="App">
        {this.state.isUserLogged ?
          <Game onClickLogout={this.handleOnClickLogout.bind(this)}
                playerId={this.playerId}/> :
          <div>
          <Logging  handleLoggingOnClickButton={this.handleLoggingOnClickButton.bind(this)}
                    handleChangeLogin={this.handleChangeLogin.bind(this)}
                    handleChangePassword={this.handleChangePassword.bind(this)}
                    login={this.state.login}
                    password={this.state.password}
          />
          <LogErrMsg logErrMsg={this.state.logErrMsg} />
          </div>
        }
      </div>
    )
  }

}

export default App;

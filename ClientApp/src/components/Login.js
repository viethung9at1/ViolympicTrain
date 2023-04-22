import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import "../css/format.css"
export class Login extends Component {
  static displayName = Login.name;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword=this.onChangePassword.bind(this)
    this.onSubmitData=this.onSubmitData.bind(this)
  }
  onChangeUsername(event) {
    this.setState({ username: event.target.value })
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }
  async onSubmitData(event) {
    const data = { username: this.state.username, password: this.state.password }
    const reponse = await fetch("user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    const code=reponse.status
    if(code==200) alert("Login sucess")
    else alert("Login failed")
  }
  render() {
    return (
      <form onSubmit={this.onSubmitData}>
        <div>
          <label ><b>Username</b></label>
          <Input type="text" placeholder='Enter username'  onChange={this.onChangeUsername} value={this.state.username} required/>
          <label ><b>Password</b></label>
          <Input type="password" placeholder='Enter password'  onChange={this.onChangePassword} value={this.state.password} required/>
          <br />
          <Button className='login' type="submit">Login</Button>
        </div>
      </form>
    )
  }
}
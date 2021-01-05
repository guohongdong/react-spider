import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import './style.css'
import axios from 'axios'


class Home extends Component {
  state = {
    isLogin: true
  }
  componentDidMount() {
    axios.get('/api/isLogin').then(res => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false
        })
      }
    })
  }
  render() {
    const { isLogin } = this.state
    if (isLogin) {
      return (
        <div className="home-page" >
          <Button type="primary">爬取</Button>
          <Button type="primary">展示</Button>
          <Button type="primary">退出</Button>
        </div>

      );
    } else {
      return <Redirect to="/login"></Redirect>
    }
  }

};

export default Home;

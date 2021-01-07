import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Button, message } from 'antd';
import moment from 'moment';
import './style.css'
import axios from 'axios'

export interface HouseInfo {
  address: string,
  follow: number,
}
interface LineData {
  name: string;
  type: string;
  data: number[];
}
interface State {
  isLogin: boolean;
  data: {
    [key: string]: HouseInfo[];
  };
}
class Home extends Component {
  state: State = {
    isLogin: true,
    data: {}
  }
  componentDidMount() {
    axios.get('/api/isLogin').then(res => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false
        })
      }
    })
    axios.get('/api/showData').then(res => {
      if (res.data?.data) {
        this.setState({
          data: res.data.data
        });
      }
    });
  }
  handleLogoutClick = () => {
    axios.get('/api/logout').then(res => {
      if (res.data?.data) {
        this.setState({
          isLogin: false
        })
      } else {
        message.error('退出失败')
      }

    })
  }
  handleSpiderClick() {
    axios.get('/api/getData').then(res => {
      if (res.data?.data) {
        message.success('爬去成功')
      } else {
        message.error('爬去失败')
      }
    })
  }

  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state;
    const houseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format('MM-DD HH:mm'));
      item.forEach(item => {
        const { address, follow } = item;
        if (houseNames.indexOf(address) === -1) {
          houseNames.push(address);
        }
        tempData[address] ? tempData[address].push(follow) : (tempData[address] = [follow]);
      });
    }
    const result: LineData[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      });
    }
    return {
      title: {
        text: '房子关注人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: houseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
    };
  };
  render() {
    const { isLogin } = this.state
    if (isLogin) {
      return (
        <div className="home-page" >
          <div className="home-page-action">
            <Button type="primary" onClick={this.handleSpiderClick}>爬取</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
          </div>
          <ReactEcharts option={this.getOption()} />
        </div>


      );
    } else {
      return <Redirect to="/login"></Redirect>
    }
  }

};

export default Home;

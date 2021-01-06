import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import axios from 'axios';
import qs from 'qs';
import './style.css'
import { Redirect } from 'react-router-dom';


interface FormParams {
  password: string
}

class Login extends Component {
  state = {
    isLogin: false
  }
  onFinish = (values: FormParams) => {
    axios.post('/api/login', qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data?.data) {
        this.setState({
          isLogin: true
        })
      } else {
        message.error('登录失败')
      }
    })
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity<FormParams>) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    const { isLogin } = this.state
    return isLogin ? <Redirect to="/"> </Redirect> : (
      <div className="login-page" >

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
        </Button>
          </Form.Item>
        </Form>
      </div>

    );
  }

};

export default Login;

import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Typography } from "antd";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { useAuthContext } from "../../../../context/AuthContext";
const { Title } = Typography;

const SignIn = () => {
  const {onLogin} = useAuthContext();
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await axios.post("http://localhost:4000/auth/login", values);

    if (res.data.status === "success") {
      onLogin(res.data.data.userInfo, res.data.data.token);
      history.push("/board");
    }
  };

  const handleGoogleSuccess = async (res) => {
        const response = await axios.get('http://localhost:4000/auth/google',{
            headers: {access_token: res.accessToken},
        });


        if(response.data.status === 'success') {
            onLogin(response.data.data.userInfo, response.data.data.token);
            history.push("/board");
        }
  }

  const handleGoogleFail = (res) => {
        console.log(res);
  }

  const handleFacebookSuccess = async (res) => {
      const response = await axios.get('http://localhost:4000/auth/facebook',{
      headers: {Authorization: 'Bearer ' + res.accessToken},
  });


  if(response.data.status === 'success') {
      onLogin(response.data.data.userInfo, response.data.data.token);
      history.push("/board");
  }
  }

  return (
    <div className="container">
      <div className="div-form">
        <Title style={{textAlign:'center'}} type="secondary">LOGIN FORM</Title>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>

            <div className='login'>
            <GoogleLogin
            className='google-login'
            clientId="1080961497722-sb2qum750db69h21f0l2hsfjdmofp37n.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFail}
            cookiePolicy={'single_host_origin'}/>

          <FacebookLogin
            className='facebook-login'
            appId="394562644997701"
            autoLoad={true}
            fields="name,email,picture"
            callback={handleFacebookSuccess} />
            </div>

            <Link className='register-link' to="/signup">Or register now!</Link>
            
            
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

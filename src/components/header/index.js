import React from 'react';
import { Layout, Typography } from 'antd';
import './style.scss';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header:AntdHeader} = Layout;

const Header = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/edituser'>
          Edit Info
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/login'>
          Log Out
        </Link>
      </Menu.Item>
    </Menu>
  );
    return (
      <AntdHeader className='antd-header'>
          <Title type='danger' className='logo'>FunRetro</Title>
          {/* <div className='user-info'>
            <FaUserCog/>
            <lable className='user-name'>Đỗ Tấn Tài</lable>
          </div> */}

  <Dropdown overlay={menu}>
    <div className="ant-dropdown-link" >
       {JSON.parse(localStorage.getItem('userInfo')).userName}
       
       <Avatar shape="square" size="small" icon={<UserOutlined />} />

    </div>
  </Dropdown>
          
      </AntdHeader>
    )
}
export default Header

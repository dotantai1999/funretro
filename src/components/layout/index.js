import React from 'react';
import {Layout as LayoutAntd} from 'antd';
import Header from '../header';
import Footer from '../footer';
import './style.scss';

const {Content} = LayoutAntd;
const Layout = (props) => {
    return (
        <LayoutAntd>
            <Header/>
            <Content className='content'>
                {props.children}
            </Content>
            <Footer/>
        </LayoutAntd>
    )
}

export default Layout;


import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import Layout from '../layout';

const PrivatedRoute = ({component:Component, ...rest}) => {
    const {auth} = useAuthContext();
    return (
        <Layout>
        <Route 
        {...rest}
        render={(props) => {
            return auth ? <Component {...props}/> : <Redirect to='/login'/>
        }}
        
        />
        </Layout>
    )
}

export default PrivatedRoute

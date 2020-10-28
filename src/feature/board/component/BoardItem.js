import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import 'antd/dist/antd.css';

BoardItem.propTypes = {
    id : PropTypes.number,
    name : PropTypes.string,
    created_date: PropTypes.string
};

BoardItem.defaultProps = {
    id : -1,
    name : '',
    created_date: ''
}

function BoardItem(props) {
    const {name, created_date} = props;

    return (
        <div className="site-card-border-less-wrapper">
        <Card title={name} bordered={false} style={{ width: 300 }}>
            <p>{created_date}</p>
        </Card>
      </div>
    );
}

export default BoardItem;
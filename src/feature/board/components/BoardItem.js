import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Title from 'antd/lib/skeleton/Title';

BoardItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    created_date: PropTypes.string
};

BoardItem.defaultProps = {
    id: -1,
    name: '',
    created_date: ''
}

function BoardItem(props) {
    const { name, created_date } = props;

    return (
        <div>
            <Title>Board List</Title>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={name}
                    bordered={false}
                    style={{ width: 300 }}
                    actions={[
                        <EditFilled key='edit' />,
                        <DeleteFilled key='delete' />]}
                >
                    <p>{created_date}</p>
                </Card>
            </div>
        </div>
    );
}

export default BoardItem;
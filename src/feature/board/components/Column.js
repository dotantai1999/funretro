import Title from 'antd/lib/skeleton/Title';
import React from 'react';
import { Label, Button, Modal, Input, Card, Space } from 'antd';
import { EditOutlined, DeleteOutlined, BarsOutlined, FileDoneOutlined } from '@ant-design/icons';

const Column = () => {
    return (
        <div>
            <label>Column Name</label>
            <br />
            <Button>Add Card To Column</Button>
            <Card
                title="Card Title"
                bordered={false}
                style={{ width: 300 }}
                actions={[
                    <EditOutlined
                        key='edit'
                    />,
                    <DeleteOutlined
                        key='delete'
                    />,

                    <FileDoneOutlined
                        key='view'

                    />
                ]}
            >
                <p>Content</p>
            </Card>

            <Card
                title="Card Title"
                bordered={false}
                style={{ width: 300 }}
                actions={[
                    <EditOutlined
                        key='edit'
                    />,
                    <DeleteOutlined
                        key='delete'
                    />,

                    <FileDoneOutlined
                        key='view'

                    />
                ]}
            >
                <p>Content</p>
            </Card>

            <Card
                title="Card Title"
                bordered={false}
                style={{ width: 300 }}
                actions={[
                    <EditOutlined
                        key='edit'
                    />,
                    <DeleteOutlined
                        key='delete'
                    />,

                    <FileDoneOutlined
                        key='view'

                    />
                ]}
            >
                <p>Content</p>
            </Card>

        </div>
    );
}

export default Column;
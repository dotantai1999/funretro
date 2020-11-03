import Title from 'antd/lib/skeleton/Title';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Card, Space } from 'antd';
import { EditOutlined, DeleteOutlined, BarsOutlined, FileDoneOutlined } from '@ant-design/icons';

const Column = () => {

    let listCardDemo = [
        {
            id: 1,
            content: 'content1'
        },

        {
            id: 2,
            content: 'content2'
        },

        {
            id: 3,
            content: 'content3'
        },
    ];

    const [listCard, setListCard] = useState([]);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setListCard(listCardDemo);
    }, []);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (isEdit) {
            console.log("Call Edit API");
        } else {
            setListCard([...listCard, { id: Math.random(), content: `${Math.random()}` }]);
            console.log("Call Add API");
        }

        setIsEdit(false);
        setVisible(false);

    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleAddCard = () => {
        showModal();
        setContent('');
    }

    const handleChange = (e) => {
        if (e.target.name === 'content') {
            setContent(e.target.value);
        }

        return;
    }

    const handleEdit = (cardId) => {
        setVisible(true);
        const editContent = listCard.find(e => e.id === cardId).content;
        setContent(editContent);
        setIsEdit(true);
    }

    const handleDelete = (cardId) => {
        console.log("Delete Card");

        // Call API Delete

        //Dummy code
        const result = listCard.splice(1, listCard.findIndex(i => i.id === cardId));

        setListCard(result);
    }


    return (
        <div>
            <label>Column Name</label>
            <br />
            <Button onClick={handleAddCard}>Add Card To Column</Button>
            {listCard.map((card) => {
                return (
                    <Card
                        bordered={false}
                        style={{ width: 300 }}
                        actions={[
                            <EditOutlined
                                key='edit'
                                onClick={() => handleEdit(card.id)}
                            />,
                            <DeleteOutlined
                                key='delete'
                                onClick={() => handleDelete(card.id)}
                            />

                        ]}
                    >
                        <p>{card.content}</p>
                    </Card>)
            })};

            <Modal
                title="Add Card"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="Card Content" name="content" value={content} onChange={handleChange} />

            </Modal>



        </div>
    );
}

export default Column;
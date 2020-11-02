import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Input, Card, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';


const ListBoard = () => {
    const [listBoard, setListBoard] = useState([]);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");

    const listBoardItem = [
        {
            id: 1,
            name: 'name1',
            created_date: '12/10/2020'
        },

        {
            id: 2,
            name: 'name2',
            created_date: '12/10/2020'
        },

        {
            id: 3,
            name: 'name3',
            created_date: '12/10/2020'
        }

    ];

    useEffect(() => {
        setListBoard(listBoardItem);
    }, []);




    // useEffect(() => {
    //     async function fetchBoardList() {
    //         const result = await axios.get('https://dotantai-api-funretro.herokuapp.com/boards');
    //         console.log(result.data);
    //         setListBoard(result.data);
    //     }

    //     fetchBoardList();
    // }, [])

    const handleAddBoard = () => {
        showModal();
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        //Call API add board

        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
    }

    return (
        <div>
            <Space size='large'>
                {listBoard.map((board, index) => {
                return (
                        <Card
                            key={index}
                            title={board.name}
                            bordered={false}
                            style={{ width: 300 }}
                            actions={[
                                <EditFilled key='edit' />,
                                <DeleteFilled key='delete' />]}
                        >
                            <p>{board.created_date}</p>
                        </Card>
                    )
                })}
            </Space>
            <Button onClick={handleAddBoard}>Thêm</Button>
            <Modal
                title="Add Board"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="Board Name" name="name" value={name} onChange={handleChange} />

            </Modal>
        </div>

    );
}

export default ListBoard;
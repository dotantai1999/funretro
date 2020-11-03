import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Input, Card, Space } from 'antd';
import { EditOutlined, DeleteOutlined, BarsOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


const ListBoard = () => {
    const [listBoard, setListBoard] = useState([]);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const history = useHistory();

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
        setName("");
        showModal();
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (isEdit) {
            console.log("Call Edit API");

        } else {
            console.log("Call Add API");
        }
        setIsEdit(false);
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

    const handleEdit = (boardId) => {
        setVisible(true);
        const editName = listBoard.filter((board) => { return board.id === boardId }).map((board) => board.name);
        setName(editName);
        setIsEdit(true);
    }

    const handleDelete = (boardId) => {
        console.log("Delete Board");

        // Call API Delete

        //Dummy code
        const result = listBoard.splice(1, boardId - 1);

        setListBoard(result);
    }

    const handleViewDetail = (boardId) => {
        console.log(boardId);
        history.push(`/board/${boardId}`);
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
                                <EditOutlined
                                    key='edit'
                                    onClick={() => handleEdit(board.id)} />,
                                <DeleteOutlined
                                    key='delete'
                                    onClick={() => handleDelete(board.id)} />,

                                <BarsOutlined
                                    key='view'
                                    onClick={() => handleViewDetail(board.id)}
                                />
                            ]}
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
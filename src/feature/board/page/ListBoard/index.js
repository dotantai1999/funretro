import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Input, Card, Space } from 'antd';
import { EditOutlined, DeleteOutlined, BarsOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './style.scss';

const ListBoard = () => {
    const [listBoard, setListBoard] = useState([]);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [name, setName] = useState('');
    const [boardId, setBoardId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function fetchBoardList() {
            const result = await axios.get('http://localhost:4000/boards/',{
                headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
            });
            setListBoard(result.data.data.boardList);
        }

        fetchBoardList();
    }, []);

    // ADD
    const handleAddBoard = () => {
        setVisibleAdd(true);
    };

    const handleAddOk = async () => {
        const result = await axios.post('http://localhost:4000/boards/', {
            boardName: name,
        },{
            headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
        });

        history.push(`/board/${result.data.data.boardInfo.boardId}`);
        setVisibleAdd(false);
    };

    const handleAddCancel = () => {
        setName('');
        setVisibleAdd(false);
    };

    // EDIT
    const handleEdit = (boardId) => {
        setVisibleEdit(true);
        const editName = listBoard
            .filter((board) => {
                return board.boardId === boardId;
            })
            .map((board) => board.boardName);
        setName(editName);
        setBoardId(boardId);
    };

    const handleEditOk = async () => {
        const result = await axios.patch(`http://localhost:4000/boards/${boardId}`, {
            userId: 1,
            boardName: name,
        },{
            headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
        });
    const updatedListBoard = listBoard.map((board) => {
            if(board.boardId === boardId) {
                return result.data.data.boardInfo;
            }
            return board;
            } );    
        setVisibleEdit(false);
        setListBoard(updatedListBoard);
        setName('');
    };

    const handleEditCancel = () => {
        setName('');
        setVisibleEdit(false);
    };

    //
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
    };

    const handleDelete = async (boardId) => {
        const result = await axios.delete(`http://localhost:4000/boards/${boardId}`, {
            headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
        });

        setListBoard(listBoard.filter((board) => board.boardId !== +result.data.data.boardId));
    };

    const handleViewDetail = (boardId) => {
        history.push(`/board/${boardId}`);
    };

    return (
        <div>           
            
            <div className='container-listboard'>
            <Button className='button-add-board' type='primary' onClick={handleAddBoard}>Thêm</Button>           
            </div>

            <Space size='large'>
                {listBoard &&
                    listBoard.map((board, index) => {
                        return (
                            <Card
                                className='board-item'
                                style={{backgroundColor: '#EEE', width: 300}}
                                hoverable
                                key={index}
                                bordered={false}
                                actions={[
                                    <EditOutlined
                                        key='edit'
                                        onClick={() => handleEdit(board.boardId)}
                                    />,
                                    <DeleteOutlined
                                        key='delete'
                                        onClick={() => handleDelete(board.boardId)}
                                    />,

                                    <BarsOutlined
                                        key='view'
                                        onClick={() => handleViewDetail(board.boardId)}
                                    />,
                                ]}
                            >
                                {board.boardName}
                            </Card>
                        );
                    })}
            </Space>

            <Modal
                title={'Add Board'}
                visible={visibleAdd}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
            >
                <Input placeholder='Board Name' name='name' value={name} onChange={handleChange} />
            </Modal>
            <Modal
                title={'Edit Board'}
                visible={visibleEdit}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
            >
                <Input placeholder='Board Name' name='name' value={name} onChange={handleChange} />
            </Modal>
            
        </div>
    );
};

export default ListBoard;

import { Col, Input, Row, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Column from '../../../../feature/board/components/Column';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRouteMatch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import deepClone from '../../../../utils/deepClone';
import axios from 'axios';

const { Title } = Typography;


let socket;

const BoardDetail = () => {
    const match = useRouteMatch();
    const { boardId } = match.params;
    const [boardInfo, setBoardInfo] = useState();
    const [columnList, setColumnList] = useState([]);

    const [visible, setVisible] = useState(false);
    const [cardContent, setCardContent] = useState('');
    const [selectedCardId, setSelectedCardId] = useState();
    const [selectedColumnPos, setSelectedColumnPos] = useState();
    const [isEdit, setIsEdit] = useState(false);

    console.log('OUTPUT: columnList', columnList);

    useEffect(() => {
        const fetchData = async () => {
            const boardRes = await axios.get(`https://dotantai-api-funretro.herokuapp.com/boards/${boardId}`, {
                headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
            });
            if (boardRes.data.status === 'success') {
                setBoardInfo(boardRes.data.data.boardInfo);
            }
        };

        fetchData();

        socket = socketIOClient('https://dotantai-api-funretro.herokuapp.com/', {
            transports: ['websocket', 'polling', 'flashsocket'],
        });
        socket.emit('joinBoard', { boardId });
        socket.emit('initialData', { boardId });
        socket.on('getData', (res) => {
            console.log(res);
            setColumnList(res.columnList);
        });
        socket.on('changeData', (res) => {
            socket.emit('initialData', { boardId });
        });
        
    }, [boardId]);

    const handleOnDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        console.log(result);
        const updatedColumnList = deepClone(columnList);

        if (destination.droppableId === source.droppableId) {
            const selectedColumn = updatedColumnList.filter(
                (column) => column.columnInfo.columnName === destination.droppableId
            )[0];
            const updatedCardList = selectedColumn.cardList;
            const updatedCard = updatedCardList[source.index];
            updatedCardList.splice(source.index, 1);
            updatedCardList.splice(destination.index, 0, updatedCard);
            setColumnList(updatedColumnList);

            const payload =
                source.index <= destination.index
                    ? {
                          columnId: selectedColumn.columnInfo.columnId,
                          positionFrom: source.index + 1,
                          positionTo: destination.index + 1,
                          operation: 'minus',
                          cardId: updatedCard.cardId,
                          boardId,
                      }
                    : {
                          columnId: selectedColumn.columnInfo.columnId,
                          positionFrom: destination.index + 1,
                          positionTo: source.index + 1,
                          operation: 'plus',
                          cardId: updatedCard.cardId,
                          boardId,
                      };
            // const res = await axios.patch(`/cards/updatePositionInOneCol`, payload);
            // if (res.data.status === 'success') {
            // }
            socket.emit('updatePositionInOneCol', payload);
        } else {
            // remove card source column
            const sourceColumn = updatedColumnList.filter(
                (column) => column.columnInfo.columnName === source.droppableId
            )[0];
            const updatedCard = sourceColumn.cardList[source.index];
            sourceColumn.cardList.splice(source.index, 1);

            const srcColumnPayload = {
                columnId: sourceColumn.columnInfo.columnId,
                positionFrom: source.index + 1,
                positionTo: sourceColumn.cardList.length + 1,
                operation: 'minus',
            };
            // add card destinaton column
            const destinationColumn = updatedColumnList.filter(
                (column) => column.columnInfo.columnName === destination.droppableId
            )[0];
            destinationColumn.cardList.splice(destination.index, 0, updatedCard);
            setColumnList(updatedColumnList);

            const destColumnPayload = {
                columnId: destinationColumn.columnInfo.columnId,
                positionFrom: destination.index + 1,
                positionTo: destinationColumn.cardList.length,
                operation: 'plus',
            };

            socket.emit('updatePositionInMultipleCol', {
                sourceColumn: srcColumnPayload,
                destColumn: destColumnPayload,
                cardId: updatedCard.cardId,
                boardId,
            });
        }
    };

    const handleAddClick = (columnPos) => {
        setVisible(true);
        setSelectedColumnPos(columnPos);
    };

    const handleEditClick = (cardId, columnPos) => {
        setVisible(true);
        setIsEdit(true);
        setSelectedCardId(cardId);
        setSelectedColumnPos(columnPos);
        setCardContent(
            columnList[columnPos].cardList.filter((card) => card.cardId === cardId)[0]
                .cardContent
        );
    };

    const handleOk = async () => {
        if (isEdit) {
            console.log('edit');
            socket.emit('editCard', { cardId: selectedCardId, cardContent, boardId });
            setCardContent('');
            setVisible(false);
            setIsEdit(false);
        } else {
                   socket.emit('addCard', {
                cardContent,
                columnId: columnList[selectedColumnPos].columnInfo.columnId,
                position: columnList[selectedColumnPos].cardList.length + 1,
                boardId,
            });
            setCardContent('');
            setVisible(false);
        }
    };

    const handleCancel = () => {
        setCardContent('');
        setVisible(false);
        setIsEdit(false);
    };

    const handleDelete = async (cardId, columnPos) => {
        
        socket.emit('deleteCard', { cardId, boardId });
    };

    const handleChange = (e) => {
        if (e.target.name === 'cardContent') {
            setCardContent(e.target.value);
        }
    };

    return (
        <div style={{ height: '90vh', textAlign: 'center' }}>
            <Title style={{ paddingTop: 10 , color:'red'}} level={2}>
                {boardInfo?.boardName}
            </Title>
            <Row>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {columnList?.map(({ columnInfo, cardList }, index) => (
                        <Col span={8} key={columnInfo.columnId}>
                            <Column
                                columnInfo={columnInfo}
                                columnPos={index}
                                cardList={cardList}
                                onAddClick={handleAddClick}
                                onEditClick={handleEditClick}
                                onDelete={handleDelete}
                            />
                        </Col>
                    ))}
                </DragDropContext>
            </Row>
            <Modal
                title={isEdit ? 'Edit Card' : 'Add Card'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    placeholder='Card Content'
                    name='cardContent'
                    value={cardContent}
                    onChange={handleChange}
                />
            </Modal>
        </div>
    );
};

export default BoardDetail;

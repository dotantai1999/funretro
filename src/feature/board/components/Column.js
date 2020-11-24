// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Input, Card, Space } from 'antd';
// import { EditOutlined, DeleteOutlined, BarsOutlined, FileDoneOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import './Column.scss';

// const Column = ({ col }) => {
//     const [listCard, setListCard] = useState([]);
//     const [visibleAdd, setVisibleAdd] = useState(false);
//     const [visibleEdit, setVisibleEdit] = useState(false);
//     const [content, setContent] = useState('');
//     const [cardId, setCardId] = useState(null);

//     useEffect(() => {
//         const fetchCards = async () => {
//             console.log(col);
//             const result = await axios.get('http://localhost:4000/columns/' + col.columnId);
//             setListCard(result.data.data.cardList);
//         };
//         fetchCards();
//     }, []);

//     // ADD
//     const handleAddCard = () => {
//         setVisibleAdd(true);
//     };

//     const handleAddOk = async () => {
//         const result = await axios.post('http://localhost:4000/cards/', {
//             columnId: col.columnId,
//             cardContent: content,
//         });

//         console.log(result);

//         setListCard([...listCard, result.data.data.cardInfo]);
//         setContent('');
//         setVisibleAdd(false);
//     };

//     const handleAddCancel = () => {
//         setContent('');
//         setVisibleAdd(false);
//     };

//     // EDIT
//     const handleEdit = (cardId) => {
//         console.log(cardId);
//         setVisibleEdit(true);
//         const editContent = listCard.filter((card) => {
//             return card.cardId == cardId;
//         })[0].cardContent;
//         console.log(editContent);
//         setContent(editContent);
//         setCardId(cardId);
//     };

//     const handleEditOk = async () => {
//         const result = await axios.patch(`http://localhost:4000/cards/${cardId}`, {
//             columnId: col.columnId,
//             cardContent: content,
//         });

//         const updatedListCard = listCard.map((card) => {
//             if (card.cardId === cardId) {
//                 return result.data.data.cardInfo;
//             }
//             return card;
//         });

//         setListCard(updatedListCard);
//         setContent('');
//         setVisibleEdit(false);
//     };

//     const handleEditCancel = () => {
//         setContent('');
//         setVisibleEdit(false);
//     };

//     const handleChange = (e) => {
//         if (e.target.name === 'content') {
//             setContent(e.target.value);
//         }
//     };

//     const handleDelete = async (cardId) => {
//         const result = await axios.delete(`http://localhost:4000/cards/${cardId}`, {
//             userId: 1,
//         });

//         setListCard(listCard.filter((card) => card.cardId !== cardId));
//     };

//     return (
//         <div style={{textAlign: 'center'}}>
//             <div className='column-name'>
//             <label style={{color: 'blue', fontWeight: 'bold'}}>{col.columnName}</label>
//             </div>
            
//             <br />
//             <br />
//             <Button type='primary' onClick={handleAddCard}>Add Card</Button>
//             <br/>
//             <br />
//             {listCard &&
//                 listCard.map((card) => {
//                     return (
//                         <Card
//                             style={{backgroundColor:'#EEE', width: 300, margin: '10px auto'}}
//                             hoverable
//                             key={card.cardId}
//                             bordered={false}
//                             actions={[
//                                 <EditOutlined key='edit' onClick={() => handleEdit(card.cardId)} />,
//                                 <DeleteOutlined
//                                     key='delete'
//                                     onClick={() => handleDelete(card.cardId)}
//                                 />,
//                             ]}
//                         >
//                             <p>{card.cardContent}</p>
//                         </Card>
//                     );
//                 })}
//             <Modal
//                 title='Add Card'
//                 visible={visibleAdd}
//                 onOk={handleAddOk}
//                 onCancel={handleAddCancel}
//             >
//                 <Input
//                     placeholder='Card Content'
//                     name='content'
//                     value={content}
//                     onChange={handleChange}
//                 />
//             </Modal>
//             <Modal
//                 title='Edit Card'
//                 visible={visibleEdit}
//                 onOk={handleEditOk}
//                 onCancel={handleEditCancel}
//             >
//                 <Input
//                     placeholder='Card Content'
//                     name='content'
//                     value={content}
//                     onChange={handleChange}
//                 />
//             </Modal>
            
//         </div>
//     );
// };

// export default Column;


import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const { Title } = Typography;

const Column = ({
    columnInfo,
    columnPos,
    cardList,
    onAddClick,
    onEditClick,
    onDelete,
}) => {
   
    return (
        <>
            <Title style={{color:'red', fontFamily:'-moz-initial'}} level={4}>{columnInfo?.columnName}</Title>
            <Button
                type='danger'
                style={{ display: 'block', margin: '10px auto' }}
                onClick={() => onAddClick(columnPos)}
            >
                Add Card{' '}
            </Button>
            <Droppable droppableId={columnInfo.columnName}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Space direction='vertical'>
                            {cardList?.map((card, index) => (
                                <Draggable
                                    key={card.cardId}
                                    draggableId={card.cardId.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <Card
                                                style={{ width: 280, backgroundColor: '#B5DDD1' }}
                                                key={card.cardId}
                                                hoverable
                                                actions={[
                                                    <EditOutlined
                                                        onClick={() =>
                                                            onEditClick(card.cardId, columnPos)
                                                        }
                                                        key='edit'
                                                    />,
                                                    <DeleteOutlined
                                                        onClick={() =>
                                                            onDelete(card.cardId, columnPos)
                                                        }
                                                    />,
                                                ]}
                                            >
                                                {' '}
                                                {card.cardContent}{' '}
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </Space>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default Column;

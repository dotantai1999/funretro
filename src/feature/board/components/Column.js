import { Button, Card, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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

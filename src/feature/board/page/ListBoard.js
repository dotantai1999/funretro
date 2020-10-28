import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BoardItem from '../component/BoardItem';



function ListBoard(props) {
    const [listBoard, setListBoard] = useState([]);
    const listBoardItem = listBoard.map((board, index) => {
        return <li key={index}><BoardItem id={board.board_id} name={board.board_name} created_date={board.created_date} /></li>
    });

    useEffect(() => {
        async function fetchBoardList() {
            const result = await axios.get('http://localhost:3001/boards');
            console.log(result.data);
            setListBoard(result.data);
        }

        fetchBoardList();
    },[])

    return (
        <ul>
            {listBoardItem}
        </ul>
    );
}

export default ListBoard;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Column from '../../components/Column';

const BoardDetail = ({ match }) => {
    const [boardInfo, setBoardInfo] = useState({});
    console.log(match);
    const { boardId } = match.params;

    useEffect(() => {
        const fetchBoardInfo = async () => {
            const res = await axios.get('http://localhost:7000/boards/' + boardId);

            if (res.data.status === 'success') {
                console.log(res.data.data);
                setBoardInfo(res.data.data.board);
            }
        };
        fetchBoardInfo();
    }, []);

    return (
        <div>
            <label>Board Name</label>
            {boardInfo.columns && boardInfo.columns.map((col, id) => <Column key={id} col={col} />)}
        </div>
    );
};

export default BoardDetail;

import React from 'react';
import Column from '../../components/Column'


const BoardDetail = (args) => {
    console.log(args);
    return (
        <div>
            <label>Board Name</label>
            <Column />
            <Column />
            <Column />
        </div>
    );
}

export default BoardDetail;
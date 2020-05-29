import React from 'react'
import { useParams, Redirect } from 'react-router-dom';
import actions from './actions'
import { useDispatch } from 'react-redux';

function Task() {
    const dispatch = useDispatch();
    let { boardId, taskId } = useParams();
    dispatch(actions.doSelectTask(taskId));
    return <Redirect to={`/b/${boardId}`} />;
}

export default Task;

import React, { useState } from 'react'
import { Input, Button } from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import * as constant from './constant'
import selector from './selector'

export default function Board() {
    const [value, setValue] = useState('')
    const naem = useSelector(selector.selectName)
    const dispatch = useDispatch()
    const handleClick = ()=>{
        console.log(value)
        dispatch({
            type: constant.BOARD_CREATE,
            payload: value
        })
    }
    return (
        <div>
            this is board page
            <Input onChange={e=>setValue(e.target.value)}/>
            <Button onClick={handleClick}>Change</Button>
    <p>{naem}</p>
    <Button><Link to="/">Go to Home Page</Link></Button>
        </div>
    )
}

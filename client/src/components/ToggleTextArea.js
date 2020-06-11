import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function TextAreaInput({value, onBlur}) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef();
    const handleBlur = () => {
        // call api
        setIsEditing(false);
        onBlur(inputValue);
    };
    const onEdit = () => {
        setInputValue(value);
        setIsEditing(!isEditing)
        if(inputRef.current) inputRef.current.focus();
    }
    const checkValue = () => {
        if(!value){
            return "Task hiện không có mô tả. Hãy thêm mô tả!"
        }else{
            return value;
        }
    }
    useEffect(() => {
        setInputValue(value);
    },[])

    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    return (
        <div>
            {!isEditing ? (
                <p onClick={onEdit}>{checkValue()}</p>
            ) : (
                <TextArea
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Thêm mô tả chi tiết hơn..."
                    autoFocus={true}
                    value={inputValue}
                    onBlur={handleBlur}
                    onFocus={moveCaretAtEnd}
                />
            )}
        </div>  
    )
}

export default TextAreaInput

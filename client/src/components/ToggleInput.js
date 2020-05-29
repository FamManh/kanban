import React, { useState, useRef, useEffect } from "react";
import { Input } from "antd";
function ToggleInput({ value, onLostFocus, onBlur }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef();
    const handleBlur = () => {
        // call api
        setIsEditing(false);
        onBlur(inputValue);
    };

    const onEdit = ()=>{
        setIsEditing(!isEditing)
        if(inputRef.current) inputRef.current.focus();
    }
    useEffect(() => {
        setInputValue(value);
    }, [])
  
    return (
        <div>
            {!isEditing ? (
                <p onClick={onEdit}>{value}</p>
            ) : (
                <Input
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        border: "0px",
                        outline: "none",
                    }}
                    autoFocus={true}
                    defaultValue={value}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
}

export default ToggleInput;

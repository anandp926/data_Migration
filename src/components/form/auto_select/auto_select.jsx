import React from 'react'
import { Select } from 'antd';

const select = (props) => {
    return (
        <Select
            showSearch
            className={props.classValue}
            placeholder={props.placeholder}
            optionFilterProp="children"
            onChange={props.onSelect}
            size="large"
            required={props.isRequired ? props.isRequired : false}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            {...props}
        >
            {props.children}
        </Select>

    )
}

export default select
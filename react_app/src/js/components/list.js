import React from "react";
import { connect } from "react-redux";

const select = state => {
    return {devices: state.devices };
};

const ConnectedList = ({devices}) => (
    <ul>
        {devices.map(el => (
            <li key={el.id}> 
                {el.device_name}
            </li>
        ))}
    </ul>
);

const List = connect(select)(ConnectedList);


export default List;

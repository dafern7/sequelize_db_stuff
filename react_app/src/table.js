import React from 'react';


const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Device</th>
                <th>Password</th>
            </tr>
        </thead>
    )
}

const TableBody = props => {
    const rows = props.characterData.map((row,index) => {
        return (
            <tr key={index}>
                <td> {row.Device}</td>
                <td>{row.Password}</td>
                <td>
                    <button onClick={()=> props.removeChar(index)}>Delete</button>
                </td>
            </tr>
        ) 
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {
    const { characterData, removeChar } = props
    return (
        <table>
            <TableHeader />
            <TableBody characterData = {characterData} removeChar = {removeChar} />
        </table>
    )
}


export default Table
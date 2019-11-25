import React from 'react';

const Participant = (props) => {
    
    return (
        <label htmlFor={props.name}>
            <input
                type="checkbox"
                name={props.name}
                value={props.name}
                id={props.name}
                onChange={()=>props.handleChecked(props.name)}
                checked={props.participating}/>
                {props.name}
        </label>
    );
}
        
export default Participant;
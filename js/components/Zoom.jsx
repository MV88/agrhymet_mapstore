import React from 'react';

export default function Zoom(props = {}) {
    return (<><button onClick={() => {
        props.onChangeZoom(3);
    }} >zoom to level 3</button> <br/></>);
}

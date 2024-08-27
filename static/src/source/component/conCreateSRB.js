import React,{ useState } from "react";

export const ContanerCreateSRB = ({component, capacityName, capacityAmount, handleSubmit}) => {
    const [ isShelf, setIsShelf ] = useState(false);
    const [ isRow, setIsRow ] = useState(false);
    const [ isBlock, setIsBlock ] = useState(false);

    // if (component === "Shelf") {
    //     setIsShelf(true);
    // } else if (component === "Row") {
    //     setIsRow(true);
    // } else if (component === "Blok") {
    //     setIsBlock(true);
    // }

    const style = {
        container: {
            position: 'absolute', 
            transform: 'translateX(-50%)',
            left: '50%',
            alignItems: 'center', 
            textAlign: 'center', 
            top:'10%', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '25px 70px', 
            zIndex: '9999',
            ...( component === "Shelf" ? {border: '3px solid  red'}:{}),
            ...( component === "Row" ? {border: '3px solid #32CD32'}:{}),
            ...( component === "Blok" ? {border: '3px solid #9400D3'}:{}),
            boxShadow: '2px 4px 2px 0 rgb(0,0,0,0.5)'
        },
        input : {
            ...( component === "Shelf" ? {border: '1px solid red'}:{}), 
            ...( component === "Row" ? {border: '1px solid #32CD32'}:{}),
            ...( component === "Blok" ? {border: '1px solid #9400D3'}:{}),
            height: '35px', 
            borderRadius: '2px', 
            outline: 'none',
            width: '250px',
            backgroundColor: 'rgb(0,0,0,0.1)',
            margin: '10px 0 2px 0',
        },
        button: {
            outline: 'none', 
            border: 'none', 
            borderRadius: '5px', 
            padding: '7px 25px', 
            marginTop: '15px', 
            color: 'white',
            ...(component === "Shelf" ? {backgroundColor: 'red'}:{}), 
            ...(component === "Row" ? {backgroundColor: '#32CD32'}:{}),
            ...(component === "Blok" ? {backgroundColor: '#9400D3'}: {})
        }
    }
    return (
        <div style={style.container}>
                <h3>Create {component}</h3>
                <div  style={{ textAlign: 'start', marginTop: '30px'}}>
                    <h5>Capacity {capacityName}</h5>
                    <input type="number" required onChange={capacityAmount} style={style.input}/>
                    <p style={{fontFamily: 'emoji', fontSize: '15px', color: 'rgb(0,0,0,0.5)'}}>Please Fill Field This</p>
                </div>
                <button onClick={handleSubmit} type="button" style={style.button}>Submit</button>
        </div>
    )
}
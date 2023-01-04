import React, { useState } from 'react'

const Item = (props) => {
    const [strike, setStrike] = useState(false)
    

    function handleStrike() {
        if (strike)
            setStrike(false)
        else
            setStrike(true)
    }

    return (
        <div className='item-box'>
            <input type='checkbox' onClick={handleStrike} />
            <label className={strike ? 'strike' : null}>{props.value}</label>
        </div>
    )
}

export default Item
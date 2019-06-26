import React from 'react'

const Button = ({buttonText, clickHandler}) => (
    <div>
        <button onClick={e=>{clickHandler()}}>
            {buttonText}
        </button>
    </div>
)

export default Button
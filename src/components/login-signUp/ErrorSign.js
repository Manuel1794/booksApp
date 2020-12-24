import React from 'react'

const ErrorSign = ({errorLogin}) => {
    return (
        <div className="errorSign">
            <p>{errorLogin}</p>
        </div>
    )
}

export default ErrorSign

import React from "react"

type ResponseType = {
    response: string
}

export function ResponseBox({response}: ResponseType) {
    return (
        
        <div className="response-container">

            <p>{response}</p>

        </div>

    )
}
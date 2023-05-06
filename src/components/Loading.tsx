import React, { useState, useEffect } from "react"
import { ProgressBar } from "./ProgressBar"
import { FunFact } from "./FunFact"

type LoadingTypeProp = {
  message: string
}

export function Loading({ message }: LoadingTypeProp) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 1

        if (newValue === 100) {
          clearInterval(interval)
        }

        return newValue
      })
    }, 1000)
  }, [])

  return (
    <div className="loading-screen">
      <div className="loading-textbox">
        <h3>Hang tight</h3>
        <h5>{message}</h5>
        <p>This may take up to 2 minutes</p>
      </div>
      <ProgressBar value={value}></ProgressBar>
      <FunFact></FunFact>
    </div>
  )
}

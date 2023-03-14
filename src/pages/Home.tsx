import React, { useEffect, useRef, useState } from "react";
import { MyForm } from "../components/Form";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { ResponseBox } from "../components/ResponseBox";
import { TechnicalError } from "./Error";

export function Home() {

    const [loading, setLoading] = useState(false)
    const [errored, setErrored] = useState(false)

    // data to be sent
    const [data, setData] = useState({
        destination: "",
        days: "",
        includeCafes: false,
        includeRestaurants: false
      });

    const [response, setResponse] = useState("")
    const [copyButtonText, setCopyButtonText] = useState("Copy Plan")
    const [suggestions, setSuggestions] = useState([""])
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const responseBoxRef = useRef<HTMLInputElement>(null);

    if (errored) {

        return (
            <TechnicalError></TechnicalError>
        )
    }

    useEffect(() => {
        responseBoxRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [response])

    if (!loading) {

        return (

            <div className="home">
                <Header></Header>

                <MyForm 
                    data={data} 
                    setData={setData} 
                    setLoading={setLoading}
                    setResponse={setResponse}
                    setErrored={setErrored}
                    suggestions={suggestions}
                    setSuggestions={setSuggestions}
                    isButtonDisabled={isButtonDisabled}
                    setIsButtonDisabled={setIsButtonDisabled}
                ></MyForm>

                {
                    (response)?
                    
                    <div ref={responseBoxRef}>

                        <button className="btn" type="submit" onClick={() => {window.location.reload();}}>Start Over</button>

                        <ResponseBox response={response}></ResponseBox>
                        <button className="btn" onClick={() => {
                            navigator.clipboard.writeText(response);
                                setCopyButtonText("Copied")
                                setTimeout(() => setCopyButtonText("Copy Plan"), 1000)
                                }
                            }>
                            {copyButtonText}
                        </button>
                    </div>
                    :
                    ""
                }
                
            </div>

        )
    } else {

        return (
            <div>
                <Loading></Loading>
            </div>
        )
    }

}
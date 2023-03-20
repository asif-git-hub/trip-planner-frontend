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
        includeRestaurants: false,
        includeMuseums: false
      });

    const [response, setResponse] = useState("")

    const responseBoxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        responseBoxRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [response])

    if (errored) {

        return (
            <TechnicalError></TechnicalError>
        )
    }

    if (!loading) {

        if (!response) {

            return (
                <div className="home">
                    <Header></Header>

                    <MyForm 
                        data={data} 
                        setData={setData} 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        setErrored={setErrored}
                    ></MyForm>
                </div>
            )
        } else {

            return (
                <div className="response-window" ref={responseBoxRef}>

                    <button className="btn" type="submit" onClick={() => {window.location.reload();}}>Start Over</button>

                    <ResponseBox response={response}></ResponseBox>

                </div>
            )

        }

    } else {

        return (
            <div>
                <Loading destination={data.destination}></Loading>
            </div>
        )
    }

}
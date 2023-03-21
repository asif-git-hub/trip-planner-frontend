import React, { useState, useEffect  } from "react";
import { funfacts } from "../shared/data/funfacts";
import {FaQuestion, FaQuoteRight} from "react-icons/fa"
export function FunFact() {

    const [facts, setFacts] = useState(funfacts);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = facts.length - 1;

        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex) {
            setIndex(0)
        }
    }, [index, facts])

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 5000)

        return () => {
            clearInterval(slider)
        }
    }, [index]);

    return (
        <div className="facts">
            <div className="facts-container">
                {
                    facts.map((fact, id) => {

                        let position = 'nextFact'
                        if (id === index) {
                            position = 'activeFact'
                        }
                        if (id === index - 1 || 
                            (index === 0 && id === facts.length - 1)) {
                            position = 'lastFact'
                        }

                        return (
                            <article key={id} className={position}>
                                <p>Did you know <FaQuestion></FaQuestion></p>
                                <p>{fact}</p>
                                <FaQuoteRight className="quote-icon"></FaQuoteRight>
                            </article>
                        );
                    })
                }
            </div>

        </div>

    )

}
import React, { useState, useEffect  } from "react";
import { funfacts } from "../shared/data/funfacts";
import { FaQuoteRight, FaQuoteLeft } from 'react-icons/fa';
import { shuffleArray } from "../utils/common.utils";
export function FunFact() {

    
    const [facts] = useState(shuffleArray(funfacts));
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
                            <div key={id} className={`moving-container ${position}`}>
                                <FaQuoteLeft className="quote-icon"></FaQuoteLeft>
                                <p>{fact}</p>
                                <FaQuoteRight className="quote-icon"></FaQuoteRight>
                            </div>
                        );
                    })
                }
            </div>

        </div>

    )

}
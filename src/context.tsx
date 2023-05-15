import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { ItineraryRequestType } from './types/request.types';

export type AppContextType = {
    itineraryRequest: ItineraryRequestType
    setItineraryRequest: Dispatch<SetStateAction<ItineraryRequestType>>
}

const defaultState: AppContextType = {
    itineraryRequest: {
        destination: ""
    },
    setItineraryRequest: () => {}
}

export const AppContext = createContext<AppContextType>(defaultState)

export function AppProvider({children}: { children: React.ReactNode }) {

    const [itineraryRequest, setItineraryRequest] = useState<ItineraryRequestType>({
        destination: ""
    })

    return (
        <AppContext.Provider
            value={{
                itineraryRequest,
                setItineraryRequest
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
  };
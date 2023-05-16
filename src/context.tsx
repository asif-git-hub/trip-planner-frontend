import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { ItineraryRequestType } from "./types/request.types"
import { ItineraryResponseType } from "./types/response.types"
import { PhotoRetrieverResponseType } from "./api/photo.api"

export type AppContextType = {
  itineraryRequest: ItineraryRequestType
  setItineraryRequest: Dispatch<SetStateAction<ItineraryRequestType>>
  itineraryResponse: ItineraryResponseType | undefined
  setItineraryResponse: Dispatch<
    SetStateAction<ItineraryResponseType | undefined>
  >
  itineraryPagePhoto: PhotoRetrieverResponseType | undefined
  setItineraryPagePhoto: Dispatch<
    SetStateAction<PhotoRetrieverResponseType | undefined>
  >
  expandEditMenu: number | undefined
  setExpandEditMenu: Dispatch<SetStateAction<number | undefined>>
  expandEditMoveTo: number | undefined
  setExpandEditMoveTo: Dispatch<SetStateAction<number | undefined>>

  handleExpandEditMenuToggle: (id: number) => void
  handleExpandEditMoveToToggle: (id: number) => void
}

const defaultState: AppContextType = {
  itineraryRequest: {
    destination: "",
  },
  setItineraryRequest: () => {},
  itineraryResponse: undefined,
  setItineraryResponse: () => {},
  itineraryPagePhoto: undefined,
  setItineraryPagePhoto: () => {},
  expandEditMenu: undefined,
  setExpandEditMenu: () => {},
  expandEditMoveTo: undefined,
  setExpandEditMoveTo: () => {},
  handleExpandEditMenuToggle: (id: number) => {},
  handleExpandEditMoveToToggle: (id: number) => {},
}

export const AppContext = createContext<AppContextType>(defaultState)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [itineraryRequest, setItineraryRequest] =
    useState<ItineraryRequestType>({
      destination: "",
    })
  const [itineraryResponse, setItineraryResponse] = useState<
    ItineraryResponseType | undefined
  >(undefined)

  const [itineraryPagePhoto, setItineraryPagePhoto] =
    useState<PhotoRetrieverResponseType>()

  const [expandEditMenu, setExpandEditMenu] = useState<number | undefined>(
    undefined
  )
  const [expandEditMoveTo, setExpandEditMoveTo] = useState<number | undefined>(
    undefined
  )

  function handleExpandEditMenuToggle(id: number) {
    setExpandEditMenu(expandEditMenu !== id ? id : undefined)
  }

  function handleExpandEditMoveToToggle(id: number) {
    setExpandEditMoveTo(expandEditMoveTo !== id ? id : undefined)
  }

  return (
    <AppContext.Provider
      value={{
        itineraryRequest,
        setItineraryRequest,
        itineraryResponse,
        setItineraryResponse,
        itineraryPagePhoto,
        setItineraryPagePhoto,
        expandEditMenu,
        setExpandEditMenu,
        expandEditMoveTo,
        setExpandEditMoveTo,
        handleExpandEditMenuToggle,
        handleExpandEditMoveToToggle,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

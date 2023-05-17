import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { ItineraryRequestType } from "./types/request.types"
import { ActivityType, ItineraryResponseType } from "./types/response.types"
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
  expandDayEditMenu: number | undefined

  handleExpandEditMenuToggle: (id: number) => void
  handleExpandEditMoveToToggle: (id: number) => void
  handleExpandDayEditMenuToggle: (id: number) => void

  addActivityToDay: (addToIndex: number, activity: ActivityType) => void
  moveUp: (dayId: number, activityId: number) => void
  moveDown: (dayId: number, activityId: number) => void
  remove: (dayId: number, activityId: number) => void
  removeDay: (dayId: number) => void
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
  expandDayEditMenu: undefined,

  handleExpandEditMenuToggle: (id: number) => {},
  handleExpandEditMoveToToggle: (id: number) => {},
  handleExpandDayEditMenuToggle: (id: number) => {},

  addActivityToDay: (addToIndex: number, activity: ActivityType) => {},
  moveUp: () => {},
  moveDown: () => {},
  remove: () => {},
  removeDay: () => {},
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

  const [expandDayEditMenu, setExpandDayEditMenu] = useState<
    number | undefined
  >(undefined)

  function handleExpandEditMenuToggle(id: number) {
    setExpandEditMenu(expandEditMenu !== id ? id : undefined)
  }

  function handleExpandEditMoveToToggle(id: number) {
    setExpandEditMoveTo(expandEditMoveTo !== id ? id : undefined)
  }

  function handleExpandDayEditMenuToggle(id: number) {
    setExpandDayEditMenu(expandDayEditMenu !== id ? id : undefined)
  }

  function addActivityToDay(addToIndex: number, activity: ActivityType): void {
    if (itineraryResponse && itineraryResponse.length > 0) {
      let updatedItinerary: ItineraryResponseType = []
      Object.assign(updatedItinerary, itineraryResponse)
      updatedItinerary[addToIndex].activities =
        itineraryResponse[addToIndex].activities.concat(activity)

      setItineraryResponse(updatedItinerary)
    }
  }

  function moveUp(dayId: number, activityId: number) {
    let updatedItinerary: ItineraryResponseType = []
    Object.assign(updatedItinerary, itineraryResponse)

    if (
      activityId !== 0 &&
      itineraryResponse &&
      itineraryResponse.length > 0 &&
      itineraryResponse[dayId].activities.length > 1
    ) {
      const previousActivity =
        itineraryResponse[dayId].activities[activityId - 1] // Make copy
      updatedItinerary[dayId].activities[activityId - 1] =
        itineraryResponse[dayId].activities[activityId]

      updatedItinerary[dayId].activities[activityId] = previousActivity

      setItineraryResponse(updatedItinerary)
    }
  }

  function moveDown(dayId: number, activityId: number) {
    let updatedItinerary: ItineraryResponseType = []
    Object.assign(updatedItinerary, itineraryResponse)

    if (
      itineraryResponse &&
      itineraryResponse.length > 0 &&
      itineraryResponse[dayId].activities.length > 1 &&
      activityId !== itineraryResponse[dayId].activities.length - 1
    ) {
      const previousActivity =
        itineraryResponse[dayId].activities[activityId + 1] // Make copy

      updatedItinerary[dayId].activities[activityId + 1] =
        itineraryResponse[dayId].activities[activityId]

      updatedItinerary[dayId].activities[activityId] = previousActivity

      setItineraryResponse(updatedItinerary)
    }
  }

  function remove(dayId: number, activityId: number) {
    let updatedItinerary: ItineraryResponseType = []
    Object.assign(updatedItinerary, itineraryResponse)

    if (
      itineraryResponse &&
      itineraryResponse.length !== 0 &&
      itineraryResponse[dayId].activities.length !== 0
    ) {
      updatedItinerary[dayId].activities.splice(activityId, 1)
      setItineraryResponse(updatedItinerary)
    }
  }

  function removeDay(dayId: number) {
    let updatedItinerary: ItineraryResponseType = []
    Object.assign(updatedItinerary, itineraryResponse)

    if (itineraryResponse && itineraryResponse.length !== 0) {
      updatedItinerary.splice(dayId, 1)
      setItineraryResponse(updatedItinerary)
    }
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
        expandDayEditMenu,
        handleExpandEditMenuToggle,
        handleExpandEditMoveToToggle,
        handleExpandDayEditMenuToggle,
        addActivityToDay,
        moveUp,
        moveDown,
        remove,
        removeDay,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

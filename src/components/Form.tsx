import React, { Dispatch, SetStateAction} from "react";
import { HttpClient } from "../clients/http.client";
import { destinations } from "../shared/data/supported.destinations";
import { options } from "../data/options";
import { Option } from "./Option";

//TODO: delete later
function delay(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

export type DataType = {
  destination: string,
  days: string
  includeCafes: boolean,
  includeRestaurants: boolean,
  includeMuseums: boolean
}

type MyFormType = {
  data: DataType, 
  setData: Dispatch<React.SetStateAction<DataType>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setResponse: Dispatch<React.SetStateAction<string>>
  setErrored: Dispatch<React.SetStateAction<boolean>>
  suggestions: Array<string>
  setSuggestions: Dispatch<SetStateAction<Array<string>>>
  isButtonDisabled: boolean
  setIsButtonDisabled: Dispatch<React.SetStateAction<boolean>>
}

export function MyForm({
  data, 
  setData, 
  setLoading, 
  setResponse, 
  setErrored, 
  suggestions, 
  setSuggestions,
  isButtonDisabled,
  setIsButtonDisabled,
}: MyFormType) {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.name === "includeCafes" 
      || e.target.name === "includeRestaurants"
      || e.target.name === "includeMuseums") {

      if (e.target.value === "on") {
        setData({ ...data, [e.target.name]: !data[e.target.name] });
      }

    } else {

      if (e.target.name === "destination" && e.target.value.length > 2) {

        const filteredDestinations = destinations.filter((destination) => {
          return destination.includes(e.target.value)
        });

        setSuggestions(filteredDestinations)
        
      }

      setData({ ...data, [e.target.name]: e.target.value });

    }

  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

    e.preventDefault()

    try {
   
      setLoading(true)

      const baseUrl = `https://l5jeqqprnuq5rtydc52rire4oq0dnvvq.lambda-url.ap-southeast-2.on.aws`
      const url = `${baseUrl}?destination=${data.destination}&days=${data.days}&includeCafes=${data.includeCafes}&includeRestaurants=${data.includeRestaurants}&includeMuseums=${data.includeMuseums}`
      
      const httpClient = new HttpClient()

      const res = await httpClient.get(url)

      if (res) {
        setResponse(JSON.stringify(res.data))
        setLoading(false);
      }

    } catch (e) {
      // Catch all exceptions
      setErrored(true)
      setLoading(false)
      
    } finally {
      setIsButtonDisabled(true)
    }

  };

  return (
      <div>

      <form className="form" onSubmit={handleSubmit}>

        <div className="input-grid-section">

          <label>
              <input 
                  className="form-input form-row"
                  list="destinations"
                  id="destination"
                  type="text"
                  name="destination"
                  value={data.destination}
                  required={true}
                  placeholder="Enter city or country (Munich, Germany)"
                  autoComplete="true"
                  pattern={suggestions.join(",").replaceAll(",", "|")}
                  onChange={handleChange} 
                  />
                  <datalist className="datalist" id="destinations">
                    {
                      destinations.map((country, id) => {
                        return (<option key={id}>{country}</option>)
                      })
                    }
                  </datalist>
          </label>

          <label>
              <input className="form-input form-row"
                  id="days"
                  type="number"
                  name="days" 
                  required={true}
                  placeholder="How many days (maximum 6 days)"
                  min={1}
                  max={6}
                  onChange={handleChange} 
                  />
          </label>

          {
            options.map((option, id) => {

              return (
                <Option key={id} id={id} label={option.label} 
                name={option.name} 
                checked={data[option.name]}
                handleChange={handleChange}/>
              )

            })
          }

        </div>   

        <button className={isButtonDisabled? "btn-disabled": "btn"} type="submit" disabled={isButtonDisabled}>Start Planning</button>
      </form>

      </div>

    )
}
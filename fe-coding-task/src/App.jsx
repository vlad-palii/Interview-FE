import { useState, useEffect } from 'react'
import './App.css'
import SelectPropertyTypeComponent from './Components/SelectPropertyTypeComponent'
import SelectDateRangeComponent from './Components/SelectDateRangeComponent'
import ResultTable from './Components/ResultTable'
import Form from 'react-bootstrap/Form'

function App() {
  const [housingTypes, setHousingTypes] = useState({})
  const [dateRanges, setDateRanges] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedDate, setSelectedDate] = useState([])
  const [resultData, setResultData] = useState({})

  function handleHousingTypeClick(selectedValue) {
    setSelectedType(selectedValue)
    console.log(selectedValue)
  }
  function handleDateRangeClick(selectedValue) {
    setSelectedDate(selectedValue)
    console.log(selectedValue)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const rawResponse = await fetch(
      'https://data.ssb.no/api/v0/no/table/07241',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: [
            {
              code: 'Boligtype',
              selection: {
                filter: 'item',
                values: [selectedType],
              },
            },
            {
              code: 'ContentsCode',
              selection: {
                filter: 'item',
                values: ['KvPris'],
              },
            },
            {
              code: 'Tid',
              selection: {
                filter: 'item',
                values: selectedDate,
              },
            },
          ],
          response: {
            format: 'json-stat2',
          },
        }),
      }
    )
    const content = await rawResponse.json()
    setResultData(content)
  }

  async function getParameters() {
    await fetch(`https://data.ssb.no/api/v0/no/table/07241`)
      .then((response) => response.json())
      .then((actualData) => {
        const housingTypes = actualData.variables[0].valueTexts.reduce(
          (types, element, index) => {
            return {
              ...types,
              [element]: actualData.variables[0].values[index],
            }
          },
          {}
        )
        const dateRanges = actualData.variables[2].values
        setHousingTypes(housingTypes)
        setDateRanges(dateRanges)
      })
  }

  useEffect(() => {
    getParameters()
  }, [])

  return (
    <>
      <div className='App'>
        <h1>Norway statistics on the average price per square meter</h1>
        <Form>
          <SelectPropertyTypeComponent
            handler={handleHousingTypeClick}
            typesList={housingTypes}
          ></SelectPropertyTypeComponent>

          <SelectDateRangeComponent
            handler={handleDateRangeClick}
            dateRanges={dateRanges}
          ></SelectDateRangeComponent>
          <button
            className='btn'
            onClick={(e) => handleSubmit(e)}
            disabled={!selectedType || !selectedDate ? true : false}
          >
            Show results
          </button>
        </Form>
      </div>
      <ResultTable resultData={resultData}></ResultTable>
    </>
  )
}

export default App

import Form from 'react-bootstrap/Form'
import { useState } from 'react'

function SelectDateRangeComponent(props) {
  const [selectedDateRange, setSelectedDateRange] = useState([])

  return (
    <>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Quarter</Form.Label>
        <Form.Control
          as='select'
          multiple
          onChange={(e) => {
            let items = [].slice
              .call(e.target.selectedOptions)
              .map((item) => item.value)
            props.handler(items)
            setSelectedDateRange(items)
          }}
          aria-label='Type of property'
        >
          <option></option>
          {props.dateRanges &&
            props.dateRanges.map(function (name, index) {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              )
            })}
        </Form.Control>
      </Form.Group>
    </>
  )
}

export default SelectDateRangeComponent

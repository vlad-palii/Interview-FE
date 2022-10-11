import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'

function SelectPropertyTypeComponent(props) {
  const [selectedType, setSelectedType] = useState(null)

  return (
    <>
      <Form.Label>Type of property</Form.Label>
      <Form.Select
        aria-label='Type of property'
        onChange={(e) => {
          props.handler(e.currentTarget.value)
          setSelectedType(e.currentTarget.value)
        }}
      >
        <option></option>
        {props.typesList &&
          Object.keys(props.typesList).map((key) => (
            <option
              data-selected={
                selectedType && selectedType == props.typesList[key]
              }
              key={key}
              value={props.typesList[key]}
            >
              {key}
            </option>
          ))}
      </Form.Select>
    </>
  )
}

export default SelectPropertyTypeComponent

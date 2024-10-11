import React from 'react'
import { FormGroup } from 'reactstrap'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { FcSearch } from 'react-icons/fc'

export default function Searchbar(props) {
  
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>
          <FcSearch />
        </InputGroupText>
        <Input
          id="exampleSearch"
          name="search"
          placeholder={props.placeholder}
          type="search"
          onChange={props.onChange}
          value={props.value}
        />
      </InputGroup>
    </FormGroup>
  )
}

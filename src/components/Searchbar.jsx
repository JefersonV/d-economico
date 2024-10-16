import React from 'react'
import { FormGroup } from 'reactstrap'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { FcSearch } from 'react-icons/fc'
import "../styles/Searchbar.scss"

export default function Searchbar(props) {
  
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>
          <FcSearch />
        </InputGroupText>
        <Input
          id="exampleSearch"
          className="search-bar"
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

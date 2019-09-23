import classes from '../../routes/CheckIn/components/CheckInForm.scss'
import React from 'react'
import { Col } from 'react-bootstrap'

const parseLabel = (definition, props, index) => {
  const { title } = definition
  return (
    <Col xs={12} sm={6} className={classes.formItemContainer} key={index}>
      <p>{title}</p>
    </Col>
  )
}

export default parseLabel

/* eslint react/prop-types: 0 */
import classes from '../../routes/CheckIn/components/CheckInForm.scss'
import React from 'react'
import { Col, Row, OverlayTrigger, Glyphicon, Tooltip } from 'react-bootstrap'
const parseRadio = (definition, props, index) => {
  const { name, title, hint, options } = definition
  const tooltipComponent = hint ? <Tooltip id="tooltip">{hint}</Tooltip> : null
  return (
    <Col xs={12} sm={6} className={classes.inputGroup} key={index}>
      <label className={classes.fieldName}>
      {title}
      {
        hint
        && <OverlayTrigger placement="right" overlay={tooltipComponent}>
          <Glyphicon glyph="info-sign" />
        </OverlayTrigger>
      }
      </label>
      <Row>
        {options.map((option, index) =>
          <Col xs={12} key={index}>
            <label>
              <input
                {...props.fields[name]}
                type="radio"
                value={option}
                checked={props.fields[name].value === option}
              />
              {option}
            </label>
          </Col>)}
      </Row>
    </Col>
  )
}

export default parseRadio

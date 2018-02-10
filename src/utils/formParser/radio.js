/* eslint react/prop-types: 0 */
import classes from '../../routes/CheckIn/components/CheckInForm.scss'
import React from 'react'
import { Col, Row, OverlayTrigger, Glyphicon, Tooltip } from 'react-bootstrap'
const parseRadio = (definition, props) => {
  const { name, title, hint, options } = definition
  const tooltipComponent = hint ? <Tooltip id="tooltip">{hint}</Tooltip> : null
  return (
    <Col xs={12} sm={6} className={classes.inputGroup}>
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
        {options.map(option =>
          <Col xs={12}>
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

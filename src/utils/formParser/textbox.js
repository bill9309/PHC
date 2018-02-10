/* eslint react/prop-types: 0 */
import { Col, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap'
import React from 'react'
import classes from '../../routes/CheckIn/components/CheckInForm.scss'
import 'react-select/dist/react-select.css'
const parseTextbox = (definition, props) => {
  const { name, title, hint } = definition
  const tooltipComponent = hint ? <Tooltip id="tooltip">{hint}</Tooltip> : null
  return (
    <Col xs={12} sm={6} className={classes.inputGroup}>
      <label className={classes.fieldName}>
        {title}
        {hint
          && <OverlayTrigger placement="right" overlay={tooltipComponent}>
            <Glyphicon glyph="info-sign" />
          </OverlayTrigger>
        }
        {props.fields[name].touched && props.fields[name].error
        && <span className={classes.errorMessage}>{props.fields[name].error}</span>}
      </label>
      <input className={classes.textInput} type="text" {...props.fields[name]} />
    </Col>
  )
}

export default parseTextbox

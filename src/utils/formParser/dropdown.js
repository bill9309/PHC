/* eslint react/prop-types: 0 */
import React from 'react'
import Select from 'react-select'
import { Col, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap'
import classes from '../../routes/CheckIn/components/CheckInForm.scss'

const parseDropdown = (definition, props, index) => {
  const { name, title, hint, options } = definition
  const tooltipComponent = hint ? <Tooltip id="tooltip">{hint}</Tooltip> : null
  return (
    <Col xs={12} sm={6} className={classes.inputGroup} key={index}>
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
      <Select
        {...props.fields[name]}
        name={name + 'Select'}
        value={props.fields[name].value || ''}
        onBlur={() => props.fields[name].onBlur(props.fields[name].value)}
        options={options}
      />
    </Col>
  )
}

export default parseDropdown

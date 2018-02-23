/* eslint react/prop-types: 0 */
import React from 'react'
import { Col, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap'
import classes from '../routes/CheckIn/components/CheckInForm.scss'
import ArrayCheckbox from '../components/ArrayCheckbox'
const parseCheckboxes = (definition, props) => {
  const { name, title, hint, options, other } = definition
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
        {
          props.fields[name].touched
          && props.fields[name].error
          && <span className={classes.errorMessage}>{props.fields[name].error}</span>
        }
      </label>
      <div className={classes.inputs}>
        {options.map(option => (
          <div className={classes.toggleInputGroup} key={option}>
            <label>
              <ArrayCheckbox field={props.fields[name]} value={option} />
              {option}
            </label>
          </div>
        ))}
        {
          other
          && <div>
            <label className={classes.otherInput}>
              Other
              <input
                className={classes.otherTextInput}
                type="text"
                {...props.fields[name + 'Other']}
                onChange={(value) => props.fields[name + 'Other'].onChange(value) && props.fields[name].onChange(value)}
              />
            </label>
          </div>
        }
      </div>
      {
        props.fields[name + 'Other'].touched
        && props.fields[name + 'Other'].error
        && <span className={classes.errorMessage}>{props.fields[name + 'Other'].error}</span>
      }
    </Col>
  )
}

export default parseCheckboxes

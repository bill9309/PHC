import parseRadio from './radio'
import parseDropdown from './dropdown'
import parseTextbox from './textbox'
import parseCheckboxes from './checkboxes'
import parseLabel from './label'
import React from 'react'
import { Row } from 'react-bootstrap'

const parseWidget = (widgetDefinition, props, index) => {
  switch (widgetDefinition.type) {
    case 'radio':
      return parseRadio(widgetDefinition, props, index)
    case 'dropdown':
      return parseDropdown(widgetDefinition, props, index)
    case 'textbox':
      return parseTextbox(widgetDefinition, props, index)
    case 'checkboxes':
      return parseCheckboxes(widgetDefinition, props, index)
    case 'label':
      return parseLabel(widgetDefinition, index)
    default:
      return null
  }
}

const parseForm = (formDefinition, props) => {
  return <Row>{formDefinition.map((widget, index) => parseWidget(widget, props, index))}</Row>
}

export default parseForm

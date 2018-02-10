import parseRadio from './radio'
import parseDropdown from './dropdown'
import parseTextbox from './textbox'
import React from 'react'
import { Row } from 'react-bootstrap'

const parseWidget = (widgetDefinition, props) => {
  switch (widgetDefinition.type) {
    case 'radio':
      return parseRadio(widgetDefinition, props)
    case 'dropdown':
      return parseDropdown(widgetDefinition, props)
    case 'textbox':
      return parseTextbox(widgetDefinition, props)
    default:
      return null
  }
}

const parseForm = (formDefinition) => {
  const widgets = formDefinition['definition']
  return <Row>{widgets.map(widget => parseWidget(widget))}</Row>
}

export default parseForm

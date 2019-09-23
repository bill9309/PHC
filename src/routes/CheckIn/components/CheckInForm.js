/* eslint react/prop-types: 0 */
import React, { PropTypes } from 'react'
import Select from 'react-select'
import {
  Button,
  Col,
  Grid,
  Row,
  Tooltip,
  OverlayTrigger,
  Glyphicon,
} from 'react-bootstrap'
import 'react-select/dist/react-select.css'
import formStyle from '../../../utils/formParser/formStyle'
import parseForm from '../../../utils/formParser'
import ArrayCheckbox from '../../../components/ArrayCheckbox'
import classes from './CheckInForm.scss'

const basicInfoDefinition = formStyle['parts'][0]['definition']
const genderLGBTQDefinition = formStyle['parts'][1]['definition']
const EthnicityLanguageDefinition = formStyle['parts'][2]['definition']
const DemographicDefinition = formStyle['parts'][3]['definition']
const ServicesDefinition = formStyle['parts'][4]['definition']
const BasicInfoPartial = (props) => {
  return parseForm(basicInfoDefinition, props)
}

const GenderLGBTQPartial = (props) => {
  return parseForm(genderLGBTQDefinition, props)
}

const EthnicityLanguagePartial = (props) => {
  return parseForm(EthnicityLanguageDefinition, props)
}

const DemographicPartial = (props) => {
  return parseForm(DemographicDefinition, props)
}

const ServicesPartial = (props) => {
  return parseForm(ServicesDefinition, props)
}

export const CheckInForm = (props) => {
  let {
    fields: {
      firstName, lastName, socialSecurityNumber, dateOfBirth, phoneNumber, emailAddress, address,
      gender, isLGBTQ,
      ethnicity, ethnicityOther, language, languageOther,
      hasBeenInFosterCare,
      hasServedInTheMilitary,
      primaryHealthcareLocation,
      learnedAboutEvent, whereStaying,
      isHomeless, lengthOfHomelessness,
      medicalServices, supportServices,
      hasSeenDoctorThisYear, generalHealth,
      skinHealth, dignityAndConfidence,
      dentalHygiene, hygiene,
    },
    handleSubmit,
    requesting,
    currentAccount,
    errors,
    submitFailed,
  } = props

  const basicInfoFields = {
    firstName,
    lastName,
    socialSecurityNumber,
    dateOfBirth,
    phoneNumber,
    emailAddress,
    address,
  }

  const genderIsLGBTQFields = {
    gender,
    isLGBTQ,
  }

  const ethnicityLanguageFields = {
    ethnicity,
    ethnicityOther,
    language,
    languageOther,
  }

  const demographicFields = {
    hasBeenInFosterCare,
    hasServedInTheMilitary,
    primaryHealthcareLocation,
    learnedAboutEvent,
    whereStaying,
    isHomeless,
    lengthOfHomelessness,
    hasSeenDoctorThisYear,
    generalHealth,
    skinHealth,
    dignityAndConfidence,
    dentalHygiene,
    hygiene,
  }

  const servicesFields = {
    medicalServices,
    supportServices,
  }
  // initialize array fields to empty arrays
  ethnicity.value = ethnicity.value || []
  medicalServices.value = medicalServices.value || []
  supportServices.value = supportServices.value || []

  const _onSubmit = () => {
    const fields = props.fields
    const newFields = {}

    for (let field in fields) {
      // skip alt fields, which have their own handlers to update fields correctly
      if (field.endsWith('Other')) continue

      // deal with checkboxes, and checkbox-like inputs differently
      if (fields[field].checked !== undefined) {
        newFields[field] = fields[field].checked
      } else if (fields[field].value !== '') {
        newFields[field] = fields[field].value
      }
    }

    props.updateInfo(newFields, currentAccount && currentAccount.id)
  }

  const _onClear = () => {
    props.clearInfo()
  }

  if (currentAccount) {
    if (currentAccount.firstName) {
      firstName.disabled = true
    } else {
      delete firstName.disabled
    }

    if (currentAccount.lastName) {
      lastName.disabled = true
    } else {
      delete lastName.disabled
    }

    if (currentAccount.socialSecurityNumber && currentAccount.socialSecurityNumber.length === 9) {
      socialSecurityNumber.disabled = true
    } else {
      delete socialSecurityNumber.disabled
    }

    if (currentAccount.dateOfBirth) {
      dateOfBirth.disabled = true
    } else {
      delete dateOfBirth.disabled
    }
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Grid fluid>
        <BasicInfoPartial fields={basicInfoFields} />
        <GenderLGBTQPartial fields={genderIsLGBTQFields} />
        <EthnicityLanguagePartial fields={ethnicityLanguageFields} />
        <DemographicPartial fields={demographicFields} />
        <ServicesPartial fields={servicesFields} />
      </Grid>

      <div className={classes.footer}>
        <Button
          bsStyle="primary"
          type="submit"
          disabled={requesting}
        >
          {requesting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="button"
          disabled={requesting}
          onClick={_onClear}
        >
          Clear Values
        </Button>
      </div>

      {(Object.keys(errors).length && submitFailed)
          ? <div className={classes.errorNotice}>
            Required fields are missing! Please review the form.
          </div>
          : null
      }
    </form>
  )
}

CheckInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  updateInfo: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default CheckInForm

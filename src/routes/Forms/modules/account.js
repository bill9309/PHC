/* @flow */
import { push, LOCATION_CHANGE } from 'react-router-redux'

import { UPDATE_INFO_REQUEST } from '../../CheckIn/modules/check-in'
import { phcFetch } from '../../../utils/fetch'

export function getFormData(type){
  return fetch(`/api/formtype/specific`, {
    headers : {
      'Accept': 'application/json',
    },
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        throw Error('Error!')
      }
    })
    .then((json_content) => {console.log(json_content);});
}

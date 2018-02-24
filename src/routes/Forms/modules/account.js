/* @flow */
import { push, LOCATION_CHANGE } from 'react-router-redux'

import { UPDATE_INFO_REQUEST } from '../../CheckIn/modules/check-in'
import { phcFetch } from '../../../utils/fetch'

export function getFormData(type){
  //search?name=${name}`)
  console.log("here============================================");
  return fetch(`/api/formtype/specific`)
    .then((response) => response.json())
    .then((json_content) => {console.log(json_content);});
}

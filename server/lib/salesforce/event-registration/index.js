import Q from 'q'
import logger from '../../logger'
import {
  EventRegistration,
  EventPicklistValues,
  FORM_FIELD_TO_SALESFORCE_FIELD,
  PHC_EVENT_ID,
} from './constants'
import { PhcEvent } from '../phc-event/constants'
import {
  transformFromSalesforce,
  transformToSalesforce,
} from './transform'

// TODO: WHERE IS THIS FUNCTION CALLED???
export function createEventRegistration (connection, fields) {
  const deferred = Q.defer()
  const services = fields.medicalServices.concat(fields.supportServices)
  const payload = {}
  for (let service of services) {
    // Passing services for now - we might want to mirror updateEventRegistration later - AZ
    if (service in FORM_FIELD_TO_SALESFORCE_FIELD) {
      payload[FORM_FIELD_TO_SALESFORCE_FIELD[service]] = EventPicklistValues.APPLIED
    }
    // TODO: but what happens if it's not in the conversion map and we want to add it?
  }

  payload['Account__c'] = fields.accountId
  payload['PHC_Event__c'] = PHC_EVENT_ID

  logger.debug('Creating event registration: requesting', { payload })

  connection.sobject(EventRegistration).create(payload, (error, registration) => {
    logger.debug('Creating event registration: request complete', { registration })

    if (error || !registration.success) {
      logger.error('Error creating registration', { error })
      deferred.reject({
        message: 'Error creating registration.',
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully created registration ${registration.id}.`,
        payload: {
          registration: {
            id: registration.id,
          },
        },
      })
    }
  })
}

export function updateEventRegistration (connection, id, eventRegistration) {
  const deferred = Q.defer()

  const payload = transformToSalesforce(eventRegistration)
  payload.Id = id

  logger.debug('Updating event registration: requesting', { payload })

  connection.sobject(EventRegistration).update(payload, (error, registration) => {
    logger.debug('Updating event registration: request complete', { registration })

    if (error || !registration.success) {
      logger.error('Error updating registration', { error })
      deferred.reject({
        message: 'Error updating registration.',
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully updated registration ${registration.id}.`,
        payload: {
          registration: {
            id: registration.id,
          },
        },
      })
    }
  })

  return deferred.promise
}

export function getEventRegistration (connection, id) {
  const deferred = Q.defer()

  logger.debug('Fetching event registration: requesting', { id })

  connection.sobject(EventRegistration).retrieve(id, (error, eventRegistration) => {
    logger.debug('Fetching event registration: request complete', eventRegistration)

    if (error) {
      logger.error('Fetching event registration: error', { id, error })
      deferred.reject({
        message: `Error fetching event registration ${id}.`,
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully retrieved event registration ${id}`,
        payload: {
          eventRegistration: transformFromSalesforce(eventRegistration),
        },
      })
    }
  })

  return deferred.promise
}

export function getEventRegistrationByAccount (connection, accountId) {
  const deferred = Q.defer()

  logger.debug(`Searching for account id: ${accountId} at PHC Event: ${PHC_EVENT_ID}`)

  connection.sobject(EventRegistration).find({
    Account__c: accountId,
    [PhcEvent]: PHC_EVENT_ID,
  })
    .sort('-LastModifiedDate') // Sort in descending order of last modified date
    .execute((error, eventRegistrations) => {
      try {
        if (error) {
          logger.error('Fetching event registration: error', { accountId, error })
          return deferred.reject({
            message: `Error fetching event registration ${accountId}.`,
            error,
          })
        }

        if (!eventRegistrations.length) {
          return deferred.reject({
            message: `Did not find event registration for ${accountId}.`,
            error,
          })
        }

        let eventRegistration = eventRegistrations[0]

        deferred.resolve({
          message: `Successfully retrieved event registration ${eventRegistration.Id} for account ${accountId}`,
          payload: {
            eventRegistration: transformFromSalesforce(eventRegistration),
          },
        })
      } catch (e) {
        logger.error(e)
      }
    })
    return deferred.promise
  }


    // TODO: WHERE IS THIS FUNCTION CALLED???
export function createEvent (connection, fields) {
  // const deferred = Q.defer()
  // const services = fields.medicalServices.concat(fields.supportServices)
  // const payload = {}
  // for (let service of services) {
  //   // Passing services for now - we might want to mirror updateEventRegistration later - AZ
  //   if (service in FORM_FIELD_TO_SALESFORCE_FIELD) {
  //     payload[FORM_FIELD_TO_SALESFORCE_FIELD[service]] = EventPicklistValues.APPLIED
  //   }
  //   // TODO: but what happens if it's not in the conversion map and we want to add it?
  // }

  // payload['Account__c'] = fields.accountId
  // payload['PHC_Event__c'] = PHC_EVENT_ID

  // logger.debug('Creating event registration: requesting', { payload })
  ///api/even-registrations/test
  // connection.sobject("'PHC_Event__c'").retrieve("a0R29000000jRj5", function(err, ret) {
  //   logger.debug('Fetching PHC event: request complete', ret)
  //
  //   if (error) {
  //     logger.error('Fetching event: error', {error});
  //   } else {
  //     logger.debug("Event fetched:")
  //     logger.debug(ret);
  //   }
  // });

  connection.sobject("PHC_Event__c").create({"Name": "PHC Test2", "Acupuncture__c": "true"}, function(err, ret) {
    if (err || !ret.success){ return console.error(err, ret); }
    logger.debug('PHC Event successfully created');
  });

    // connection.sobject(EventRegistration).create(payload, (error, registration) => {
  //   logger.debug('Creating event registration: request complete', { registration })

  //   if (error || !registration.success) {
  //     logger.error('Error creating registration', { error })
  //     deferred.reject({
  //       message: 'Error creating registration.',
  //       error,
  //     })
  //   } else {
  //     deferred.resolve({
  //       message: `Successfully created registration ${registration.id}.`,
  //       payload: {
  //         registration: {
  //           id: registration.id,
  //         },
  //       },
  //     })
  //   }
  // })
  }

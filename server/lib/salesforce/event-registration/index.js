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
  console.log("Event registration payload");
  console.log(payload);

  //describes the custom object metadata
  // connection.sobject('PHC_Event__c').describe(function(err, meta) {
  //    if(err) {return console.error(err);}
  //    console.log('-----------------------------------------');
  //    console.log(meta);
  //    console.log(meta.fields[3]);
  //    console.log(meta.fields[3].checklist);
  //    console.log('-----------------------------------------');
  //  });

// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// CODE FOR EVENT REGISTRATION AND PHC EVENT FOR ADMIN PLATFORM
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------

//Adds code to add new service to PHC event (note: service here is in the form of a checkbox) //
 var metadata = {
   fullName: 'PHC_Event__c.NewSampleServiceField__c',
   type: 'Checkbox',
   label: 'Sample Service Field',
   defaultValue: 'false',
   writeRequiresMasterRead :'true'
 };

 connection.metadata.create('CustomField', metadata , function(err, result){
     if (err) {
         console.error(err);
     } else {
         console.log(result);
     }
 });
 //code to add new service to PHC event ends here//

//Adds code to CREATE NEW PHC event with acupuncture checked //
var event_payload = {Name: 'PHC TestSampleEvent4', Acupuncture__c: true}
connection.sobject("PHC_Event__c").create(event_payload, function(err, ret) {
  if (err || !ret.success){
    logger.error('Error creating event')
  } else {
    logger.debug('PHC Event successfully created');
  }
});
//code to CREATE NEW PHC event ends here//

//CODE TO ADD SERVICE TO EVENT REGISTRATION (which applies to all of the records): equiv to adding a column in the table //

  //Code here to add NewSamplePickListField custom field to PHC event registration
  var metadata = {
    fullName: 'Event_Registration__c.NewSampleServiceField__c',
    type: 'Picklist',
    label: 'Sample Service Field',
    picklist: {picklistValues: [
      {fullName: 'None',
       default: 'true' },
      {fullName: 'Applied',
        default: 'false'},
      {fullName: 'Received',
       default: 'false'},
      {fullName: 'Drop in',
       default: 'false'}],
              sorted : 'false'}
  };


  //creates custom field and add it to event registration
  connection.metadata.create('CustomField', metadata , function(err, result){
      if (err) {
          console.error(err);
      } else {
          console.log(result);
      }
  });

  /////////CODE TO ADD SERVICE TO EVENT REGISTRATION ENDS HERE (which applies to all of the records)/////////////////

  // --------------------------------------------------------------------------------------------------------------
  // CODE TO READ METADATA VALUES (metada describes a custom object(such as event registration) or custom field (such as services))
  // --------------------------------------------------------------------------------------------------------------

  // code to read the metadata of a custom field (such as a service called CalFresh from Event registration)
  connection.metadata.read('CustomField', ['Event_Registration__c.CalFresh__c'], function(err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log("Data from custom field");

        console.log(result)
        /* console.log(result) prints out info below
        { fullName: 'Event_Registration__c.CalFresh__c',
          externalId: 'false',
          label: 'CalFresh',
          picklist:
           { picklistValues: [ [Object], [Object], [Object], [Object] ],
             sorted: 'false' },
          required: 'false',
          trackTrending: 'false',
          type: 'Picklist' }
        */
        console.log(result.picklist);
        /*  console.log(result.picklist) prints out info below
          { picklistValues:
             [ { fullName: 'None', default: 'true' },
               { fullName: 'Applied', default: 'false' },
               { fullName: 'Received', default: 'false' },
               { fullName: 'Drop in', default: 'false' } ],
            sorted: 'false' }
        */
    }
  });

  // --------------------------------------------------------------------------------------------------------------
  // CODE TO READ METADATA VALUES ends here
  // --------------------------------------------------------------------------------------------------------------

  // code to read the metadata of a custom field (such as the field from PHC Event called Acupuncture)
  connection.metadata.read('CustomField', ['PHC_Event__c.Acupuncture__c'], function(err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log("Data from event field");
        console.log(result)
    }
  });

  // --------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // CODE FOR EVENT REGISTRATION AND PHC EVENT FOR ADMIN PLATFORM ENDS HERE
  // --------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------

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
      console.log(transformFromSalesforce(eventRegistration));
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
  const deferred = Q.defer()
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
  //Adds code to create Event
  var payload = {Name: 'PHC Test2'}
  connection.sobject("PHC_Event__c").create(payload, function(err, ret) {
    if (err || !ret.success){
      logger.error('Error creating event')
      deferred.reject({
        message: 'Error creating event.',
        error,
      })
    } else {
      deferred.resolve({
          message: `Successfully created PHC event`,
          payload: {
            registration: {
              id: registration.id,
            },
          },
        })
      logger.debug('PHC Event successfully created');
    }
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

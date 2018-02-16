// TODO: This is for testing the feasibility of reading form style instead of hard-coding it.
// Should change to server request later.
export default {
  'parts': [
    'basic-info': [
      {
        'type': 'textbox',
        'name': 'firstName',
        'title': 'First Name',
        'hint': null
      },
      {
        'type': 'textbox',
        'name': 'lastName',
        'title': 'Last Name',
        'hint': null
      },
      {
        'type': 'textbox',
        'name': 'socialSecurityNumber',
        'title': 'Social Security Number',
        'hint': 'This is optional and only used for helping us identify you in the future.',
      },
      {
        'type': 'textbox',
        'name': 'dateOfBirth',
        'title': 'Date of Birth (mm-dd-yyyy)',
        'hint': null
      },
      {
        'type': 'textbox',
        'name': 'phoneNumber',
        'title': 'Phone',
        'hint': null
      },
      {
        'type': 'textbox',
        'name': 'emailAddress',
        'title': 'Email Address',
        'hint': null
      }
    ],
    'gender-LGBTQ': [
      {
        'type': 'radio',
        'name': 'gender',
        'title': 'Gender',
        'options': [
          'Male',
          'Female',
          'Non-binary gender',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'isLGBTQ',
        'title': 'Do you identify as LGBTQ?',
        'options': [
          'Yes',
          'No',
        ],
        'hint': null,
      },
    ],
    'ethnicity-language': [
      {
        'type': 'checkboxes',
        'name': 'ethnicity',
        'title': 'Ethnicity',
        'options': [
          'African American',
          'Asian / Pacific Islander',
          'Caucasian',
          'Latino',
          'Native American',
        ],
        'other': 'ethnicityOther',
        'hint': 'We ask this question for the purpose of collecting information about \
        whom we serve, and how to better reach at-risk demographics.',
      },
      {
        'type': 'checkboxes',
        'name': 'language',
        'title': 'Primary Language',
        'options': [
          'English',
          'Cantonese / Mandarin',
          'Russian',
          'Spanish',
          'Vietnamese',
        ],
        'other': 'languageOther',
        'hint': null,
      },
    ],
    'demographic': [
      {
        'type': 'radio',
        'name': 'hasBeenInFosterCare',
        'title': 'Have you ever been in foster care?',
        'options': [
          'Yes',
          'No'
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'hasServedInTheMilitary',
        'title': 'Have you ever served in the military?',
        'options': [
          'Yes',
          'No'
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'hasSeenDoctorThisYear',
        'title': 'Have you been to a doctor this year?',
        'options': [
          'Yes',
          'No'
        ],
        'hint': null,
      },
      {
        'type': 'dropdown',
        'name': 'primaryHealthcareLocation',
        'title': 'Where do you usually go for healthcare when you are not feeling well?',
        'options': [
          { value: 'Hospital/Emergency Room', label: 'Hospital/Emergency Room' },
          { value: 'Urgent Care', label: 'Urgent Care' },
          { value: 'Clinic / Primary Care Doctor', label: 'Clinic / Primary Care Doctor' },
          { value: 'VA', label: 'VA' },
          { value: 'Does not go for care', label: 'Does not go for care' },
          { value: 'Other', label: 'Other' },
        ],
        'hint': null,
      },
      {
        'type': 'dropdown',
        'name': 'learnedAboutEvent',
        'title': 'How did you hear about this event?',
        'options': [
          { value: 'Outreach', label: 'Outreach' },
          { value: 'I learned about it today', label: 'I learned about it today' },
          { value: 'I learned about it from a poster or flyer I saw at another service office',
          label: 'I learned about it from a poster or flyer I saw at another service office' },
          { value: 'I learned about it at PHC’s office', label: 'I learned about it at PHC’s office' },
        ],
        'hint': null,
      },
      {
        'type': 'dropdown',
        'name': 'whereStaying',
        'title': 'Where are you currently staying?',
        'options': [
          { value: 'I am staying on a friend or family member’s couch',
          label: 'I am staying on a friend or family member’s couch' },
          { value: 'I am homeless', label: 'I am homeless' },
          { value: 'I am in a shelter', label: 'I am in a shelter' },
          { value: 'I am sleeping in a vehicle', label: 'I am sleeping in a vehicle' },
        ],
        'hint': null,
      },
      {
        'type': 'label',
        'title': 'Please rate on a scale of 1 (bad) to 5 (great)',
      },
      {
        'type': 'radio',
        'name': 'generalHealth',
        'title': 'General health:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'generalHealth',
        'title': 'General health:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'skinHealth',
        'title': 'Skin or dermotological health:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'dignityAndConfidence',
        'title': 'Your overall dignity and confidence:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'dentalHygiene',
        'title': 'Dental Hygiene:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'hygiene',
        'title': 'Hygiene:',
        'options': [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        'hint': null,
      },
      {
        'type': 'radio',
        'name': 'isHomeless',
        'title': 'Are you currently homeless?',
        'options': [
          'Yes',
          'No',
        ],
        'hint': null,
      },
      {
        'type': 'dropdown',
        'name': 'lengthOfHomelessness',
        'title': 'If answered "Yes" to last question, how long have you been homeless for?',
        'options': [
          { value: 'Less than 3', label: 'Less than 3' },
          { value: '3-6 months', label: '3-6 months' },
          { value: '6-9 months', label: '6-9 months' },
          { value: '9-12 months', label: '9-12 months' },
          { value: '1-3 years', label: '1-3 years' },
          { value: '3-5 years', label: '3-5 years' },
          { value: '5-7 years', label: '5-7 years' },
          { value: '7-10 years', label: '7-10 years' },
          { value: '10-15 years', label: '10-15 years' },
          { value: '15 years and more', label: '15 years and more' }
        ],
        'hint': null,
      },
    ],
    'services': [
      {
        'type': 'checkboxes',
        'name': 'medicalServices',
        'title': 'What medical services would you like today?',
        'options': [
          'Acupuncture',
          'Addiction Support & Harm Reduction',
          'Bugs and Lice Exams',
          'Dental',
          'Healthy SF',
          'Hepatitis A Vaccine',
          'HIV, STI, and Hepatitis C Testing',
          'Flu Shots',
          'Massage',
          'Medical',
          'Medical Clinics & Support',
          'Mental Health Services',
          'Podiatry',
          'Reading Glasses',
          'TB Testing',
          'Vision Screenings',
        ],
        'other': null,
        'hint': null,
      },
      {
        'type': 'checkboxes',
        'name': 'supportServices',
        'title': 'What support services would you like today?',
        'options': [
          'Adult Probation',
          'Banking Services',
          'CAAP',
          'Disability Services',
          'DMV ID',
          'Employment',
          'Food Bank',
          'Haircuts',
          'Homeward Bound',
          'Housing Info',
          'Legal',
          'Medi-Cal',
          'Pet Care',
          'Phone Calls and Voicemail',
          'Senior Services',
          'Showers',
          'SSI/SSDI',
          'Veteran Services',
          'Wheelchair/Walker Repairs',
          'Women\'s and Domestic Violence Services',
          'Youth Services (up to age 24)',
        ],
        'other': null,
        'hint': null,
      },
    ],
  ],
}

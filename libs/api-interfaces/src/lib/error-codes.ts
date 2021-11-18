export enum ValidationErrors {
  InvalidEmail = 'validation_invalid_email',
  EmailTaken = 'validation_email_taken',
  InvalidUsername = 'validation_invalid_username',
  UsernameTaken = 'validation_username_taken',
  InvalidPassword = 'validation_invalid_password',
  InvalidDataset = 'validation_invalid_dataset',
  NotJSONFile = 'not_a_json_file',
  DatasetNameTaken = 'validation_dataset_name_taken',
  InvalidConfiguration = 'invalid_configuration',
}

export enum ErrorCodes {
  Internal = 'internal',
  Validation = 'validation',
  Forbidden = 'forbidden',
}

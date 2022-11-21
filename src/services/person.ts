import { Persons } from '../models/person';

export const getPersons = async () => {
  const response = await Persons.find();
  return response;
};

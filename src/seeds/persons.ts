import { faker } from '@faker-js/faker';
import { Persons } from '../models/person';
import logger from '../utils/logger';

export const seedPersons = async () => {
  try {
    logger.info('starting persons seed...');
    await Persons.deleteMany();
    const persons = [];
    for (let i = 0; i < 3; i++) {
      const name = faker.name.fullName();
      const document = `example-document-${i + 1}.txt`;
      const birthDate = faker.date.birthdate();
      const person = {
        name,
        document,
        birthDate,
      };
      persons.push(person);
    }
    Persons.insertMany(persons);
    logger.info('finished persons seed successfully!');

  } catch (error) {
    logger.error(error);
  }
};
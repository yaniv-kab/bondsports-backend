import { faker } from '@faker-js/faker';
import { Persons } from '../models/person';

export const seedPersons = async () => {
  try {
    console.info('starting persons seed...');
    await Persons.deleteMany();
    const persons = [];
    for (let i = 0; i < 3; i++) {
      const name = faker.name.fullName();
      const document = `example-document-${i + 1}`;
      const birthDate = faker.date.birthdate();
      const person = {
        name,
        document,
        birthDate,
      };
      persons.push(person);
    }
    Persons.insertMany(persons);
    console.info('finished persons seed successfully!');

  } catch (error) {
    console.log(error);
  }
};
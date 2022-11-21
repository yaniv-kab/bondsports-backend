import { Request, Response } from 'express';
import { Person } from '../models/person';
import * as personService from '../services/person';
import { asyncHandler } from '../utils/asyncHandler';

const getPersons = async (req: Request, res: Response<Person[]>) => {
  const persons = await personService.getPersons();
  res.json(persons);
};

export default {
  getPersons: asyncHandler(getPersons),
};
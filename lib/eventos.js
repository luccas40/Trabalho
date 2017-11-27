import { Mongo } from 'meteor/mongo';
export const Evento = new Mongo.Collection("eventos");

$Evento = Evento;
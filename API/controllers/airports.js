import { Airport } from "../models/airport.js";

export const getData = async (req, res) => {
  Airport.find({}, (err, aliases) => {
    if (err) res.json({ message: "err" });
    res.json(aliases);
  });
};
export const getOne = async (req, res) => {
  Airport.findOne({ iata: req.query.iata }, (err, airport) => {
    if (err) res.json({ message: "err" });
    res.json(airport);
  });
};
export const saveData = async (req, res) => {
  try {
    await Airport.create(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).end();
  }
  res.status(200).end();
};

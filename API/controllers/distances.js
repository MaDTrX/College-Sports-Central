import { Distance } from "../models/distance.js";

export const getData = async (req, res) => {
  Distance.find({}, (err, aliases) => {
    if (err) res.json({ message: "err" });
    res.json(aliases);
  });
};
export const saveData = async (req, res) => {
  try {
    await Distance.create(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).end();
  }
  res.status(200).end();
};

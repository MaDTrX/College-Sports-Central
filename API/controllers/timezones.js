import { TimeZone } from "../models/timezone.js";

export const getData = async (req, res) => {
  TimeZone.find({}, (err, timezones) => {
    if (err) res.json({ message: "err" });
    res.json(timezones);
  });
};

export const saveData = async (req, res) => {
  try {
    await TimeZone.create(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).end();
  }
  res.status(200).end();
};

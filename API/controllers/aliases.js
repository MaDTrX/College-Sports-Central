import { Alias } from "../models/alias.js";

export const getData = async (req, res) => {
  Alias.find({}, (err, aliases) => {
    if (err) res.json({ message: "err" });
    return res.json(aliases);
  });
};

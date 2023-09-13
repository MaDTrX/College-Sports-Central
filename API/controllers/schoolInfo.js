import { SchoolInfo } from "../models/schoolInfo.js";

export const getSideArms = async (req, res) => {
  await SchoolInfo.find({ affiliate: "sidearms" }, (err, info) => {
    if (err) res.json({ message: "err" });
    res.json(info);
  }).clone();
};

export const getPresto = async (req, res) => {
  await SchoolInfo.find({ affiliate: "presto" }, (err, info) => {
    if (err) res.json = { message: "err" };
    res.json(info);
  }).clone();
};

export const getWmt = async (req, res) => {
  await SchoolInfo.find({ affiliate: "wmt" }, (err, info) => {
    if (err) res.json({ message: "err" });
    res.json(info);
  }).clone();
};

export const getStreamline = async (req, res) => {
  await SchoolInfo.find({ affiliate: "streamline" }, (err, info) => {
    if (err) res.json({ message: "err" });
    res.json(info);
  }).clone();
};
export const getIndie = async (req, res) => {
  await SchoolInfo.find({ affiliate: "indie" }, (err, info) => {
    if (err) res.json({ message: "err" });
    res.json(info);
  }).clone();
};
export const addData = async (req, res) => {
  console.log(addData);
  await SchoolInfo.create(req.body);
  res.end();
};

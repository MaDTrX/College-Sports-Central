import { Flight } from "../models/flight.js";
import moment from "moment-timezone";
import "../config/database.js"
import { paginator } from "../utilties/pagination.js";


export const getData = async (req, res) => {
  Flight.find({}, (err, flights) => {
    if (err) res.status(400).json({ message: "err" });
    res.status(200).json(flights);
  });
};

export const getflightLocation = async (req, res) => {
  const aircrafts = [...new Set(req.query.subfleets.split(","))]
  const start = req.query.startDate ? moment(req.query.startDate).utc() : moment.utc()
  start.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  Flight.find({subfleet: {$in: aircrafts }}, (err, flights) => {
    if (err) res.status(400).json({ message: "err" });
    const results = {type: "FeatureCollection", features: []}
    for (let i = 0; i < flights.length; i++) {
      const flightMap = {
        type: "Feature",
        properties: {
          subfleet: flights[i].subfleet,
        }
      };
      const paths = flights[i].paths;
      for (let j = paths.length -1; j >= 0; j--) {
        const arrDate = paths[j]?.disDate.getTime()
        const nextDate = paths[j - 1]?.disDate.getTime()
        const diff = nextDate - arrDate
        if (paths[j].effDate <= start) {
          flightMap.properties.id = paths[j]._id
          flightMap.geometry = paths[j].deptGeo
          flightMap.properties.arrvGeo = paths[j].arrvGeo.coordinates
          flightMap.properties.path = [paths[j].deptGeo.coordinates, paths[j].arrvGeo.coordinates]
          flightMap.properties.team = paths[j].team
          flightMap.properties.deptArp = paths[j].deptArp
          flightMap.properties.arrvArp = paths[j].arrvArp
          flightMap.properties.deptTime = paths[j].deptTime
          flightMap.properties.arrvTime = paths[j].arrvTime
          flightMap.properties.effDate = paths[j].effDate
          flightMap.properties.disDate = paths[j].disDate
          flightMap.properties.blockTime = paths[j].blockTime
          flightMap.properties.serviceType = paths[j].serviceType
          flightMap.properties.status = diff > 2 ? "Idle" :  "Scheduled"
          flightMap.properties.statusColor = diff > 2 ? "#55A8FF" : "#FF7A00"
          flightMap.properties.pathColor = paths[j].serviceType === "Ferry" ? "#55A8FF" : "#FF7A00"
          break
        }
      }
      results.features.push(flightMap);
    }
    res.status(200).send(results);
  });
};

export const getflights = async (req, res) => {
  const aircrafts = [...new Set(req.query.subfleets.split(","))]
  const start = req.query.startDate ? moment(req.query.startDate).utc() : moment.utc()
  const end = req.query.endDate ? moment(req.query.endDate).utc() : undefined
  const page = req.query.page
  const rows = req.query.rows
  start?.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  end?.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  Flight.find({subfleet: {$in: aircrafts }}, (err, flights) => {
    if (err) res.status(400).json({ message: "err" });
    const results = []
    for (let i = 0; i < flights.length; i++) {
      const paths = flights[i].paths;
      for (let j = 0; j < paths.length; j++) {
        const arrDate = paths[j]?.disDate.getTime()
        const nextDate = paths[j + 1]?.disDate.getTime()
        const diff = nextDate - arrDate
        const newFlightInfo = {
          subfleet: flights[i].subfleet,
          id: paths[j]._id,
          deptGeo: paths[j].deptGeo.coordinates,
          arrvGeo: paths[j].arrvGeo.coordinates,
          path: [paths[j].deptGeo.coordinates, paths[j].arrvGeo.coordinates],
          team: paths[j].team,
          deptArp: paths[j].deptArp,
          arrvArp: paths[j].arrvArp,
          deptTime: paths[j].deptTime,
          arrvTime: paths[j].arrvTime,
          effDate: paths[j].effDate,
          disDate: paths[j].disDate,
          blockTime: paths[j].blockTime,
          serviceType: paths[j].serviceType,
          status: diff > 2 ? "Idle" :  "Scheduled",
          statusColor: diff > 2 ? "#55A8FF" : "#FF7A00",
          pathColor: paths[j].serviceType === "Ferry" ? "#55A8FF" : "#FF7A00"
        }
        if (paths[j].effDate >= start && !end) {
          results.push(newFlightInfo)
        } else if (paths[j].effDate >= start && paths[j].effDate <= end) {
         results.push(newFlightInfo)
        }
      }
    }
    res.status(200).send(paginator(results, page, rows));
  });
};

export const getDateRange = async (req, res) => {
  const start = moment(req.query.startDate).utc();
  const end = moment(req.query.endDate).utc();
  start.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  end.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  Flight.find({}, (err, flights) => {
    if (err) res.status(400).json({ message: "err" });
    const results = [];
    for (let i = 0; i < flights.length; i++) {
      const flightMap = {
        subfleet: flights[i].subfleet,
        geometry: flights[i].geometry,
        paths: [],
      };
      const paths = flights[i].paths;
      for (let j = 0; j < paths.length; j++) {
        if (paths[j].effDate >= start && paths[j].effDate <= end) {
          flightMap.paths.push(paths[j]);
        }
      }
      results.push(flightMap);
    }
    res.status(200).json(results);
  });
};

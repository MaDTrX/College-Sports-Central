export const getAircrafts = async (setAircrafts) => {
    const res = await fetch("https://ncaaschedulesapi.herokuapp.com/aircrafts");
    const json = await res.json();
    const crafts = {};
    for (let i = 0; i < json.length; i++) {
        crafts[`${json[i].subFleet}`] = true;
    }
    setAircrafts(crafts);
    return crafts;
};

export const getLocations = async (aircrafts, startDate, endDate) => {
    let fleets = [];
    for (let key in aircrafts) {
        if (aircrafts[key]) fleets.push(key);
    }
    fleets = fleets.join(",");
    let parameters = startDate
        ? `?subfleets=${fleets}&startDate=${startDate}`
        : `?subfleets=${fleets}`;
    parameters = endDate ? `${parameters}&endDate=${endDate}` : parameters;
    const res = await fetch(
        `https://ncaaschedulesapi.herokuapp.com/flights/aircrafts${parameters}`
    );
    const json = await res.json();
    return json;
};

export const getCharters = async (
    aircrafts,
    setCharters,
    page,
    rows,
    startDate,
    endDate
) => {
    let fleets = [];
    if (typeof aircrafts !== "string") {
        for (let key in aircrafts) {
            if (aircrafts[key]) fleets.push(key);
        }
        fleets = fleets.join(",");
    } else {
        fleets = aircrafts;
    }
    let parameters = startDate
        ? `?subfleets=${fleets}&startDate=${startDate}&page=${page}&rows=${rows}`
        : `?subfleets=${fleets}&page=${page}&rows=${rows}`;
    parameters = endDate ? `${parameters}&endDate=${endDate}` : parameters;
    const res = await fetch(
        `https://ncaaschedulesapi.herokuapp.com/flights/charters${parameters}`
    );
    const json = await res.json();
    setCharters(json.data);
    return json;
};

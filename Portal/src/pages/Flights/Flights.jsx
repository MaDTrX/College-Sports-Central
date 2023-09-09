import { useRef, useEffect, useState, useReducer } from "react";
import mapboxgl from "mapbox-gl";
import { Box, Button, Grid, Paper } from "@mui/material";
import "./flights.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterModal from "components/FilterModal/FilterModal";
import { toolTip } from "./Map/ToolTip";
import { getAircrafts, getCharters, getLocations } from "./Map/Data";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleIcon from "@mui/icons-material/Circle";
import TablePagination from "@mui/material/TablePagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
mapboxgl.workerClass =
    require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Flights() {
    const { REACT_APP_MAPBOXGL } = process.env;
    mapboxgl.accessToken = REACT_APP_MAPBOXGL;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-102.203946);
    const [lat, setLat] = useState(41.043675);
    const [zoom, setZoom] = useState(3);
    const [open, setOpen] = useState(false);
    const [aircrafts, setAircrafts] = useState({});
    const [aircraft, setAircraft] = useState("");
    const [charters, setCharters] = useState([]);
    const [filter, updateFilter] = useReducer(
        (prev, next) => {
            const newDate = { ...prev, ...next };
            if (newDate.endDate && newDate.startDate > newDate.endDate) {
                newDate.endDate = newDate.startDate;
            }
            return newDate;
        },
        {
            startDate: null,
            endDate: null,
        }
    );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [total, setTotal] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleCraft = async (event) => {
        setAircraft(event.target.value);
        if (!event.target.value) {
            const charters = await getCharters(
                aircrafts,
                setCharters,
                0,
                rowsPerPage,
                filter.startDate,
                filter.endDate
            );
            setTotal(charters.total);
            return;
        }
        const charter = await getCharters(
            event.target.value,
            setCharters,
            0,
            rowsPerPage,
            filter.startDate,
            filter.endDate
        );
        setTotal(charter.total);
        return;
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            sprite: "mapbox://sprites/mapbox/bright-v8",
            center: [lng, lat],
            zoom: zoom,
        });
    }, []);

    useEffect(() => {
        const setMapData = async () => {
            const crafts = await getAircrafts(setAircrafts);
            const setGeo = await getLocations(
                crafts,
                filter.startDate,
                filter.endDate
            );
            if (!map.current) return;
            if (setGeo) {
                if (!map.current.getLayer(`aircrafts`)) {
                    map.current.addSource(`aircrafts`, {
                        type: "geojson",
                        data: setGeo,
                    });
                    map.current.addLayer({
                        id: "aircrafts",
                        type: "circle",
                        source: "aircrafts",
                        layout: {
                            visibility: "visible",
                        },
                        paint: {
                            "circle-color": ["get", "statusColor"],
                            "circle-radius": 10,
                        },
                    });
                }

                map.current.on(
                    "click",
                    "aircrafts",
                    (e) => {
                        const coordinates =
                            e.features[0].geometry.coordinates.slice();
                        const description = e.features[0].properties;
                        new mapboxgl.Popup({ closeButton: false })
                            .setLngLat(coordinates)
                            .setHTML(toolTip(description, moment))
                            .addTo(map.current);

                        map.current.flyTo({
                            center: coordinates,
                            zoom: 5,
                            duration: 1500, // Animate over 11.5 seconds
                            essential: true,
                        });
                    },
                    []
                );
                for (let feature of setGeo.features) {
                    const id = feature.properties.id;
                    const prop = feature.properties;
                    const path = feature.properties.path;
                    if (!map.current.getSource(id)) {
                        map.current.addSource(id, {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: prop,
                                geometry: {
                                    type: "LineString",
                                    coordinates: path,
                                },
                            },
                        });
                        map.current.addLayer({
                            id: id,
                            type: "line",
                            source: id,
                            layout: {
                                "line-join": "round",
                                "line-cap": "round",
                                visibility: "none",
                            },
                            paint: {
                                "line-color": ["get", "pathColor"],
                                "line-width": 2.5,
                                "line-dasharray": [1, 2],
                            },
                        });
                    }
                }
                let leaveID, destinationMarker;
                map.current.on("mouseenter", "aircrafts", (e) => {
                    map.current.getCanvas().style.cursor = "pointer";
                    const id = e.features[0].properties.id;
                    const coordinates = e.features[0].properties.arrvGeo;
                    const rawPath = e.features[0].properties.path;
                    const sliced = rawPath.slice(2, -2);
                    const splitted = sliced.split("],[");
                    const start = splitted[0].split(",");
                    const end = splitted[1].split(",");
                    const path = [start, end];
                    const newCoordinates = coordinates.slice(
                        1,
                        coordinates.length - 1
                    );
                    const updatedCords = newCoordinates.split(",");
                    leaveID = id;
                    if (!map.current.getLayer(id)) {
                        map.current.addSource(id, {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: e.features[0].properties,
                                geometry: {
                                    type: "LineString",
                                    coordinates: path,
                                },
                            },
                        });
                        map.current.addLayer({
                            id: id,
                            type: "line",
                            source: id,
                            layout: {
                                "line-join": "round",
                                "line-cap": "round",
                                visibility: "none",
                            },
                            paint: {
                                "line-color": ["get", "pathColor"],
                                "line-width": 2.5,
                                "line-dasharray": [1, 2],
                            },
                        });
                    }
                    map.current.setLayoutProperty(id, "visibility", "visible");
                    destinationMarker = new mapboxgl.Marker()
                        .setLngLat(updatedCords)
                        .addTo(map.current);
                });

                // Change it back to a pointer when it leaves.
                map.current.on("mouseleave", "aircrafts", () => {
                    map.current.getCanvas().style.cursor = "";
                    map.current.setLayoutProperty(
                        leaveID,
                        "visibility",
                        "none"
                    );
                    destinationMarker.remove();
                });
            }
            return crafts;
        };
        const listData = async () => {
            const crafts = await setMapData();
            const charters = await getCharters(
                crafts,
                setCharters,
                page,
                rowsPerPage,
                filter.startDate,
                filter.endDate
            );
            setTotal(charters.total);
        };
        listData();
    }, []);

    useEffect(() => {
        if (!map.current) return;
        if (map.current) {
            map.current.on("move", () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        }
    }, []);
    useEffect(() => {
        const nextCharterPage = async () => {
            if (aircraft) {
                const charter = await getCharters(
                    aircraft,
                    setCharters,
                    page,
                    rowsPerPage,
                    filter.startDate,
                    filter.endDate
                );
                setTotal(charter.total);
            } else {
                const charters = await getCharters(
                    aircrafts,
                    setCharters,
                    page,
                    rowsPerPage,
                    filter.startDate,
                    filter.endDate
                );
                setTotal(charters.total);
            }
        };
        nextCharterPage();
    }, [page, rowsPerPage, aircrafts, filter]);

    const handleFilter = () => setOpen(!open);
    const handleChange = (evt) => {
        setAircrafts({ ...aircrafts, [evt.target.name]: evt.target.checked });
    };
    const handlePaths = (evt) => {
        charters?.map((el, i) => {
            if (el.id === evt.currentTarget.firstChild.id) {
                if (
                    (evt.currentTarget.firstChild.ariaExpanded === "true" &&
                        evt.target.ariaLabel !== "details") ||
                    (map.current.getLayer(el.id) &&
                        evt.target.ariaLabel !== "details")
                ) {
                    map.current.removeLayer(el.id);
                    map.current.removeSource(el.id);
                    if (map.current.getLayer(`Destination${el.id}`)) {
                        map.current.removeLayer(`Destination${el.id}`);
                        map.current.removeSource(`Destination${el.id}`);
                    }
                    if (map.current.getLayer(`Path${el.id}`)) {
                        map.current.removeLayer(`Path${el.id}`);
                        map.current.removeSource(`Path${el.id}`);
                    }
                }
                if (evt.currentTarget.firstChild.ariaExpanded === "false") {
                    map.current.addSource(el.id, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: el,
                            geometry: {
                                type: "Point",
                                coordinates: el.deptGeo,
                            },
                        },
                    });
                    map.current.addLayer({
                        id: el.id,
                        type: "circle",
                        source: el.id,
                        layout: {
                            visibility: "visible",
                        },
                        paint: {
                            "circle-color": ["get", "statusColor"],
                            "circle-radius": 8,
                            "circle-stroke-width": 4,
                        },
                    });
                    map.current.addSource(`Destination${el.id}`, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: el,
                            geometry: {
                                type: "Point",
                                coordinates: el.arrvGeo,
                            },
                        },
                    });
                    map.current.addLayer({
                        id: `Destination${el.id}`,
                        type: "circle",
                        source: `Destination${el.id}`,
                        layout: {
                            visibility: "visible",
                        },
                        paint: {
                            "circle-color": ["get", "statusColor"],
                            "circle-radius": 8,
                            "circle-stroke-width": 4,
                            "circle-stroke-color": "#FFFFFF",
                        },
                    });
                    map.current.addSource(`Path${el.id}`, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: el,
                            geometry: {
                                type: "LineString",
                                coordinates: el.path,
                            },
                        },
                    });
                    map.current.addLayer({
                        id: `Path${el.id}`,
                        type: "line",
                        source: `Path${el.id}`,
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                            visibility: "visible",
                        },
                        paint: {
                            "line-color": ["get", "pathColor"],
                            "line-width": 2.5,
                            "line-dasharray": [1, 2],
                        },
                    });
                    map.current.flyTo({
                        center: el.deptGeo,
                        zoom: 3.5,
                        duration: 1500, // Animate over 11.5 seconds
                        essential: true,
                    });
                }
            }
        });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (map.current.getLayer("aircrafts")) {
            map.current.removeLayer("aircrafts");
            map.current.removeSource("aircrafts");
        }
        const newGeo = await getLocations(
            aircrafts,
            filter.startDate,
            filter.endDate
        );
        const addLayer = () => {
            if (!map.current.getLayer("aircrafts")) {
                map.current.addSource("aircrafts", {
                    type: "geojson",
                    data: newGeo,
                });
                map.current.addLayer({
                    id: "aircrafts",
                    type: "circle",
                    source: "aircrafts",
                    layout: {
                        visibility: "visible",
                    },
                    paint: {
                        "circle-color": ["get", "statusColor"],
                        "circle-radius": 10,
                    },
                });
            }
        };
        addLayer();
        handleFilter();
    };

    return (
        <Box className="main">
            <Box className="box">
                {/* <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div> */}
                <Box className="details">
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        className="filterBar"
                    >
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel>SUBFLEET</InputLabel>
                            <Select
                                value={aircraft}
                                onChange={handleCraft}
                                autoWidth
                                label="SUBFLEET"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Object.keys(aircrafts)?.map((el, i) => {
                                    return (
                                        <MenuItem value={el} key={i}>
                                            {el}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <Button onClick={handleFilter}>
                            <FilterListIcon fontSize="large" />
                        </Button>
                    </Box>
                    <FilterModal
                        open={open}
                        handleFilter={handleFilter}
                        filter={filter}
                        updateFilter={updateFilter}
                        aircrafts={aircrafts}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <Box className="charters">
                        {charters?.map((el, i) => {
                            return (
                                <div key={i}>
                                    <Accordion onClick={handlePaths}>
                                        <AccordionSummary
                                            expandIcon={
                                                <ExpandMoreIcon
                                                    sx={{
                                                        color: `${el.pathColor}`,
                                                    }}
                                                />
                                            }
                                            aria-controls="panel1a-content"
                                            id={el.id}
                                        >
                                            <Box className="accordion">
                                                <CircleIcon
                                                    sx={{
                                                        color: `${el.statusColor}`,
                                                        width: "15px",
                                                        marginRight: "15px",
                                                    }}
                                                    fontSize="small"
                                                />
                                                <Typography>
                                                    {" "}
                                                    {el.subfleet}
                                                </Typography>
                                                <Typography>
                                                    {" "}
                                                    {el.team}
                                                </Typography>
                                                <Typography>
                                                    {" "}
                                                    {el.deptArp}
                                                </Typography>
                                                <ArrowForwardIcon fontSize="small" />
                                                <Typography>
                                                    {" "}
                                                    {el.arrvArp}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails aria-label="details">
                                            <Paper
                                                elevation={8}
                                                aria-label="details"
                                            >
                                                <Grid
                                                    container
                                                    spacing={1}
                                                    padding={3}
                                                    aria-label="details"
                                                >
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Departure Date:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {moment
                                                                .utc(el.effDate)
                                                                .format(
                                                                    "MMM Do, YYYY"
                                                                )}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Arrival Date:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {moment
                                                                .utc(el.effDate)
                                                                .format(
                                                                    "MMM Do, YYYY"
                                                                )}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Depart Time:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {el.deptTime}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Arrival Time:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {el.arrvTime}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Duration:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {el.blockTime}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={8}
                                                        display="flex"
                                                        gap={1}
                                                        aria-label="details"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            aria-label="details"
                                                        >
                                                            Service Type:
                                                        </Typography>
                                                        <Typography aria-label="details">
                                                            {el.serviceType}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            );
                        })}
                    </Box>
                    <TablePagination
                        className="pagination"
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
                <div ref={mapContainer} className="map-container" />
            </Box>
        </Box>
    );
}

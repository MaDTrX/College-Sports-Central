import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CSVLink } from "react-csv";


const headers = [
    { label: "CompEventDate", key: "date" },
    { label: "CompEventTime", key: "time" },
    { label: "CompEventName", key: "opponent" },
    { label: "CompEventLocName", key: "location" },
    { label: "VenueHostStatus", key: "at" },
];


function Schedules({ data, sport, year, school }) {

    let competitions = data[`${year}`].map(game => <Box sx={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', marginTop: '10px', backgroundColor: 'white' }}>
        <Grid container spacing={1} sx={{ margin: 'auto' }}>
            <Grid item md={1} >
                <Button sx={{ width: 100, height: 100 }}></Button>
            </Grid>
            <Grid item md={3} container >
                <Grid item container direction="column" spacing={1}>
                    <Grid item>
                        <Button sx={{ fontSize: '14px' }} variant="text" value="dateTime">{game.date}</Button>
                    </Grid>
                    <Grid item >
                        <Button sx={{ fontSize: '14px' }} variant="text" value="opponent">{game.at} {game.opponent}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid item container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 100 }} spacing={1}>
                    <Grid item >
                        <Button sx={{ fontSize: '12px' }} variant="text" value="location">{game.time}</Button>
                    </Grid>
                    <Grid item >
                        <Button sx={{ fontSize: '14px' }} variant="text" value="location">{game.location}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid item container sx={{ display: 'flex', alignItems: 'center', height: 100 }} direction="row" spacing={1}>
                    <Grid item>
                        <Button variant="text" value="air">AIR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" value="bus">BUS</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" value="stay">STAY</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    )



    return (
        <>
            <div style={{ marginTop: '100px' }}> {school} {year} {sport} Schedule <CSVLink data={data[year]} filename={`${school} ${sport} ${year}.csv`} headers={headers}>Download CSV</CSVLink></div>
            {competitions}
        </>
    )
}

export default Schedules

import express from "express"
import cors from "cors"
import aliasRouter  from "./routes/aliases.js"
import ncaaRouter from "./routes/ncaa.js"
import coordinateRouter from "./routes/coordinates.js"
import competitionRouter from "./routes/competition.js"
import distanceRouter from "./routes/distances.js"
import schoolInfoRouter from "./routes/schoolInfo.js"
import timezoneRouter from "./routes/timezones.js"
import schoolSportRouter from "./routes/schoolSports.js"
import airportRouter from "./routes/airports.js"
import aircraftRouter from "./routes/aircrafts.js"
import flightRouter from "./routes/flights.js"
import'./config/database.js'

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})


app.use('/aliases', aliasRouter);
app.use('/ncaa', ncaaRouter);
app.use('/coordinates', coordinateRouter);
app.use('/distances', distanceRouter);
app.use('/competitions', competitionRouter);
app.use('/timezones', timezoneRouter);
app.use('/schoolinfo', schoolInfoRouter);
app.use('/schoolSports', schoolSportRouter);
app.use('/airports', airportRouter);
app.use('/aircrafts', aircraftRouter);
app.use('/flights', flightRouter);


app.listen(process.env.PORT || 8080, () => console.log('server listening'))

export default app;
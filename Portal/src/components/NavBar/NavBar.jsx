import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as userService from "utilities/users-service";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import SignUpForm from "components/forms/SignUpForm/SignUpForm";
import LoginForm from "components/forms/LoginForm/LoginForm";
import "components/NavBar/navBar.css";



export default function NavBar({ user, hide, setUser, checked, handleChange }) {
    const [accordion, setAccordion] = React.useState([]);
    const [credentials, setCredentials] = React.useState(null);
    const [vh, setVh] = React.useState("");
    const [navState, setNavState] = React.useState(false);

    React.useEffect(() => {
        if (hide === undefined) {
            setVh("");
            setNavState(false);
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [hide]);

    function handleCred(evt) {
        if (evt.target.value === "signUp") {
            setCredentials(
                <SignUpForm setUser={setUser} setNavState={setNavState} />
            );
        } else if (evt.target.value === "logIn") {
            setCredentials(
                <LoginForm setUser={setUser} setNavState={setNavState} />
            );
        }
    }

    function handleStyle() {
        if (checked) {
            return "rgb(49, 49, 49)";
        } else {
            return "rgb(242, 241, 231)";
        }
    }

    function handleLogOut() {
        userService.logOut();
        window.open("http://localhost:8000/auth/logout", "_self");
        setUser(null);
    }

    function handleAccordion(evt) {
        if (evt.target.value === "conferences") {
            setVh("100vh");
            setNavState(!navState);
        } else if (
            evt.target.value === "logIn" ||
            evt.target.value === "signUp"
        ) {
            setVh("100vh");
            setNavState(true);
        } else if (evt.target.localName === "div"){
            setNavState(false);
        }
    }

    return (
        <Accordion
            sx={{ background: "#6cc5d7" }}
            expanded={navState}
            onClick={handleAccordion}
        >
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon sx={{ color: '#2196f3' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {user ? (
                    <>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid
                                item
                                xs={6}
                                container
                                direction="row"
                                alignItems="center"
                                gap={3}
                            >
                                {/* <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                                <a href="http://localhost:3000/">
                                    <img
                                        src={require("../../assets/shorts-logo.png")}
                                        alt="SHORTS-TRAVEL"
                                        width="30px"
                                        height="30px"
                                    ></img>
                                </a>
                                {/* <Button onClick={handleAccordion} className='link' value="conferences">SCHEDULES</Button> */}
                                {/* <Link to="/flights" className="link">
                                    FLIGHTS
                                </Link> */}
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <button
                                    onClick={handleLogOut}
                                    className="button"
                                    value="account"
                                >
                                    LOGOUT
                                </button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        {/* <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            /> */}
                        <button
                            onClick={handleCred}
                            className="button"
                            value="signUp"
                        >
                            SIGN UP
                        </button>
                        <button
                            onClick={handleCred}
                            className="button"
                            value="logIn"
                        >
                            LOG IN
                        </button>
                    </>
                )}
            </AccordionSummary>
            <Accordion sx={{ background: "#6cc5d7" }}>
                <AccordionDetails
                    sx={{
                        width: !user
                            ? { md: "50%", sm: "90%" }
                            : { md: "90%", sm: "90%" },
                        margin: "auto",
                    }}
                >
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                        alignItems="center"
                    >
                        {user ? <></> : <>{credentials}</>}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Accordion>
    );
}

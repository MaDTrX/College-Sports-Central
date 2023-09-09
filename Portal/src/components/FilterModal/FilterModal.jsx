import React, { useEffect } from "react";
import {
    Modal,
    Box,
    Paper,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import "components/FilterModal/filterModal.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function FilterModal({
    open,
    handleFilter,
    aircrafts,
    filter,
    updateFilter,
    handleChange,
    handleSubmit
}) {
    const checkboxes = Object.keys(aircrafts).map((el, i) => {
        return (
            <FormControlLabel key={i} className="checkbox"
                control={
                    <Checkbox
                        checked={aircrafts[el]}
                        onChange={handleChange}
                        name={el}
                    />
                }
                label={el}
            />
        );
    });


    return (
        <Modal open={open} onClose={handleFilter} className="modal">
            <Box className="modalBox">
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="form"
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box className="datePicker">
                            <DatePicker
                                label="Start Date"
                                value={filter.startDate}
                                onChange={(newValue) => {
                                    updateFilter({ startDate: newValue });
                                }}
                                renderInput={(params) => (
                                    <TextField size="small" {...params} />
                                )}
                            />
                            <Box display="flex" alignItems="center">
                                <ArrowForwardIcon />
                            </Box>
                            <DatePicker
                                label="End Date"
                                value={filter.endDate}
                                onChange={(newValue) => {
                                    updateFilter({ endDate: newValue });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        size="small"
                                        className="datePicker"
                                        {...params}
                                    />
                                )}
                            />
                        </Box>
                        <Box className="subfleet">{checkboxes}</Box>
                    </LocalizationProvider>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        padding={2}
                        width="90%"
                    >
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={handleFilter}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default FilterModal;

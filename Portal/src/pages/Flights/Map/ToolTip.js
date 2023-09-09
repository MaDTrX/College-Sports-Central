

export const toolTip = (description, moment) =>{
    return `<div>
    <div style="display: flex;">
        <h3>Charter Flight Details</h3> 
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Subfleet:</h4> 
        <p style="margin: 0"><a href="https://flightaware.com/live/flight/${description.subfleet}" target="_blank" title="Opens in a new window">${description.subfleet}</a></p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Team:</h4>
        <p style="margin: 0">${description.team}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Departure Airport:</h4>
        <p style="margin: 0">${description.deptArp}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Depart Date:</h4>
        <p style="margin: 0">${moment.utc(description.effDate).format("MMM Do, YYYY")}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Depart Time:</h4>
        <p style="margin: 0">${description.deptTime}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Arrival Airport:</h4>
        <p style="margin: 0">${description.arrvArp}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Arrival Date:</h4>
        <p style="margin: 0">${moment.utc(description.disDate).format("MMM Do, YYYY")}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Arrival Time:</h4>
        <p style="margin: 0">${description.arrvTime}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Duration:</h4>
        <p style="margin: 0">${description.blockTime}</p>
    </div>
    <div style="display: flex; gap: 8px; margin: 0">
        <h4 style="margin: 0">Service:</h4>
        <p style="margin: 0">${description.serviceType}</p>
    </div>
    <div style="display: flex; gap: 10px; margin: 0">
        <h4 style="margin: 0">Status:</h4>
        <p style="margin: 0">${description.status}</p>
    </div>
</div>
`
}
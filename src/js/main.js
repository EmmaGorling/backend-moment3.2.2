"use strict"

const url = 'https://backend-moment3-2-1.onrender.com/workexperiences';

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

async function getData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        writeData(data);
    } catch (error) {
        console.log('An error occured: ' + error);
    }
}

function writeData(workexperiences) {
    const writeDiv = document.getElementById('show');
    writeDiv.innerHTML = '';

    // Loop trough array an write it out
    if(workexperiences.length > 0) {
        workexperiences.forEach(workexperience => {
            // Get the dates and rewrite them
            const startDate = rewriteDate(workexperience.startdate);
            const endDate = rewriteDate(workexperience.enddate);
            
            console.log(startDate + ' - ' + endDate);
        });
    }
}

// Rewrite dates
function rewriteDate(date) {
    if(date === null) {
        return 'Pågående anställning.'
    } else {
        const newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        if(day < 10) {
            day = '0' + day;
        }
        if(month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${day}`;
    }
}
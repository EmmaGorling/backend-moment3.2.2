"use strict"

const url = 'https://backend-moment3-2-1.onrender.com/workexperiences';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewWorkExp();
    });
});

async function addNewWorkExp() {
    let companyname = document.getElementById('companyname').value;
    let jobtitle = document.getElementById('jobtitle').value;
    let location = document.getElementById('location').value;
    let startdate = document.getElementById('startdate').value;
    let enddate = document.getElementById('enddate').value;
    let description = document.getElementById('description').value;

    const messageDiv = document.getElementById('message');

    let workexperience = {
        companyname: companyname,
        location: location,
        jobtitle: jobtitle,
        startdate: startdate,
        enddate: enddate,
        description: description
    }
    

    try {
        const response = await fetch(url, {
            method:"POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(workexperience)
        });

        const data = await response.json();

        messageDiv.innerHTML = 'Din arbetserfarenhet har lagts till!';
    } catch (error) {
        messageDiv.innerHTML = data.errors;
    }
} 
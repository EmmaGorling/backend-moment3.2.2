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
    
    if(companyname != null && jobtitle != null && location != null && startdate != null && description != null) {
        messageDiv.innerHTML = 'Du behöver fylla i de fält som är obligatoriska';
        
    } else {
        try {
            const response = await fetch(url, {
                method:"POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(workexperience)
            });

            if(response.ok) {
                messageDiv.innerHTML = 'Din arbetserfarenhet har lagts till!';
            } else {
                messageDiv.innerHTML = 'Felaktigt inmatning.'
            };        
        } catch (error) {
            messageDiv.innerHTML = errors.message;
        }
    }
} 
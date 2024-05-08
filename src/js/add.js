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
    let companyname = document.getElementById('companyname');
    let jobtitle = document.getElementById('jobtitle');
    let location = document.getElementById('location');
    let startdate = document.getElementById('startdate');
    let enddate = document.getElementById('enddate');
    let description = document.getElementById('description');

    const messageDiv = document.getElementById('message');

    let workexperience = {
        companyname: companyname.value,
        location: location.value,
        jobtitle: jobtitle.value,
        startdate: startdate.value,
        enddate: enddate.value,
        description: description.value
    }
    
    if(companyname.value.length < 0 || jobtitle.value.length < 0 || location.value.length < 0 || startdate.value.length < 0 || description.value.length < 0) {
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

            // Rensa inmatning vid lyckat anrop
            companyname.value = '';
            jobtitle.value = '';
            location.value = '';
            startdate.value = null;
            enddate.value = null;
            description.value = '';

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
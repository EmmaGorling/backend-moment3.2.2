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
            // Create and add article-elements
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>${workexperience.companyname}, ${workexperience.location}</h3>
                <h4>${workexperience.jobtitle}</h4>
                <p><strong>Arbetsbeskrivning: </strong> ${workexperience.description}</p>
                <p><strong>Anställningsperiod: </strong> ${startDate} <strong>-</strong> ${endDate}</p>`;

            writeDiv.appendChild(article);
            // Change-button
            const changeBtn = document.createElement('button');
            changeBtn.textContent = 'Ändra';
            changeBtn.classList = 'change';
            article.appendChild(changeBtn);
            changeBtn.addEventListener('click', () => {
                addChanges(workexperience, startDate, endDate);
            })
            // Delete-button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Ta bort';
            deleteBtn.classList = 'delete';
            article.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', () => {
                deleteWorkExp(workexperience._id);
            });
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

// Change workexperience
function addChanges(workexperience, startDate, endDate) {
    toggleChangeForm();
    // Set the values of inputs to existing object
    let companynameInput = document.getElementById('changeCompanyname');
    let jobtitleInput = document.getElementById('changeJobtitle');
    let locationInput = document.getElementById('changeLocation');
    let startDateInput = document.getElementById('changeStartdate');
    let endDateInput = document.getElementById('changeEnddate');
    let descriptionInput = document.getElementById('changeDescription');

    companynameInput.value = workexperience.companyname;
    jobtitleInput.value = workexperience.jobtitle;
    locationInput.value = workexperience.location;
    startDateInput.value = startDate;
    endDateInput.value = endDate;
    descriptionInput.value = workexperience.description;

    // Form eventlistener
    const changeForm = document.getElementById('changeForm');
    changeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateWorkExp(workexperience._id);
    });
};

async function updateWorkExp(id) {
    // Get the new values from inputs
    let workexperience = {
        companyname: document.getElementById('changeCompanyname').value,
        location: document.getElementById('changeLocation').value,
        jobtitle: document.getElementById('changeJobtitle').value,
        startdate: document.getElementById('changeStartdate').value,
        enddate: document.getElementById('changeEnddate').value,
        description: document.getElementById('changeDescription').value
    }
    
    // Fetch with put method
    try {
        const response = await fetch(url + '/' + id, {
            method: "PUT",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(workexperience)
        });
        const data = await response.json();

        console.log(data);
        // Get data again and write it out
        getData();

        toggleChangeForm();
    } catch (error) {
        console.log(error);
    }
}

// Remove a workexperience
async function deleteWorkExp(id) {
    // Fetch with delete-method
    try {
        const response = await fetch(url + '/' + id, {
            method: "DELETE",
            headers: {
            "content-type": "Applicaton/json"
            }
        });
        const data = await response.json();
        // Get data again and write it out
        getData();
    } catch (error) {
        console.log(error);
    }
}

// Toggle form
function toggleChangeForm() {
    const changeForm = document.getElementById('changeForm');

    if(changeForm.style.display === 'block') {
        changeForm.style.display = 'none';
    } else {
        changeForm.style.display = 'block';
    }
}
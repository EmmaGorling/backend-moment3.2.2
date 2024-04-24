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
                changeWorkExp(workexperience);
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
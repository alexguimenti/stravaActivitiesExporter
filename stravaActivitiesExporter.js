// Initialize the array to store activities
var activities = [];

// Get the total number of activities from the DOM and calculate the number of pages
var totalActivites = document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace('.', '').split(' ')[0];
var totalPages = Math.floor(totalActivites / 20 + 1);
var done = 0;

// Function to remove accents only from letters, keeping special characters like "/" for dates
function removeAccentsFromLetters(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents from letters
               .replace(/([^\w\s\/:.-])/gi, ''); // Remove unwanted punctuation but keep dates and special chars
}

// Function to convert an array of objects to CSV, ensuring no empty fields cause issues
function convertToCSV(arr) {
    if (arr.length === 0) return ''; // Avoid processing an empty array

    const headers = Object.keys(arr[0]);
    const headerLine = headers.join(',');

    const values = arr.map(activity => {
        return headers.map(header => {
            let value = activity[header] || ''; // Replace missing values with empty strings
            value = value.toString().replace(',', '.'); // Handle commas in the values
            return removeAccentsFromLetters(value);  // Remove accents only from letters, keeping dates and other symbols
        }).join(',');
    }).join('\n');

    return headerLine + '\n' + values;
}

// Function to collect data from all pages in parallel
function fetchActivities(totalPages) {
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
        requests.push(jQuery.ajax({
            url: `https://www.strava.com/athlete/training_activities?page=${page}&per_page=20`,
            dataType: "json",
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8" // Force UTF-8 encoding
            }
        }).done(data => {
            // Process each page's activities as they arrive
            data.models.forEach(activity => {
                activities.push(activity);
            });
            done++;
            if (done % 10 === 0 || done === totalPages) {
                console.log(Math.round(done * 100 / totalPages) + '%');
            }
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error(`Error on page ${page}: ${textStatus}, ${errorThrown}`);
        }));
    }

    return jQuery.when.apply(jQuery, requests); // Wait for all requests to complete
}

// Fetch all pages and process activities
fetchActivities(totalPages).done(() => {
    console.log('\nDONE!!!');
    console.log("\nIf download didn't start, check browser window to enable permission");

    // Check if there are any activities collected
    if (activities.length > 0) {
        // Convert activities to CSV and trigger download
        let csv = convertToCSV(activities);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'activities.csv';
        hiddenElement.click();
    }
}).fail(error => {
    console.error('Error fetching activities:', error);
});

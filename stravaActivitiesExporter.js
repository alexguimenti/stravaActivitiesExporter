// Initialize the array to store activities
var activities = [];

// Get the total number of activities from the DOM and calculate the number of pages
var totalActivites = document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace('.', '').split(' ')[0];
var totalPages = Math.floor(totalActivites / 20 + 1);
var currentPage = 1;
var done = 0;

// Function to convert an array of objects to CSV, ensuring no empty fields cause issues
function convertToCSV(arr) {
    if (arr.length === 0) return ''; // Avoid processing an empty array

    const headers = Object.keys(arr[0]);
    const headerLine = headers.join(',');

    const values = arr.map(activity => {
        return headers.map(header => {
            const value = activity[header] || ''; // Replace missing values with empty strings
            return value.toString().replace(',', '.'); // Handle commas in the values
        }).join(',');
    }).join('\n');

    return headerLine + '\n' + values;
}

// Loop through all pages and collect activities
while (currentPage <= totalPages) {
    jQuery.ajax({
        url: `https://www.strava.com/athlete/training_activities?page=${currentPage}&per_page=20`,
        dataType: "json",
        method: "get",
        success: function (data) {
            try {
                // Add each activity to the activities array
                for (var activity in data.models) {
                    activities.push(data.models[activity]);
                }
                done++;
                console.log(Math.round(done * 100 / totalPages) + '%');

                // Display each header and its corresponding value for each activity in the console
                activities.forEach((activity, index) => {
                    //console.log(`Activity ${index + 1}:`);
                    Object.entries(activity).forEach(([key, value]) => {
                        //console.log(`  ${key}: ${value}`);
                    });
                });

                // If all pages have been processed
                if (done >= totalPages) {
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
                }
            } catch (error) {
                console.error('Error processing data:', error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(`Error on page ${currentPage}: ${textStatus}, ${errorThrown}`);
        }
    });
    currentPage++;
}

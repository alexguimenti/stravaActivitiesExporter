var activities = [];
var totalActivites = document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace('.', '').split(' ')[0];
var totalPages = Math.floor(totalActivites / 20 + 1);
var currentPage = 1
var done = 0;

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}


while (currentPage <= totalPages) {

  jQuery.ajax({
    url: `https://www.strava.com/athlete/training_activities?page=${currentPage}&per_page=20`,
    dataType: "json",
    method: "get",
    success: function (data) {
      for (activity in data.models) {
        activities.push(data.models[activity])
      }
      done++
      console.log(Math.round(done * 100 / totalPages) + '%')
      if (done >= totalPages) {
        console.log('\nDONE!!!')
        console.log("\nIf download didn't started, check browser window to enable permission")

        let csv = '';
        let header = Object.keys(activities[0]).join(',');
        let values = activities.map(o => Object.values(o).join(',')).join('\n');

        csv += header + '\n' + values;

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'activites.csv';
        hiddenElement.click();
      }
    }
  })
  currentPage++
}


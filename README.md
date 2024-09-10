# Strava Activities Exporter

<h1 align="center">
<br>
  <img src="https://powerhousebrasil.com.br/wp-content/uploads/2022/01/logo-strava-1.png" alt="Ecoleta" width="120">
<br>
<br>
Strava Activities Exporter
</h1>


<p align="center">This script enable user to export to csv/excel all activities in Strava</p>


[//]: # "Add your gifs/images here:"


<hr />

## Features

[//]: # "Add the features of your project here:"

Applied Tecnologies

- 🧾 **JavaScipt**;
- 💻 **Ajax**;


## Getting started

1. Login into Strava website on Desktop (doesn't work on mobile);
2. Access the page 'https://www.strava.com/athlete/training';
3. Open the Broswer DevTools (ctrl + shift + i for Google Chrome);
4. Access the 'Console' tab;
5. Copy the following script and press 'Enter':


```javascript
var activities=[];var totalActivites=document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace('.','').split(' ')[0];var totalPages=Math.floor(totalActivites/20+1);var done=0;function removeAccentsFromLetters(text){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/([^\w\s\/:.-])/gi,'');}function convertToCSV(arr){if(arr.length===0)return'';const headers=Object.keys(arr[0]);const headerLine=headers.join(',');const values=arr.map(activity=>{return headers.map(header=>{let value=activity[header]||'';value=value.toString().replace(',','.');return removeAccentsFromLetters(value);}).join(',');}).join('\n');return headerLine+'\n'+values;}function fetchActivities(totalPages){const requests=[];for(let page=1;page<=totalPages;page++){requests.push(jQuery.ajax({url:`https://www.strava.com/athlete/training_activities?page=${page}&per_page=20`,dataType:"json",method:"get",headers:{"Content-Type":"application/json; charset=utf-8"}}).done(data=>{data.models.forEach(activity=>{activities.push(activity);});done++;if(done%10===0||done===totalPages){console.log(Math.round(done*100/totalPages)+'%');}}).fail((jqXHR,textStatus,errorThrown)=>{console.error(`Error on page ${page}: ${textStatus}, ${errorThrown}`);}));}return jQuery.when.apply(jQuery,requests);}fetchActivities(totalPages).done(()=>{console.log('\nDONE!!!');console.log("\nIf download didn't start, check browser window to enable permission");if(activities.length>0){let csv=convertToCSV(activities);var hiddenElement=document.createElement('a');hiddenElement.href='data:text/csv;charset=utf-8,'+encodeURI(csv);hiddenElement.target='_blank';hiddenElement.download='activities.csv';hiddenElement.click();}}).fail(error=>{console.error('Error fetching activities:',error);});
```
<hr />



https://user-images.githubusercontent.com/25828420/177010111-b852bff8-80ae-4baf-9e78-0cb5f4553f14.mp4

## Important

It's possible to be necessary to give  permission to enable download


<hr />

## Split text into different columns

Open the Excel spreadsheet where you want to save the data and click the Data tab.
1. Select the cell or column that contains the text you want to split.
2. Select Data > Text to Columns.
3. In the Convert Text to Columns Wizard, select Delimited > Next.
4. Select the Delimiters for your data. In this case, 'comma'.
5. Select Next.
6. Select the Destination in your worksheet which is where you want the split data to appear.
7. Select Finish.

[screen-recorder-sat-jul-02-2022-14-25-15.webm](https://user-images.githubusercontent.com/25828420/177010346-e20c7eb4-0617-4f8b-9778-d46b08010323.webm)


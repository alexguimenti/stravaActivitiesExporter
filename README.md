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
var activities=[],totalActivites=document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace(".","").split(" ")[0],totalPages=Math.floor(totalActivites/20+1),done=0;function removeAccentsFromLetters(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/([^\w\s\/:.-])/gi,"")}function convertToCSV(e){if(0===e.length)return"";let t=Object.keys(e[0]),r=t.join(","),i=e.map(e=>t.map(t=>{let r=e[t]||"";return removeAccentsFromLetters(r=r.toString().replace(",","."))}).join(",")).join("\n");return r+"\n"+i}function fetchActivities(e){let t=[];for(let r=1;r<=e;r++)t.push(jQuery.ajax({url:`https://www.strava.com/athlete/training_activities?page=${r}&per_page=20`,dataType:"json",method:"get",headers:{"Content-Type":"application/json; charset=utf-8"}}).done(t=>{t.models.forEach(e=>{activities.push(e)}),(++done%10==0||done===e)&&console.log(Math.round(100*done/e)+"%")}).fail((e,t,i)=>{console.error(`Error on page ${r}: ${t}, ${i}`)}));return jQuery.when.apply(jQuery,t)}fetchActivities(totalPages).done(()=>{if(console.log("\nDONE!!!"),console.log("\nIf download didn't start, check browser window to enable permission"),activities.length>0){let e=convertToCSV(activities);var t=document.createElement("a");t.href="data:text/csv;charset=utf-8,"+encodeURI(e),t.target="_blank",t.download="activities.csv",t.click()}}).fail(e=>{console.error("Error fetching activities:",e)});
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


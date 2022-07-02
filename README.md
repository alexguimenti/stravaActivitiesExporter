# stravaActivitiesExporter

<h1 align="center">
<br>
  <img src="https://powerhousebrasil.com.br/wp-content/uploads/2022/01/logo-strava-1.png" alt="Ecoleta" width="120">
<br>
<br>
Strava Activities Exporter
</h1>


<p align="center">This script enable user to export all activities in Strava</p>


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
var activities=[],totalActivites=document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace(".","").split(" ")[0],totalPages=Math.floor(totalActivites/20+1),currentPage=1,done=0;function convertToCSV(a){let b=[Object.keys(a[0])].concat(a);return b.map(a=>Object.values(a).toString()).join("\n")}for(;currentPage<=totalPages;)jQuery.ajax({url:`https://www.strava.com/athlete/training_activities?page=${currentPage}&per_page=20`,dataType:"json",method:"get",success:function(b){for(activity in b.models)activities.push(b.models[activity]);if(done++,console.log(Math.round(100*done/totalPages)+"%"),done>=totalPages){console.log("\nDONE!!!"),console.log("\nIf download didn't started, check browser window to enable permission");let c="",d=Object.keys(activities[0]).join(","),e=activities.map(a=>Object.values(a).join(",")).join("\n");c+=d+"\n"+e;var a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURI(c),a.target="_blank",a.download="activites.csv",a.click()}}}),currentPage++
```
<hr />


[//]: # "Add the features of your project here:"
Important
Maybe you will have to give the permission to enable download

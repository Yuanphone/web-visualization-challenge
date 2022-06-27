//1.read in samples.json from URL
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Promise Pending// d3.json //how to scrape api data
const dataPromise = d3.json(url);
//print statement
console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
// then=success
d3.json(url).then(function(data) {
console.log(data);
console.log(data.metadata);
console.log(data.metadata[0])
console.log(data["samples"])
console.log(data.samples[0].id)
console.log(data.samples[0].sample_values)

var top10Data=[];
var wholesample=[];
// for bar chart

for(var row = 0; row < data.samples.length; row++){
    var listOfObjects = [];
    for (var i = 0; i < data.samples[row].sample_values.length; i++) {
        var singleObj={};
        singleObj["id"]=data.samples[row].id;
        singleObj["otu_ids"]=data.samples[row].otu_ids[i];
        singleObj["sample_values"]=data.samples[row].sample_values[i];
        singleObj["otu_labels"]=data.samples[row].otu_labels[i];
        listOfObjects.push(singleObj);
    }
    let sortedData=listOfObjects.sort((a, b) => b.sample_values-a.sample_values);
    // Slice the first 10 objects for plotting
    slicedData = sortedData.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    reversedData = slicedData.reverse();
    top10Data.push(reversedData);
    wholesample.push(listOfObjects)
    // console.log(reversedData)
    // console.log(wholesample)
    
    // for(var j = 0; j < reversedData.length; j++){
    //     console.log(reversedData[j].sample_values)//wrong
    // }
}

console.log(top10Data);
console.log(top10Data[0][0].sample_values);

var SampleValue=[];
var Otu_ids=[];
var Label=[];
var Id=[];
var otuids=[]
for(var row = 0; row < top10Data.length; row++){
    var rowSampleValue=[];
    var rowOtu_ids=[];
    var rowLabel=[];
    var rowId=[];
    var rowids=[]
    for(var j = 0; j < top10Data[row].length; j++){
    rowSampleValue.push(top10Data[row][j].sample_values);
    rowOtu_ids.push("OTU "+top10Data[row][j].otu_ids);
    rowids.push(top10Data[row][j].otu_ids);
    rowLabel.push(top10Data[row][j].otu_labels);
    rowId.push(top10Data[row][j].id);
    }
    SampleValue.push(rowSampleValue);
    Otu_ids.push(rowOtu_ids);
    Label.push(rowLabel);
    Id.push(rowId);
    otuids.push(rowids);
}
console.log(listOfObjects[0].id)//1601
console.log(listOfObjects.length)//46
console.log(listOfObjects[0]) //last row for the same id
console.log(listOfObjects)//46 records for 1601 /last id
// console.log(Otu_ids[row])// should be under the for loop
// for bubble chart
var otuids=[];
var samplevalue=[];
var label=[];
var id=[]
for(var row = 0; row < wholesample.length; row++){
    var rowsamplevalue=[];
    var rowotuids=[];
    var rowlabel=[];
    var rowid=[];
    for(var j = 0; j <  wholesample[row].length; j++){
    rowsamplevalue.push( wholesample[row][j].sample_values);
    rowotuids.push( wholesample[row][j].otu_ids);
    rowlabel.push( wholesample[row][j].otu_labels);
    rowid.push(wholesample[row][j].id);
    }
    samplevalue.push(rowsamplevalue);
    otuids.push(rowotuids);
    label.push(rowlabel);
    id.push(rowid);
}
let color=[];
for(var row = 0; row < wholesample.length; row++){
    for (var k = 0; k < otuids[row].length; k++){
        // console.log(otuids[row].length)
    // console.log(otuids[0][0]);
           if(otuids[row][k]<250){
                color.push('rgb(93, 164, 214)');
            }
           else if (otuids[row][k]<500){
            color.push('rgb(44, 160, 101)');
            }
           else if (otuids[row][k]<1000){
            color.push('rgb(120,120,120)');
           }
           else if(otuids[row][k]<1500){
            color.push('rgb(255, 65, 54)');
           }
           else if(otuids[row][k]>1500){
            color.push('rgb(255, 144, 14)');
           }
        }

}
let size=[];
for(var row = 0; row < wholesample.length; row++){
    for (var j = 0; j < samplevalue[row].length; j++){
        if(samplevalue[row][j]<10){
               size.push(10);
        }
        else if(samplevalue[row][j]<25){
               size.push(20);
        }
        else if(samplevalue[row][j]<50){
               size.push(30);
        }
        else if(samplevalue[row][j]<100){
                size.push(60);
        }
        else if(samplevalue[row][j]<150){
                size.push(80);
        }
        else if(samplevalue[row][j]<200){
                size.push(100);
        }
    }
}
//for metadata
var metadata= [];
    for (var i = 0; i < data.metadata.length; i++) {
        var singleObj3={};
        singleObj3["id"]=data.metadata[i].id;
        singleObj3["ethnicity"]=data.metadata[i].ethnicity;
        singleObj3["gender"]=data.metadata[i].gender;
        singleObj3["age"]=data.metadata[i].age;
        singleObj3["location"]=data.metadata[i].location;
        singleObj3["bbtype"]=data.metadata[i].bbtype;
        singleObj3["wfreq"]=data.metadata[i].wfreq;
        metadata.push(singleObj3);
    }
console.log(metadata[0].id)

function init(){
    let trace1 = {
    // x: reversedData.map(object => object.singleObj["sample_values"]),
    x: SampleValue[0],
    // y: reversedData.map(object => object.singleObj["otu_ids"]),
    y: Otu_ids[0],
    // text: reversedData.map(object => object.singleObj["otu_labels"]),
    text: Label[0],
    type: "bar",
 
    orientation: "h"
     };
let traceData = [trace1];
let layout = {
    title:"Top 10 Bacteria Cultures Found",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
    };
Plotly.newPlot("bar", traceData, layout);
// for bubble chart
var trace2 = {
    x: otuids[0],
    y: samplevalue[0],
   text: label[0],
   mode: 'markers',
   marker: {
      color:color,
       size:size  
   }
};

var databubble = [trace2];

var layout2 = {
title: 'Bacteria Cultures per Sample',
showlegend: false,
height: 550,
width: 1000
};

Plotly.newPlot('bubble', databubble, layout2);

// for gauge
var gaugeData = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata[0].wfreq,
        title: {text: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week'},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
                { range: [0, 1], color: 'rgb(248, 243, 236)' },
                { range: [1, 2], color: 'rgb(244, 241, 229)' },
                { range: [2, 3], color: 'rgb(233, 230, 202)' },
                { range: [3, 4], color: 'rgb(229, 231, 179)' },
                { range: [4, 5], color: 'rgb(213, 228, 157)' },
                { range: [5, 6], color: 'rgb(183, 204, 146)' },
                { range: [6, 7], color: 'rgb(140, 191, 136)' },
                { range: [7, 8], color: 'rgb(138, 187, 143)' },
                { range: [8, 9], color: 'rgb(133, 180, 138)' },
            ],
        }
    }
];

var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

Plotly.newPlot('gauge', gaugeData, gaugeLayout);
// for metadata
let metatable=d3.select('#sample-metadata').append("table")
let metarow=metatable.append('tr')
let tabledata=metarow.append('td')
let metaid=tabledata.text('ID:'+metadata[0].id)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let ethnicity=tabledata.text('Ethnicity:'+metadata[0].ethnicity)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let gender=tabledata.text('Gender:'+metadata[0].gender)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let age=tabledata.text('Age:'+metadata[0].age)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let location=tabledata.text('Location:'+metadata[0].location)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let bb=tabledata.text('BB Type:'+metadata[0].bbtype)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let freq=tabledata.text('Wfreq:'+metadata[0].wfreq)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')

}
var idValues=data.names;
idValues.forEach(id=>d3.select('#selDataset').append('option').text(id).property("value",id));
// var currentID = d3.selectAll("#selDataset").node().value;
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    var metaDataSelectedRow=-1;

for(var each= 0; each < metadata.length; each++){
    console.log(metadata[each].id+" dataset "+dataset);
    if(metadata[each].id==dataset){
        metaDataSelectedRow=each;
        break;
    }
}
    // for metadata
for(var each= 0; each < metadata.length; each++){
        console.log(metadata[each].id+" dataset "+dataset);
        if(metadata[each].id==dataset){
            metaDataSelectedRow=each;
            break;
        }
}
console.log(metaDataSelectedRow)
// d3.select('#sample-metadata').remove("table")
let metatable=d3.select('#sample-metadata').append("table")
let metarow=metatable.append('tr')
let tabledata=metarow.append('td')
let metaid=tabledata.text('ID:'+metadata[metaDataSelectedRow].id)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let ethnicity=tabledata.text('Ethnicity:'+metadata[metaDataSelectedRow].ethnicity)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let gender=tabledata.text('Gender:'+metadata[metaDataSelectedRow].gender)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let age=tabledata.text('Age:'+metadata[metaDataSelectedRow].age)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let location=tabledata.text('Location:'+metadata[metaDataSelectedRow].location)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let bb=tabledata.text('BB Type:'+metadata[metaDataSelectedRow].bbtype)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')
let freq=tabledata.text('Wfreq:'+metadata[metaDataSelectedRow].wfreq)
metarow=tabledata.append('tr')
tabledata=metarow.append('td')



    // Initialize an empty array 
    let x = [];
    let y=[];
    let text=[];
    for(var row = 0; row < top10Data.length; row++){
        console.log(Id[row][0]+" dataset "+dataset);
       if(Id[row][0]===dataset) {
           x=SampleValue[row];
        // y: reversedData.map(object => object.singleObj["otu_ids"]),
           y=Otu_ids[row];
        // text: reversedData.map(object => object.singleObj["otu_labels"]),
           text=Label[row];
           break;
        }
    }
 //function to update the chart
Plotly.restyle("bar", "x", [x]);
Plotly.restyle("bar", "y", [y]);
Plotly.restyle("bar", "text", [text]);
let x2 = [];
let y2=[];
let text2=[];
for(var row = 0; row < wholesample.length; row++){
    console.log(Id[row][0]+" dataset "+dataset);
   if(id[row][0]===dataset) {
       x2=otuids[row];
    // y: reversedData.map(object => object.singleObj["otu_ids"]),
       y2=samplevalue[row];
    // text: reversedData.map(object => object.singleObj["otu_labels"]),
       text2=label[row];
       break;
    }
}
//function to update the chart
Plotly.restyle("bubble", "x", [x2]);
Plotly.restyle("bubble", "y", [y2]);
Plotly.restyle("bubble", "text", [text2]);
let value=[];
for(var row = 0; row < metadata.length; row++){
   if(metadata[row].id==dataset) {
       value=metadata[row].wfreq
       break;
    }
}
//function to update the chart
Plotly.restyle("gauge", "value", [value]);

}


init();


})

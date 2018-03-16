// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFyET5a6iGlE0sSxlZSxdZ8HLlPCyULEI",
    authDomain: "trainsrcool-81c70.firebaseapp.com",
    databaseURL: "https://trainsrcool-81c70.firebaseio.com",
    projectId: "trainsrcool-81c70",
    storageBucket: "trainsrcool-81c70.appspot.com",
    messagingSenderId: "406734118254"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var minsAway;
var arrivalTime;

$("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    }
    database.ref().push(newTrain);
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);


    alert("You added a new train!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

});

database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val());

    //store info into variables
    var trainName = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().first;
    var frequency = snapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var currentTime = moment();
    var initialTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(initialTime), "minutes");
    var remainingTime = timeDiff % frequency;
    arrival = moment().add(minsAway, "minutes");
    minsAway = frequency - remainingTime;
    arrivalTime = moment(arrival).format('MMMM Do YYYY, h:mm:ss a');

    //add to trainTable
    var trainInfo = $('<tr>');
    trainInfo.append(`<td>${trainName}</td>`);
    trainInfo.append(`<td>${destination}</td>`);
    trainInfo.append(`<td>${frequency}</td>`);
    trainInfo.append(`<td>${arrivalTime}</td>`);
    trainInfo.append(`<td>${minsAway}</td>`);
    $('#trainTable').append(trainInfo);

}, function(errorObject) {

    console.log("ERRORS: " + errorObject.code);

});
// });
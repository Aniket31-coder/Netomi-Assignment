var validators = [
      {
        "field": "name",
        "validator": [
            { "required": true }, 
            { "minlengthname": 4 }, 
            {"maxlengthname": 10 }]
      },
      {
        "field": "email",
        "validator": [{ "required": true }, { "email": true }]
      },
      {
        "field": "phone",
        "validator": [{ "required": true }, { "mobile": { "length" : 10} } ]
      },
      {
        "field": "country",
        "validator": [{ "required": true }]
      },
      {
        "field": "state",
        "validator": [{ "required": true }]
      }
    ];

// Listening for postMessage event from the iframe and displaying the result on the screen
window.addEventListener("message", function(event) {
    if (event.source !== parent && event.origin !== "https://netomi-form-assignment.vercel.app/") return;
    if (typeof event.data === "string") {
        var response = JSON.parse(event.data)
        if("Success" in response) document.getElementById("myFrame").style.borderColor = "green";
        else document.getElementById("myFrame").style.borderColor = "red";
        const resultDiv = document.getElementById("result");
        resultDiv.innerText = "Result: "+ event.data;
    }
  });
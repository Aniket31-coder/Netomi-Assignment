// Using Countriesnow.space API to fetch both countries as well as states
fetch("https://countriesnow.space/api/v0.1/countries/states")
  .then((response) => response.json())
  .then((data) => {
    const countrySelect = document.getElementById("country");
    const stateSelect = document.getElementById("state");

    // Looping through each country and adding it in the dropdown menu
    data.data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });

    // Checking for changes in the country selected, if the country is changed, we would update the states accordingly
    countrySelect.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      // Checking for the states of that particular selected country.
      const countryData = data.data.find((c) => c.name === selectedCountry);
      if (countryData) {
        const states = countryData.states;
        // console.log(countryData); Consoling the country data, which also contains the names of the states
        stateSelect.innerHTML = ""; // Clear the previous state selection from the state field.
        states.forEach((state) => {
          const option = document.createElement("option");
          option.value = state.name;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error while fetching from API of countries and states", error);
  });

  function checkValidity(emailValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Using Regular Expression to check for validity of emails.
    return emailRegex.test(emailValue);
  }

  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;

    // Validating each value using the validators from the main window
    const validators = parent.validators || []
    //Storing errors
    const errors = {};

    if(Array.isArray(validators)) {
        validators.forEach((validator) => {
            const field = validator.field;
            const value = field === "name" ? name :
                          field === "email" ? email :
                          field === "phone" ? contact :
                          field === "country" ? country :
                          field === "state" ? state : null;
            if (value !== null) {
                validator.validator.forEach((rule) => {
                    if(rule.required && !value.trim()) errors[field] = { error: "Please fill this field, it is required." };
                    
                    else if(rule.minlengthname && value.length < rule.minlengthname) 
                        errors[field] = { error: `Length should be in between 4-10 characters.` };

                    else if(rule.maxlengthname && value.length > rule.maxlengthname) 
                        errors[field] = { error: `Length should be in between 4-10 characters.` };
                    
                    else if(rule.email && !checkValidity(email)) 
                        errors[field] = { error: "Please enter a valid email address."};
                    
                    else if(rule.mobile && value.length !== rule.mobile.length) 
                        errors[field] = { error: "Mobile number should contain 10 digits."};
                });
            }
          });
    }

    if(Object.keys(errors).length === 0) {
        const result = { Success: "All fields are valid." };
        console.log(JSON.stringify(result));
        parent.postMessage(JSON.stringify(result), "*");
    } 
    else {
        const result = errors;
        console.log(JSON.stringify(result));
        parent.postMessage(JSON.stringify(result), "*");
    }
}  
/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle('dark-mode');
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
// and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);



/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***/
// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById('rsvp-button');

const addParticipant = (person) => {
  // Check that all required fields are present
  if (person.name && person.email && person.service) {
    // Create new <p> element with all info
    const newRSVP = document.createElement('p');
    newRSVP.textContent = `🎟️ ${person.name} (${person.email}) has requested ${person.service}.`;

    // Append to the RSVP list
    const participantDiv = document.querySelector('.rsvp-participants');
    participantDiv.appendChild(newRSVP);

    // Optional: reset form for convenience
    document.getElementById('rsvp-form').reset();
  } else {
    alert('Please fill out all fields before submitting.');
  }
};

// Step 3: Add a click event listener to the submit RSVP button here
// commented the line below as we added a new button in the 
// Form Validation part of the project
// rsvpButton.addEventListener('click', addParticipant);



/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
/*
const validateForm = () => {

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    let input = rsvpInputs[i];

    // Skip non-text inputs (meaning the buttons)
    if (input.type !== "text") continue;

    // TODO: Inside loop, validate the value of each input or validate value length
    if (input.value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error");  // highlights the input
    } else {
      input.classList.remove("error");  // clears error if valid
    }
  }

  // TODO: If no errors, call addParticipant() and clear fields
  if (!containsErrors) {
    addParticipant();

  // Clear each input field individually
  for (let i = 0; i < rsvpInputs.length; i++) {
    let input = rsvpInputs[i];
    if (input.type === "text") {
      input.value = "";
    }
  }
}

};
*/

// Replacing code from above to follow instruction given
// in Project Part 8
const validateForm = () => {
  let containsErrors = false;
  let rsvpInputs = document.getElementById("rsvp-form").elements;

  // Create person object with expected fields
  let person = {
    name: rsvpInputs["name"].value.trim(),
    email: rsvpInputs["email"].value.trim(),
    service: rsvpInputs["service"].value.trim()
  };

  // Validate each field in the person object
  for (let key in person) {
    let input = rsvpInputs[key];
    if (person[key].length < 2) {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  // Checking for email validity
  if (!isValidEmail(person.email)) {
    containsErrors = true;
    rsvpInputs["email"].classList.add("error");
  }

  // If no errors, submit and clear form
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person); // Shows the modal only if rsvp info given is valid

    // Clear each input field
    for (let key in person) {
      rsvpInputs[key].value = "";
    }
  }
  
  // Line below has been moved elsewhere to make a correction
  // as modal was showing regardless of info put in rsvp field
  // toggleModal(person); // Show the modal
};

// Needed to add the following code in order to not have 
// modal pop up if email given is invalid
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
// rsvpButton.addEventListener('click', validateForm);
// Had to do it this way as the event.preventDefault();
// line in addParticipant was messing up how the form 
// is supposed to act for this project
rsvpButton.addEventListener('click', (event) => {
  event.preventDefault();         // prevents form submission
  validateForm();                 // runs your validation logic
});


/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');
    const modalSubtext = document.getElementById('modal-subtext');
    
    // TODO: Update modal display to flex
    modal.style.display = 'flex';

    // TODO: Update modal text to personalized message
    modalText.textContent = 'Success: ✅ Quote Approved';
    modalSubtext.textContent = `Thanks for submitting your quote, ${person.name}! We can't wait to help you with your ${person.service} request.`;

    // Set modal timeout to 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
        // instruction from Step 5B of Part 8
        clearInterval(intervalId);
    }, 5000);

    // Set interval here to animate our modal image every half second
    // instruction from Step 5B of Part 8
    let intervalId = setInterval(animateImage, 500)
}

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.querySelector('#success-modal img');

const animateImage = () => {
  // Toggle rotation
  // using a tenary operator which acts like a short one-line if-else statement
  rotateFactor = rotateFactor === 0 ? -10 : 0;

  // Apply rotation to the image
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  modalImage.style.transition = 'transform 0.3s ease';

}
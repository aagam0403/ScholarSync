function validateForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let percentage = document.getElementById("percentage").value.trim();
    let marksheet = document.getElementById("marksheet").value;
    
    // Name Validation
    if (name === "" || !isNaN(name)) {
        alert("Invalid Name! Please enter a valid name.");
        return false;
    }

    // Phone Validation (10-digit)
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Invalid Phone Number! Enter a 10-digit number.");
        return false;
    }

    // Email Validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Invalid Email Address!");
        return false;
    }

    // Percentage Validation (Between 0 and 100)
    if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
        alert("Invalid Percentage! Enter a number between 0 and 100.");
        return false;
    }

    // Marksheet Upload Validation
    if (marksheet === "") {
        alert("Please upload your marksheet.");
        return false;
    }

    return true; // Form submits if all validations pass
}

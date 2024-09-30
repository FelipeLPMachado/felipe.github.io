function validateRegistration() {
    var regUsername = document.getElementById('regUsername').value;
    var regPassword = document.getElementById('regPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    if (regUsername.trim() === "") {
        alert("Username must be filled out");
        return false;
    }
    if (regPassword.trim() === "") {
        alert("Password must be filled out");
        return false;
    }
    if (confirmPassword.trim() === "" || confirmPassword !== regPassword) {
        alert("Passwords do not match");
        return false;
    }
    
    localStorage.setItem('username', regUsername);
    localStorage.setItem('password', regPassword);
    alert("Account created successfully!");
    return true;
}

function validateLogin(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    var loginUsername = document.getElementById('loginUsername').value;
    var loginPassword = document.getElementById('loginPassword').value;
    
    if (loginUsername.trim() === "") {
        alert("Username must be filled out");
        return false;
    }
    if (loginPassword.trim() === "") {
        alert("Password must be filled out");
        return false;
    }
    
    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');
    
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
        alert("Login successful!");
        window.location.href = "HomePage.html"; // Redirect to HomePage.html
        return true;
    } else {
        alert("Invalid credentials. Please try again.");
        return false;
    }
}

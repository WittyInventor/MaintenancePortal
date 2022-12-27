const validatePassword = (pwd, cPwd) => {
    const disallowedChars = ' ';
    if (pwd !== cPwd) {
        alert(`The passwords do not match.`);
        return false;
    }
    
    // Check that the password is at least 8 characters long
    if (pwd.length < 8) {
        alert('Your password must be at least 8 characters long.');
        return false;
    }

    if (pwd.includes(disallowedChars)) {
        // if I add disallowed characters other than spaces, change this message to something like:
        // `The following characters, including spaces, are not allowed: ${disallowedChars}` 
        alert('You cannot include spaces in your password.');
        return false;
    }
    return true;
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmpassword").value;

    if (username && email && password && confirmPassword) {
        if (!validatePassword(password, confirmPassword)) {
            // validatePassword already displayed the error message
            return;
        }
        // Validate email 
        
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status
        if (response.ok) {
            document.location.replace('/'); 
        } else {
            response.json()
            .then(data => {
                alert(data.message);
            })
        }
    }
    else {
        // tell the user we need info
        alert("You must supply a user name and a password");
    }

}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

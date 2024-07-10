document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    let isValid = true;

    // Clear previous error messages
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('login-error').textContent = '';

    // Validate username/email
    if (!username) {
        document.getElementById('username-error').textContent = 'Username/Email is required.';
        isValid = false;
    } else if (!validateEmail(username)) {
        document.getElementById('username-error').textContent = 'Invalid email format.';
        isValid = false;
    }

    // Validate password
    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (isValid) {
        // Show loading spinner
        document.getElementById('loading').style.display = 'block';

        // Perform API login
        login(username, password, rememberMe);
    }
});

function validateEmail(email) {
    const re =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function login(username, password, rememberMe) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading spinner
        document.getElementById('loading').style.display = 'none';

        console.log(data);
        if (data.id) {
            alert('Login successful!');
            if (rememberMe) {
                localStorage.setItem('username', username);
            } else {
                localStorage.removeItem('username');
            }
        } else {
            document.getElementById('login-error').textContent = 'Invalid login credentials.';
        }
    })
    .catch(error => {
        // Hide loading spinner
        document.getElementById('loading').style.display = 'none';

        console.error('Error:', error);
        document.getElementById('login-error').textContent = 'An error occurred. Please try again.';
    });
}
// console.log(document.getElementById('toggle-password'))
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    this.classList.toggle('fa-eye-slash');
});

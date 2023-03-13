const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();


  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
      // If successful, redirect the browser to the profile page

      const body = await response.json();

      if(body.has_team){
        document.location.replace('/dashboard');
      }else{
        document.location.replace('/buildteam');
      }
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/buildteam');
    } else {
      alert(response.statusText);
    }
  }
};

const showLogin = async (event) => {
  event.preventDefault();
  document.querySelector('.signup-box').setAttribute('style', 'display: none;');
  document.querySelector('.login-box').setAttribute('style', 'width: 370px; display: block;');
}
const showSignup = async (event) => {
  event.preventDefault();
  document.querySelector('.login-box').setAttribute('style', 'display: none;');
  document.querySelector('.signup-box').setAttribute('style', 'width: 380px; display: block;');
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

document
  .querySelector('.show-login')
  .addEventListener('click', showLogin);

document
  .querySelector('.show-signup')
  .addEventListener('click', showSignup);

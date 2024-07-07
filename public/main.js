document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const userInfo = document.getElementById('user-info');
  const authForms = document.getElementById('auth-forms');
  const showLogin = document.getElementById('show-login');
  const showSignup = document.getElementById('show-signup');
  const loginButton = document.getElementById('login-button');
  const signupButton = document.getElementById('signup-button');
  const logoutButton = document.getElementById('logout-button');

  if (showLogin) {
    console.log('Adding event listener to showLogin');
    showLogin.addEventListener('click', () => {
      if (loginForm && signupForm) {
        console.log('Toggling login and signup forms');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
      }
    });
  }

  if (showSignup) {
    console.log('Adding event listener to showSignup');
    showSignup.addEventListener('click', () => {
      if (signupForm && loginForm) {
        console.log('Toggling signup and login forms');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
      }
    });
  }

  const showUserInfo = (email) => {
    if (authForms && userInfo) {
      console.log('Showing user info');
      authForms.classList.add('hidden');
      userInfo.classList.remove('hidden');
      const userEmailElement = document.getElementById('user-email');
      if (userEmailElement) {
        userEmailElement.textContent = `Logged in as: ${email}`;
      }
    }
  };

  const handleAuthResponse = (response) => {
    console.log('Handling auth response', response);
    if (response.error) {
      alert(response.error);
    } else {
      window.location.href = 'chat.html'; // Redirect to chat interface
    }
  };

  const handleSignupResponse = (response) => {
    console.log('Handling signup response', response);
    if (response.error) {
      alert(response.error);
    } else {
      alert(response.message);  // Show message using alert
    }
  };

  if (loginForm) {
    console.log('Adding event listener to loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Login form submitted');
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }).then(res => res.json());

        handleAuthResponse(response);
      } catch (error) {
        console.error('Login error:', error);
      }
    });
  }

  if (signupForm) {
    console.log('Adding event listener to signupForm');
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Signup form submitted');
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }).then(res => res.json());

        handleSignupResponse(response);
      } catch (error) {
        console.error('Signup error:', error);
      }
    });
  }

  if (loginButton) {
    console.log('Adding event listener to loginButton');
    loginButton.addEventListener('click', async () => {
      console.log('Login button clicked');
      loginForm.dispatchEvent(new Event('submit'));
    });
  }

  if (signupButton) {
    console.log('Adding event listener to signupButton');
    signupButton.addEventListener('click', async () => {
      console.log('Signup button clicked');
      signupForm.dispatchEvent(new Event('submit'));
    });
  }

  if (logoutButton) {
    console.log('Adding event listener to logoutButton');
    logoutButton.addEventListener('click', async () => {
      console.log('Logout button clicked');
      try {
        await fetch('/auth/logout', { method: 'POST' });
        if (authForms && userInfo) {
          authForms.classList.remove('hidden');
          userInfo.classList.add('hidden');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  }
});

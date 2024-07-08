// File: public/main.js
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
  const feedback = document.getElementById('feedback');
  const loading = document.getElementById('loading');

  const showFeedback = (message) => {
    feedback.textContent = message;
    feedback.classList.remove('hidden');
  };

  const hideFeedback = () => {
    feedback.classList.add('hidden');
  };

  const showLoading = () => {
    loading.classList.remove('hidden');
  };

  const hideLoading = () => {
    loading.classList.add('hidden');
  };

  if (showLogin) {
    console.log('Adding event listener to showLogin');
    showLogin.addEventListener('click', () => {
      if (loginForm && signupForm) {
        console.log('Toggling login and signup forms');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        hideFeedback();
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
        hideFeedback();
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
    hideLoading();
    if (response.error) {
      showFeedback(response.error);
    } else {
      window.location.href = 'chat.html'; // Redirect to chat interface
    }
  };

  const handleSignupResponse = (response) => {
    console.log('Handling signup response', response);
    hideLoading();
    if (response.error) {
      showFeedback(response.error);
    } else {
      showFeedback(response.message);
      showLogin.click();
    }
  };

  if (loginForm) {
    console.log('Adding event listener to loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Login form submitted');
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      if (!email || !password) {
        showFeedback('Please enter both email and password');
        return;
      }
      showLoading();
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'same-origin' // Use credentials for secure cookies
        }).then(res => res.json());

        handleAuthResponse(response);
      } catch (error) {
        console.error('Login error:', error);
        hideLoading();
        showFeedback('Login failed. Please try again.');
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
      if (!email || !password) {
        showFeedback('Please enter both email and password');
        return;
      }
      showLoading();
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'same-origin' // Use credentials for secure cookies
        }).then(res => res.json());

        handleSignupResponse(response);
      } catch (error) {
        console.error('Signup error:', error);
        hideLoading();
        showFeedback('Signup failed. Please try again.');
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
      showLoading();
      try {
        await fetch('/auth/logout', { method: 'POST', credentials: 'same-origin' });
        if (authForms && userInfo) {
          authForms.classList.remove('hidden');
          userInfo.classList.add('hidden');
        }
        hideLoading();
      } catch (error) {
        console.error('Logout error:', error);
        hideLoading();
        showFeedback('Logout failed. Please try again.');
      }
    });
  }
});

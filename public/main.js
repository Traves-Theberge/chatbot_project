// File: public/main.js
document.addEventListener('DOMContentLoaded', function() {
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
  let csrfToken;

  // Fetch the CSRF token
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('/auth/csrf-token', {
        method: 'GET',
        credentials: 'same-origin'
      });
      const data = await response.json();
      csrfToken = data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  // Call fetchCsrfToken on page load
  fetchCsrfToken();

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
    showLogin.addEventListener('click', () => {
      if (loginForm && signupForm) {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        hideFeedback();
      }
    });
  }

  if (showSignup) {
    showSignup.addEventListener('click', () => {
      if (signupForm && loginForm) {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        hideFeedback();
      }
    });
  }

  const showUserInfo = (email) => {
    if (authForms && userInfo) {
      authForms.classList.add('hidden');
      userInfo.classList.remove('hidden');
      const userEmailElement = document.getElementById('user-email');
      if (userEmailElement) {
        userEmailElement.textContent = `Logged in as: ${email}`;
      }
    }
  };

  const handleAuthResponse = (response) => {
    hideLoading();
    if (response.error) {
      showFeedback(response.error);
    } else {
      showUserInfo(response.email);
      window.location.href = 'chat.html'; // Redirect to chat interface
    }
  };

  const handleSignupResponse = (response) => {
    hideLoading();
    if (response.error) {
      showFeedback(response.error);
    } else {
      showFeedback(response.message);
      showLogin.click();
    }
  };

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
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
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken // Include CSRF token in headers
          },
          body: JSON.stringify({ email, password }),
          credentials: 'same-origin' // Use credentials for secure cookies
        }).then(res => res.json());

        handleAuthResponse(response);
      } catch (error) {
        console.error('Login error:', error); // Log error for debugging, but not sensitive info
        hideLoading();
        showFeedback('Login failed. Please try again.');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
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
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken // Include CSRF token in headers
          },
          body: JSON.stringify({ email, password }),
          credentials: 'same-origin' // Use credentials for secure cookies
        }).then(res => res.json());

        handleSignupResponse(response);
      } catch (error) {
        console.error('Signup error:', error); // Log error for debugging, but not sensitive info
        hideLoading();
        showFeedback('Signup failed. Please try again.');
      }
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      loginForm.dispatchEvent(new Event('submit'));
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', async () => {
      signupForm.dispatchEvent(new Event('submit'));
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      showLoading();
      try {
        await fetch('/auth/logout', { method: 'POST', credentials: 'same-origin' });
        if (authForms && userInfo) {
          authForms.classList.remove('hidden');
          userInfo.classList.add('hidden');
        }
        hideLoading();
      } catch (error) {
        console.error('Logout error:', error); // Log error for debugging, but not sensitive info
        hideLoading();
        showFeedback('Logout failed. Please try again.');
      }
    });
  }
});

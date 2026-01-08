const logout = (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const confirmLogout = window.confirm('Are you sure you want to logout?');

  if (!confirmLogout) return;

  sessionStorage.removeItem('token');
  window.location.href = '/login';
};

export default logout;

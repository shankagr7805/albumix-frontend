import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import logout from 'pages/authentication/Logout';
// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  LogoutOutlined
};
const isLoginEnabled = sessionStorage.getItem('token');

const caseLogin = [{
  id: 'logout1',
  title: 'Logout',
  type: 'item',
  onClick: logout,
  icon: icons.LogoutOutlined,
  target: true
}]

const caseLogout = [{
    id: 'Login',
    title: 'Login',
    type: 'item',
    url: '/login',
    icon: icons.LoginOutlined,
    target: true
  },
  {
    id: 'register1',
    title: 'Register',
    type: 'item',
    url: '/register',
    icon: icons.ProfileOutlined,
    target: true
  }
]
const auth = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    isLoginEnabled && caseLogin[0],
    !isLoginEnabled && caseLogout[0],
    !isLoginEnabled && caseLogout[1]
  ].filter(Boolean) // Remove falsy values (pages with condition false)
};

export default auth;
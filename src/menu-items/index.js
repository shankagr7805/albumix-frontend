// project import
import auth from './auth';
import albums from './albums';
import pages from './pages';
import cloudinary from './cloudinary';
const menuItems = {
  items: [albums, auth, pages, cloudinary]
};

export default menuItems;

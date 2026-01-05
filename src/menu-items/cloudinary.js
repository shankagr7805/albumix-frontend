import { CloudUploadOutlined, PictureOutlined } from '@ant-design/icons';

const cloudinary = {
  id: 'cloudinary',
  title: 'Cloudinary',
  type: 'group',
  children: [
    {
      id: 'cloudinary-upload',
      title: 'Upload Photo',
      type: 'item',
      url: '/cloudinary/upload',
      icon: CloudUploadOutlined
    },
    {
      id: 'gallery',
      title: 'Cloud gallery',
      type: 'item',
      url: '/cloudinary/gallery',
      icon: PictureOutlined
    }
  ]
};

export default cloudinary;
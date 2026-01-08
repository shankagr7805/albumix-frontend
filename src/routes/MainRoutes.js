import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
const AlbumsPage = Loadable(lazy(() => import('pages/albums/albums')));
const AboutPage = Loadable(lazy(() => import('pages/staticPages/about')));
const AlbumAddPage = Loadable(lazy(() => import('pages/albums/albumAdd')));
const AlbumShowPage = Loadable(lazy(() => import('pages/albums/albumShow')));
const AlbumEditPage = Loadable(lazy(() => import('pages/albums/albumEdit')));
const PhotoEditPage = Loadable(lazy(() => import('pages/albums/PhotoEdit')));
const AlbumUploadPage = Loadable(lazy(() => import('pages/albums/albumUpload')));
const ProfileViewPage = Loadable(lazy(() => import('pages/profile/ProfileView')));
const EditProfilePage = Loadable(lazy(() => import('pages/profile/EditProfile')));
const AccountSettingsPage = Loadable(lazy(() => import('pages/profile/AccountSettings')));
const AccountPrivacyPage = Loadable(lazy(() => import('pages/profile/PrivacyCenter')));
const CloudinaryUploadPage = Loadable(lazy(() => import('pages/cloudinary/CloudinaryUpload')));
const CloudinaryGalleryPage = Loadable(lazy(() => import('pages/cloudinary/CloudinaryGallery')));
const FeedbackPage = Loadable(lazy(() => import('pages/profile/Feedback')));
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AlbumsPage />
    },
    {
      path: '/album/add',
      element: <AlbumAddPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/album/show',
      element: <AlbumShowPage />
    },
    {
      path: '/album/edit',
      element: <AlbumEditPage />
    },
    {
      path: '/photo/edit',
      element: <PhotoEditPage />
    },
    {
      path: '/album/upload',
      element: <AlbumUploadPage />
    },
    {
      path: '/profile/view',
      element: <ProfileViewPage />,
      breadcrumb: false
    },
    {
      path: '/profile/edit',
      element: <EditProfilePage />,
      breadcrumb: false
    },
    {
      path: '/profile/settings',
      element: <AccountSettingsPage />,
      breadcrumb: false
    },
    {
      path: '/profile/privacy',
      element: <AccountPrivacyPage />,
      breadcrumb: false
    },
    {
      path: '/profile/feedback',
      element: <FeedbackPage />,
      breadcrumb: false
    },
    {
      path: '/cloudinary/upload',
      element: <CloudinaryUploadPage />
    },
    {
      path: '/cloudinary/gallery',
      element: <CloudinaryGalleryPage />
    }
  ]
};

export default MainRoutes;

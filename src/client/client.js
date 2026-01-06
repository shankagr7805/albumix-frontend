import axios from 'axios';
/**
 * =========================================
 * Base API URL (ENV based)
 * =========================================
 */
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * =========================================
 * Axios instance
 * =========================================
 */
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v2`,
  timeout: 60000
});

/**
 * =========================================
 * Auth header helper
 * =========================================
 */
const authHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * =========================================
 * GET (public)
 * =========================================
 */
const fetchGetData = (uri) => {
  return api.get(uri).catch((error) => {
    console.error('GET error:', uri, error.message);
    throw error;
  });
};

/**
 * =========================================
 * POST (public)
 * =========================================
 */
const fetchPostData = (uri, payload) => {
  return api.post(uri, payload).catch((error) => {
    console.error('POST error:', uri, error.message);
    throw error;
  });
};

/**
 * =========================================
 * GET (auth)
 * =========================================
 */
const fetchGetDataWithAuth = (uri) => {
  return api
    .get(uri, { headers: authHeader() })
    .catch((error) => {
      console.error('AUTH GET error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * POST (auth JSON)
 * =========================================
 */
const fetchPostDataWithAuth = (uri, payload) => {
  return api
    .post(uri, payload, {
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    })
    .catch((error) => {
      console.error('AUTH POST error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * PUT (auth)
 * =========================================
 */
const fetchPutDataWithAuth = (uri, payload) => {
  return api
    .put(uri, payload, {
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    })
    .catch((error) => {
      console.error('AUTH PUT error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * DELETE (auth)
 * =========================================
 */
const fetchDeleteDataWithAuth = (uri) => {
  return api
    .delete(uri, { headers: authHeader() })
    .catch((error) => {
      console.error('AUTH DELETE error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * FILE UPLOAD (multipart)
 * =========================================
 */
const fetchPostFileUploadWithAuth = (uri, formData) => {
  return api
    .post(uri, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    })
    .catch((error) => {
      console.error('UPLOAD error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * DOWNLOAD (ArrayBuffer)
 * =========================================
 */
const fetchGetDataWithAuthArrayBuffer = (uri) => {
  return api
    .get(uri, {
      headers: authHeader(),
      responseType: 'arraybuffer'
    })
    .catch((error) => {
      console.error('ARRAYBUFFER error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * DOWNLOAD (Blob)
 * =========================================
 */
const fetchGetBlobDataWithAuth = (uri) => {
  return api
    .get(uri, {
      headers: authHeader(),
      responseType: 'blob'
    })
    .catch((error) => {
      console.error('BLOB error:', uri, error.message);
      throw error;
    });
};

/**
 * =========================================
 * Exports
 * =========================================
 */
export default fetchGetData;

export {
  fetchPostData,
  fetchPostDataWithAuth,
  fetchGetDataWithAuth,
  fetchPostFileUploadWithAuth,
  fetchGetDataWithAuthArrayBuffer,
  fetchPutDataWithAuth,
  fetchDeleteDataWithAuth,
  fetchGetBlobDataWithAuth
};
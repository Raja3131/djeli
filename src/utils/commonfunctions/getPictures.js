const BASE_URL = 'https://djeli.com.my/lms/';

const getProfileImage = path => {
  // console.log(BASE_URL.concat(path));
  return BASE_URL.concat(path);
};

export default getProfileImage;

import RequestService from '../../../api/Service';
import Endpoints from '../../../api/Endpoints';
import * as Types from '../../root.types';

// Other Actions (Profile, Settings, etc)

export const loadingStatus = loaderStatus => {
  return {
    type: Types.GET_LOADING_STATUS,
    payload: loaderStatus,
  };
};
export const getSelectedGrade = selectedGrade => {
  return {
    type: Types.GET_SELECTED_GRADE,
    payload: selectedGrade,
  };
};
//ecom
export const getSelectedShop = selectedShop => {
  return {
    type: Types.GET_SELECTED_SHOP,
    payload: selectedShop,
  };
};
export const getSelectedAddressLocation = selectedAddress => {
  return {
    type: Types.GET_SELECTED_ADDRESS,
    payload: selectedAddress,
  };
};

export const getNotificationCount = notificationCount => {
  return {
    type: Types.GET_NOTIFICATION_COUNT,
    payload: notificationCount,
  };
};

export const getCartCount = cartCount => {
  return {
    type: Types.GET_CART_COUNT,
    payload: cartCount,
  };
};

export const paymentHistory = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.PAYMENT_HISTORY,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};

export const getUpcomingCourses = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.UPCOMING_COURSES,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};
export const getTopics = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.GET_TOPICS,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};
export const getAllcourses = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.GET_COURSES,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};

export const getCourseDetails = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.post(
      Endpoints.GET_COURSE_DETAILS,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};
export const getMyCourses = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.GET_MY_COURSES,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};

export const getMyFavourites = (requestData, onResponse, showSnackBar) => {
  console.log(requestData, 'requestDatarequestData');
  return dispatch => {
    RequestService.get(
      Endpoints.GET_FAVOURITES,
      requestData,
      response => {
        onResponse(response);
      },
      showSnackBar,
    );
  };
};

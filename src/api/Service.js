import {ECOM_TOKEN, TOKEN} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fetch from './Fetch';
import * as URL from './BaseURL';

class HandleRequestService {
  delete = (endpoint, onResponse, showSnackBar = true, baseEcom = false) => {
    handleRequestHeaders(
      'DELETE',
      endpoint,
      null,
      onResponse,
      showSnackBar,
      baseEcom,
    );
  };

  get = (
    endpoint,
    requestData,
    onResponse,
    showSnackBar = true,
    baseEcom = false,
  ) => {
    handleRequestHeaders(
      'GET',
      endpoint,
      requestData,
      onResponse,
      showSnackBar,
      baseEcom,
    );
  };
  post = (
    endpoint,
    requestData,
    onResponse,
    showSnackBar = true,
    baseEcom = false,
  ) => {
    console.log(requestData, 'FormData::::::::');
    handleRequestHeaders(
      'POST',
      endpoint,
      requestData,
      onResponse,
      showSnackBar,
      baseEcom,
    );
  };
}

const handleRequestHeaders = async (
  methodType,
  endpoint,
  requestData,
  onResponse,
  showSnackBar,
  baseEcom,
) => {
  const jwtToken = JSON.parse(await AsyncStorage.getItem(TOKEN));
  const jwtTokenEcom = JSON.parse(await AsyncStorage.getItem(ECOM_TOKEN));

  console.log('JWT Token:::::::::::: ', jwtToken);

  let requestHeader = {
    method: methodType,
    headers: jwtToken
      ? {
          Accept: '*/*',
          'Content-Type':
            requestData instanceof FormData
              ? 'multipart/form-data'
              : 'application/json',
          Authorization: 'Bearer' + ' ' + jwtToken,
        }
      : {
          Accept: '*/*',
          'Content-Type':
            requestData instanceof FormData
              ? 'multipart/form-data'
              : 'application/json',
        },
  };

  //   if (requestData && methodType == 'GET') {
  //     const data = [...requestData._part.entries()];
  //     const asString = data
  //       .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
  //       .join('&');
  //     console.log(asString, 'ReqDat:::');
  //   }
  methodType !== 'GET' &&
    Boolean(requestData) && [
      (requestHeader = {
        ...requestHeader,
        body:
          requestData instanceof FormData
            ? requestData
            : JSON.stringify(requestData),
      }),
    ];

  if (baseEcom) {
    if (methodType == 'GET' && requestData) {
      Fetch.handleFetchRequest(
        `${URL.BASE_URL_ECOM}${endpoint}`.concat(requestData),
        requestHeader,
        onResponse,
        showSnackBar,
      );
    } else {
      Fetch.handleFetchRequest(
        `${URL.BASE_URL_ECOM}${endpoint}`,
        requestHeader,
        onResponse,
        showSnackBar,
      );
    }
  } else {
    console.log('False baseEcom');

    if (methodType == 'GET' && requestData) {
      Fetch.handleFetchRequest(
        `${URL.BASE_URL}${endpoint}`.concat(requestData),
        requestHeader,
        onResponse,
        showSnackBar,
      );
    } else {
      Fetch.handleFetchRequest(
        `${URL.BASE_URL}${endpoint}`,
        requestHeader,
        onResponse,
        showSnackBar,
      );
    }
  }
};

const RequestService = new HandleRequestService();

export default RequestService;

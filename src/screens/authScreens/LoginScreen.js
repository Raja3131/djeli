import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import _ from 'lodash';
import Snackbar from 'react-native-snackbar';
import {
  ECOM_TOKEN,
  ECOM_USER_DETAILS,
  emailRegEx,
  numberRegEx,
  TOKEN,
  USER_DETAILS,
} from '../../utils/constants';
import {
  formErrorValue,
  getTrimValueLength,
} from '../../utils/commonfunctions/validations';
import {connect} from 'react-redux';
import {
  getEcomUserDetails,
  getSelectedGrade,
  getUserData,
  getUserDetails,
  loadingStatus,
  login,
} from '../../redux/root.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
export const LoginScreen = props => {
  const selectedRole = store.getState().auth.roleDetails;
  const loadStatus = store.getState().app.other.loadingStatus;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pass, setPass] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    pass: false,
  });

  const [loading, setLoading] = useState(loadStatus);

  React.useEffect(() => {
    let isActive = true;

    return () => {
      isActive = false;
    };
  }, [loading]);
  const handleLogin = () => {
    let formData =
      selectedRole == 'lms' ? validateFields() : validateEcomFields();
    setLoading(true);
    console.log(formData, 'Data:::');

    if (formData) {
      store.dispatch(loadingStatus(true));

      if (selectedRole == 'lms') {
        props.login(
          formData,
          res => {
            const response = res.data;
            if (response) {
              AsyncStorage.setItem(
                TOKEN,
                JSON.stringify(response.access_token),
              );
              props.getUserData(
                null,
                res => {
                  const response = res.data;
                  if (response) {
                    console.log(response);
                    AsyncStorage.setItem(
                      USER_DETAILS,
                      JSON.stringify(response),
                    );
                    store.dispatch(getUserDetails(response));
                    let gradeDetails = response
                      ? {
                          option: response.grade_detail.id,
                          label: response.grade_detail.title,
                        }
                      : {};

                    store.dispatch(getSelectedGrade(gradeDetails));
                    props.navigation.navigate('Home');
                    setLoading(false);
                  } else {
                    setLoading(false);
                  }
                },
                false,
              );
              setLoading(false);
              props.navigation.navigate('Home');
            }
          },
          true,
          false,
        );
      } else {
        console.log('ECOM');
        props.navigation.navigate('Dashboard');
        // props.login(
        //   formData,
        //   res => {
        //     const response = res.data;
        //     if (response) {
        //       AsyncStorage.setItem(
        //         ECOM_TOKEN,
        //         JSON.stringify(response.access_token),
        //       );
        //       props.getUserData(
        //         null,
        //         res => {
        //           const response = res.data;
        //           if (response) {
        //             console.log(response);
        //             AsyncStorage.setItem(
        //               ECOM_USER_DETAILS,
        //               JSON.stringify(response),
        //             );
        //             store.dispatch(getEcomUserDetails(response));
        //             props.navigation.navigate('Dashboard');
        //             setLoading(false);
        //           } else {
        //             setLoading(false);
        //           }
        //         },
        //         false,
        //         true,
        //       );
        //       setLoading(false);

        //       props.navigation.navigate('Dashboard');
        //     }
        //   },
        //   true,
        //   true,
        // );
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const validateFields = () => {
    let formData = new FormData();
    let errors = {...validationErrors};
    if (_.isEmpty(phoneNumber)) {
      errors.email = 'Enter email';
      formData = undefined;
    } else if (!_.isEmpty(phoneNumber) && emailRegEx.test(phoneNumber)) {
      errors.email = 'Enter valid email';
      formData = undefined;
    } else {
      formData && formData.append('email', phoneNumber);
    }
    if (_.isEmpty(pass)) {
      errors.pass = 'Enter password';
      formData = undefined;
    } else if (!_.isEmpty(pass) && getTrimValueLength(pass) < 8) {
      errors.pass = 'Enter valid password';
      formData = undefined;
    } else {
      formData && formData.append('password', pass);
    }
    setValidationErrors(errors);
    return formData;
  };
  const validateEcomFields = () => {
    let formData = new FormData();
    let errors = {...validationErrors};
    if (_.isEmpty(phoneNumber)) {
      errors.email = 'Enter mobile';
      formData = undefined;
    } else if (!_.isEmpty(phoneNumber) && numberRegEx.test(phoneNumber)) {
      errors.email = 'Enter valid mobile number';
      formData = undefined;
    } else {
      formData && formData.append('email', phoneNumber);
    }
    if (_.isEmpty(pass)) {
      errors.pass = 'Enter password';
      formData = undefined;
    } else if (!_.isEmpty(pass) && getTrimValueLength(pass) < 8) {
      errors.pass = 'Enter valid password';
      formData = undefined;
    } else {
      formData && formData.append('password', pass);
    }
    setValidationErrors(errors);
    return formData;
  };
  return (
    <View
      style={{
        ...basicStyles.container,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{height: 150, width: 150, alignSelf: 'center'}}
        source={appImages.appImages.LOGO1}
      />
      <CustomInput
        initialValue={phoneNumber}
        onChange={text => (
          setValidationErrors({email: false}), setPhoneNumber(text)
        )}
        helperText={
          selectedRole == 'lms'
            ? 'Enter registered email'
            : 'Enter phone number'
        }
        placeHolder={selectedRole == 'lms' ? 'Email' : 'Phone Number'}
      />
      {validationErrors.email && formErrorValue(validationErrors.email)}
      <PasswordInput
        initialValue={pass}
        onChange={text => (setValidationErrors({pass: false}), setPass(text))}
        helperText="Minimum 8 characters"
        placeHolder="Password"
      />
      {validationErrors.pass && formErrorValue(validationErrors.pass)}

      <FullSizeBtn
        onPress={handleLogin}
        btnColor={appColors.primaryColor}
        btnTitle={
          loading ? (
            <ActivityIndicator size={'small'} color={appColors.white} />
          ) : (
            'Login'
          )
        }
        style={{marginTop: 15}}
      />

      <FullSizeBtn
        onPress={() => {
          if (selectedRole == 'lms') {
            props.navigation.navigate('RegisterScreen');
          } else {
            props.navigation.navigate('EcomRegisterScreen');
          }
        }}
        btnColor={appColors.simpleBlue}
        btnTitle="Register"
        style={{marginTop: 15}}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ForgotPassword')}>
        <Text style={{color: appColors.grey, marginTop: 15}}>
          Forgot Password?{' '}
          <Text style={{color: appColors.primaryColor}}> Reset Password</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    login: (requestData, onResponse, showSnackBar, baseEcom) => {
      dispatch(login(requestData, onResponse, showSnackBar, baseEcom));
    },
    getUserData: (requestData, onResponse, showSnackBar, baseEcom) => {
      dispatch(getUserData(requestData, onResponse, showSnackBar, baseEcom));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);

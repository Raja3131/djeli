import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import appImages from '../../../assets';
import store from '../../../redux/store';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/profileStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';
import getProfileImage from '../../../utils/commonfunctions/getPictures';
import ImagePicker from 'react-native-image-crop-picker';
import {
  getUserData,
  getUserDetails,
  updateProfile,
} from '../../../redux/root.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAILS} from '../../../utils/constants';
import Snackbar from 'react-native-snackbar';

export const Profile = props => {
  const initialUserDetails = store.getState().auth.userDetails;
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const profilePicOptions = ['Camera', 'Gallery'];
  const [imagePopup, setImagePopup] = useState(false);
  const [cameraOpened, setCameraOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const initialUserDetails = store.getState().auth.userDetails;
      setUserDetails(initialUserDetails);
    }, [props.navigation]),
  );

  const confirmImage = () => {
    let formData = new FormData();
    formData && formData.append('phone', userDetails.phone);
    formData && formData.append('email', userDetails.email);
    formData && formData.append('name', userDetails.name);
    formData && formData.append('grade', userDetails.grade_detail.id);
    let imageName = selectedImage.uri.substring(
      selectedImage.uri.lastIndexOf('/') + 1,
    );
    formData &&
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.mime,
        name: imageName,
      });

    props.updateProfile(
      formData,
      res => {
        props.getUserData(
          null,
          async res => {
            const response = res.data;
            if (response) {
              console.log(response, 'Res::::');
              await AsyncStorage.setItem(
                USER_DETAILS,
                JSON.stringify(response),
              );
              store.dispatch(getUserDetails(response));
              setUserDetails(response);
              setImagePopup(false);
              setSelectedImage(false);
            }
          },
          false,
        );
      },
      true,
    );
  };
  const pickFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
      includeBase64: true,
      forceJpg: true,
    })
      .then(image => {
        setCameraOpened(true);
        let selectedImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          baseUri: image.data,
        };
        setSelectedImage(selectedImage);
      })
      .catch(e => alert(e));
  };

  const pickFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      width: 500,
      height: 500,
      mediaType: 'photo',
      includeBase64: true,
      forceJpg: true,
    })
      .then(image => {
        setCameraOpened(true);
        let selectedImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          baseUri: image.data,
        };

        setSelectedImage(selectedImage);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={basicStyles.container}>
      <Modal
        onRequestClose={() => (setSelectedImage(false), setImagePopup(false))}
        style={{alignItems: 'center', justifyContent: 'center'}}
        visible={imagePopup}
        transparent>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: appColors.white,
              borderWidth: 1,
              borderColor: appColors.primaryColor,
              padding: 20,
              width: '60%',
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'left',
                fontWeight: '500',
                marginBottom: 10,
                left: -10,
              }}>
              {selectedImage ? 'Choosen Image' : '   Choose image from'}
            </Text>
            <TouchableOpacity
              onPress={() => (setSelectedImage(false), setImagePopup(false))}>
              {getIcon(
                'ad',
                'closecircle',
                {alignSelf: 'flex-end', marginTop: -30, left: 10},
                15,
                appColors.primaryColor,
              )}
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{uri: selectedImage.uri}}
                resizeMode="stretch"
                style={{height: 200, width: 200}}
              />
            )}
            {selectedImage ? (
              <View style={{flexDirection: 'row', width: '90%', left: '10%'}}>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => (
                    setSelectedImage(false), setImagePopup(false)
                  )}>
                  {getIcon('ion', 'ios-close-circle', null, 40, appColors.red)}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmImage}
                  style={{right: '10%', marginLeft: '10%'}}>
                  {getIcon(
                    'ion',
                    'checkmark-circle',
                    {marginLeft: 30},
                    40,
                    appColors.darkGreen,
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              profilePicOptions &&
              profilePicOptions.map((option, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (option == 'Camera') {
                        pickFromCamera();
                      } else {
                        pickFromGallery();
                      }
                    }}
                    key={i}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor:
                        i == 0 ? appColors.dimGrey : appColors.white,
                    }}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.imageContainer}>
        <View>
          <Image
            style={styles.profileImg}
            source={
              userDetails.image
                ? {uri: getProfileImage(userDetails.image)}
                : appImages.otherImages.PROFILEPLACEHOLDER
            }
          />
          {/* <TouchableOpacity
            onPress={() => setImagePopup(true)}
            style={styles.camerafab}>
            {getIcon('ion', 'camera', null, 18, 'white')}
          </TouchableOpacity> */}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}
            style={{flexDirection: 'row', marginRight: 40}}>
            {getIcon('mi', 'mode-edit', null, 25, appColors.primaryColor)}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '400',
                color: appColors.primaryColor,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changePswdBtn}
            onPress={() => props.navigation.navigate('ChangePassword')}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: '500'}}>
              Change password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{flex: 0, height: undefined}}>
        <View style={{...styles.detailsContainer}}>
          <Text style={styles.detailTitle}>Student Name</Text>
          <Text style={styles.detailValue}>{userDetails.name || '-'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Email address</Text>
          <Text style={styles.detailValue}>{userDetails.email || '-'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Phone Number</Text>
          <Text style={styles.detailValue}>{userDetails.phone || '-'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Grade</Text>
          <Text style={styles.detailValue}>
            {(userDetails.grade_detail && userDetails.grade_detail.title) ||
              '-'}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{...styles.detailTitle, textTransform: 'none'}}>
            Date of Birth
          </Text>
          <Text style={styles.detailValue}>{userDetails.dob || '-'}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Gender</Text>
          <Text style={styles.detailValue}>{userDetails.gender || '-'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (requestData, onResponse, showSnackBar) => {
      dispatch(updateProfile(requestData, onResponse, showSnackBar));
    },
    getUserData: (requestData, onResponse, showSnackBar) => {
      dispatch(getUserData(requestData, onResponse, showSnackBar));
    },
  };
};
export default connect(null, mapDispatchToProps)(Profile);

import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import * as RootNavigation from '../utils/RootNavigation';
// import AsyncStorage from '@react-native-community/async-storage';
import Store from '../redux/store';
import {CommonActions} from '@react-navigation/native';
import basicStyles from '../styles/basicStyles';
import appImages from '../assets';
import getIcon from '../utils/commonfunctions/getIcon';
import appColors from '../utils/appColors';
import store from '../redux/store';
import getProfileImage from '../utils/commonfunctions/getPictures';

const SideMenu = props => {
  const userDetails = store.getState().auth.userDetails;
  const selectedRole = store.getState().auth.roleDetails;

  console.log(userDetails);
  const [details, setDetails] = useState({});
  const ELearningMenu = () => {
    return (
      <Fragment>
        <View style={basicStyles.bgprofile}>
          <TouchableOpacity
            onPress={() => {
              props.callParentScreenFunction();

              RootNavigation.navigate('Profile');
            }}>
            <View style={basicStyles.centeralign}>
              <Image
                style={basicStyles.profileImg}
                source={
                  userDetails.avatar
                    ? {uri: getProfileImage(userDetails.avatar)}
                    : appImages.otherImages.PROFILEPLACEHOLDER
                }
              />
              <View style={basicStyles.details}>
                <Text
                  style={{
                    ...basicStyles.textheader,
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  {userDetails.name}
                </Text>
                {/**  <Text style={{...basicStyles.studentName, maxWidth: '97%'}}>
                  {userDetails.email}
                </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={basicStyles.menuContainer}>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('CategoryList');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'ion',
                  'ios-list-outline',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Category{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('MyCourses');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon('mc', 'teach', null, 30, appColors.primaryColor)}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                My Courses{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();

                RootNavigation.navigate('PaymentHistory');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'mc',
                  'credit-card-check-outline',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Payment History{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ marginBottom: 20 }}>
			<TouchableOpacity
				style={basicStyles.swithBlock}
				onPress={() => {
					props.callParentScreenFunction();
					// RootNavigation.navigate('PaymentHistory');
				}}
			>
				<View style={{ marginRight: 10 }}>
					{getIcon('ion', 'settings-outline', null, 30, appColors.primaryColor)}
				</View>
				<Text style={{...basicStyles.description,color:appColors.primaryColor}}> Settings </Text>
			</TouchableOpacity>
		</View> */}
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();

                RootNavigation.navigate('Support');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'mc',
                  'message-processing-outline',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Support{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('Feedback');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon('mi', 'feedback', null, 30, appColors.primaryColor)}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Feedback{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('Profile');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'ion',
                  'person-circle-sharp',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Profile{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={basicStyles.swithBlock}
            onPress={() => (
              props.callParentScreenFunction(), props.logoutFn()
            )}>
            <View style={{marginRight: 10}}>
              {getIcon('mi', 'logout', null, 30, appColors.primaryColor)}
            </View>
            <Text
              style={{
                ...basicStyles.description,
                color: appColors.primaryColor,
              }}>
              {' '}
              Logout{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  };
  const EComMenu = () => {
    return (
      <Fragment>
        <View style={basicStyles.bgprofile}>
          <TouchableOpacity
            onPress={() => {
              props.callParentScreenFunction();

              RootNavigation.navigate('EcomAccount');
            }}>
            <View style={basicStyles.centeralign}>
              <Image
                style={basicStyles.profileImg}
                source={appImages.otherImages.PROFILEPLACEHOLDER}
              />
              <View style={basicStyles.details}>
                <Text style={basicStyles.textheader}>Customer Name</Text>
                <Text style={{...basicStyles.studentName, maxWidth: '97%'}}>
                  Customer email
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={basicStyles.menuContainer}>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('Dashboard');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon('mc', 'view-dashboard', null, 30, appColors.primaryColor)}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Dashboard{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('EcomAccount');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'ion',
                  'person-circle-sharp',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                My Account{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                // RootNavigation.navigate('My Orders');
              }}>
              <View style={{marginRight: 20}}>
                {getIcon(
                  'fa5',
                  'clipboard-list',
                  {left: 3},
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                My Orders{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('SearchHistory');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon('ion', 'search', null, 30, appColors.primaryColor)}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Search History{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();

                RootNavigation.navigate('Support');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon(
                  'mc',
                  'message-processing-outline',
                  null,
                  30,
                  appColors.primaryColor,
                )}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Support{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={basicStyles.swithBlock}
              onPress={() => {
                props.callParentScreenFunction();
                RootNavigation.navigate('Feedback');
              }}>
              <View style={{marginRight: 10}}>
                {getIcon('mi', 'feedback', null, 30, appColors.primaryColor)}
              </View>
              <Text
                style={{
                  ...basicStyles.description,
                  color: appColors.primaryColor,
                }}>
                {' '}
                Feedback{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={basicStyles.swithBlock}
            onPress={() => (
              props.callParentScreenFunction(), props.logoutFn()
            )}>
            <View style={{marginRight: 10}}>
              {getIcon('mi', 'logout', null, 30, appColors.primaryColor)}
            </View>
            <Text
              style={{
                ...basicStyles.description,
                color: appColors.primaryColor,
              }}>
              {' '}
              Logout{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  };
  useEffect(() => {
    // memberDetails();
  }, []);

  //   const memberDetails = async () => {
  //     const userDetails = JSON.parse(await AsyncStorage.getItem(DECODE));
  //     setDetails(userDetails);
  //   };
  return (
    <ScrollView style={basicStyles.safeAreaView}>
      {selectedRole == 'lms' ? <ELearningMenu /> : <EComMenu />}
    </ScrollView>
  );
};

export default SideMenu;

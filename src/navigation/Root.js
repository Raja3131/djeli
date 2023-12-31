import React, {Fragment, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/authScreens/SplashScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import Home from '../screens/otherscreens/Home';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import MyCourses from '../screens/otherscreens/MyCourses';
import TimeTable from '../screens/otherscreens/TimeTable.';
import PaymentHistory from '../screens/otherscreens/PaymentHistory';
import CategoryList from '../screens/otherscreens/category/CategoryList';
import FavouriteList from '../screens/otherscreens/favourite/FavouriteList';
import Wallet from '../screens/otherscreens/wallet/Wallet';
import Profile from '../screens/otherscreens/profile/Profile';
import SideMenu from './SideMenu';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import basicStyles from '../styles/basicStyles';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import ForgotOrChangePassword from '../screens/authScreens/ForgotOrChangePassword';
import EditProfile from '../screens/otherscreens/profile/EditProfile';
import Notifications from '../screens/otherscreens/Notifications';
import CourseView from '../screens/otherscreens/CourseView';
import OneToOne from '../screens/otherscreens/category/onetoone/OneToOne';
import OneToOneSubList from '../screens/otherscreens/category/onetoone/OneToOneSubList';
import OneToOneView from '../screens/otherscreens/category/onetoone/OneToOneView';
import PreRecordedView from '../screens/otherscreens/category/prerecorded/PreRecordedView';
import TopicView from '../screens/otherscreens/TopicView';
import RoleSelectionScreen from '../screens/authScreens/RoleSelectionScreen';
import Dashboard from '../screens/otherscreens/ecom/Dashboard';
import Support from '../screens/otherscreens/Support';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feedback from '../screens/otherscreens/Feedback';
import EcomRegister from '../screens/authScreens/EcomRegister';
import SearchHistory from '../screens/otherscreens/ecom/SearchHistory';
import ShoppingCart from '../screens/otherscreens/ecom/ShopProduct/ShoppingCart';
import {EcomAccount} from '../screens/otherscreens/ecom/EcomAccount';
import ShopsList from '../screens/otherscreens/ecom/shops/ShopsList';
import ShopView from '../screens/otherscreens/ecom/shops/ShopView';
import AccountDetails from '../screens/otherscreens/ecom/account/AccountDetails';
import EditEcomProfile from '../screens/otherscreens/ecom/account/EditEcomProfile';
import MyAddress from '../screens/otherscreens/ecom/account/MyAddress';
import Location from '../screens/otherscreens/ecom/location/Location';
import MyOrders from '../screens/otherscreens/ecom/account/MyOrders';
import EcomSuuport from '../screens/otherscreens/ecom/EcomSuuport';
import store from '../redux/store';
import {ROLESELECTED, TOKEN} from '../utils/constants';
const Stack = createStackNavigator();

const RootNavigation = props => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const myStore = store.getState();
  const cartCount = myStore.app.other.cartCount;
  const toggleSideMenu = () => {
    setisModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();
  const LogoutPopUp = () => {
    return (
      <Modal
        onRequestClose={() => setLogoutPopUp(false)}
        style={{alignItems: 'center', justifyContent: 'center'}}
        visible={logoutPopUp}
        transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: appColors.white,
              width: '90%',
              borderWidth: 2,
              borderColor: appColors.primaryColor,
              borderRadius: 20,
              backgroundColor: appColors.palePink,
            }}>
            <View
              style={{
                height: '15%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -1,
                marginLeft: -1,
                marginRight: -1,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: appColors.primaryColor,
              }}></View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: -100,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: appColors.smokyBlack,
                  fontWeight: '400',
                  margin: 10,
                }}>
                Are you sure want to Logout this application ?
              </Text>

              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <TouchableOpacity
                  onPress={async () => {
                    const keys = await AsyncStorage.getAllKeys();
                    console.log('async keys:::>', keys);
                    if (keys.length >= 0) {
                      // await AsyncStorage.multiRemove(keys);
                      await AsyncStorage.removeItem(TOKEN);
                      await AsyncStorage.removeItem(ROLESELECTED);

                      setLogoutPopUp(false);
                      navigation.navigate('RoleSelectionScreen');
                    }
                  }}
                  style={{
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    marginRight: 10,
                    backgroundColor: appColors.primaryColor,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{color: appColors.white, fontSize: 16}}
                    >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLogoutPopUp(false)}
                  style={{
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    backgroundColor: appColors.neutralGreen,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{color: appColors.white, fontSize: 16}}
                    >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalDrawer = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleSideMenu}
        onBackButtonPress={toggleSideMenu}
        onSwipeComplete={toggleSideMenu}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        swipeDirection="left"
        useNativeDriver
        hideModalContentWhileAnimating
        propagateSwipe
        style={basicStyles.sideMenuStyle}>
        <SideMenu
          callParentScreenFunction={() => setisModalVisible(false)}
          logoutFn={() => setLogoutPopUp(true)}
        />
      </Modal>
    );
  };
  const HeaderLeft = ({back}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 15}}
        onPress={() => {
          back ? navigation.goBack() : setisModalVisible(true);
        }}>
        {getIcon('ion', back ? 'arrow-back' : 'menu', {color: 'white'}, 30)}
      </TouchableOpacity>
    );
  };

  //ECOMMERCE HEADER
  const HeaderLeftEcom = ({back}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 15, flexDirection: 'row'}}
        onPress={() => {
          back ? navigation.goBack() : setisModalVisible(true);
        }}>
        {getIcon('ion', back ? 'arrow-back' : 'menu', {color: 'white'}, 30)}
      </TouchableOpacity>
    );
  };
  const HeaderRight = ({wishList}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
        style={{padding: 15}}>
        {getIcon(
          'ion',
          wishList ? 'heart-outline' : 'notifications',
          {color: 'white'},
          25,
        )}
      </TouchableOpacity>
    );
  };
  const HeaderRightEcom = ({wishList}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', padding: 15}}
        onPress={() => navigation.navigate('ShoppingCart')}>
        {getIcon('ion', 'cart', {color: 'white'}, 25)}
        <View
          style={{
            top: 5,
            right: 10,
            backgroundColor: appColors.white,
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: appColors.primaryColor,
            }}>
            {cartCount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RoleSelectionScreen"
          component={RoleSelectionScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTitle: 'Registration',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},

            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="EcomRegisterScreen"
          component={EcomRegister}
          options={{
            headerShown: true,
            headerTitle: 'EcomRegisterScreen',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},

            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotOrChangePassword}
          options={{
            headerShown: true,
            headerTitle: 'Forgot Password',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ForgotOrChangePassword}
          initialParams={{from: 'changePassword'}}
          options={{
            headerShown: true,
            headerTitle: 'Change Password',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},

            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerTitle: 'E-Learning D-Jeli',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="MyCourses"
          component={MyCourses}
          options={{
            headerShown: true,
            headerTitle: 'My Courses',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="TimeTable"
          component={TimeTable}
          options={{
            headerShown: true,
            headerTitle: 'Time Table',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{
            headerShown: true,
            headerTitle: 'Payment History',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{
            headerShown: true,
            headerTitle: 'Category List',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="OneToOne"
          component={OneToOne}
          options={{
            headerShown: true,
            headerTitle: '1 to 1 Class',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />

        <Stack.Screen
          name="OneToOneSubList"
          component={OneToOneSubList}
          options={{
            headerShown: true,
            headerTitle: 'Form 6 Science',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="OneToOneView"
          component={OneToOneView}
          options={{
            headerShown: true,
            headerTitle: '1 to 1 Class',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />

        <Stack.Screen
          name="PreRecordedView"
          component={PreRecordedView}
          options={{
            headerShown: true,
            headerTitle: 'Pre recorded Class',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />

        <Stack.Screen
          name="FavouriteList"
          component={FavouriteList}
          options={{
            headerShown: true,
            headerTitle: 'My favourite',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{
            headerShown: true,
            headerTitle: 'Wallet',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitle: 'Profile',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            headerTitle: 'Edit Profile',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: true,
            headerTitle: 'Notifications',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="CourseView"
          component={CourseView}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerRight: () => <HeaderRight wishList />,
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="TopicView"
          component={TopicView}
          options={{
            headerShown: true,
            headerTitle: 'Sub Topic',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />

        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            headerShown: true,
            headerTitle: 'Support',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerShown: true,
            headerTitle: 'Feedback',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeft back />,
          }}
        />
        {/* //ECOMMERCE SCREENS */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            headerTitle: 'Eat for your taste',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="SearchHistory"
          component={SearchHistory}
          options={{
            headerShown: true,
            headerTitle: 'Recent searches',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{
            headerShown: true,
            headerTitle: 'Your cart',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="EcomAccount"
          component={EcomAccount}
          options={{
            headerShown: true,
            headerTitle: 'Your Account',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />

        <Stack.Screen
          name="ShopsList"
          component={ShopsList}
          options={{
            headerShown: true,
            headerTitle: 'Eat for your taste',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="ShopView"
          component={ShopView}
          options={{
            headerShown: true,
            headerTitle: 'Eat for your taste',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="AccountDetails"
          component={AccountDetails}
          options={{
            headerShown: true,
            headerTitle: 'Your Account',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="EditEcomProfile"
          component={EditEcomProfile}
          options={{
            headerShown: true,
            headerTitle: 'Edit Account',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="MyAddress"
          component={MyAddress}
          options={{
            headerShown: true,
            headerTitle: 'Your Addresses',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerShown: true,
            headerTitle: 'Your Addresses',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="My Orders"
          component={MyOrders}
          options={{
            headerShown: true,
            headerTitle: 'My Orders',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        <Stack.Screen
          name="HelpAndSupport"
          component={EcomSuuport}
          options={{
            headerShown: true,
            headerTitle: 'Help and support',
            headerTitleStyle: {color: appColors.white},
            headerStyle: {backgroundColor: appColors.primaryColor},
            headerLeft: () => <HeaderLeftEcom />,
            headerRight: () => <HeaderRightEcom />,
          }}
        />
        {/* //ECOMMERCE SCREENS */}
      </Stack.Navigator>
      {isModalVisible && <ModalDrawer />}
      {logoutPopUp && <LogoutPopUp />}
    </Fragment>
  );
};

export default RootNavigation;

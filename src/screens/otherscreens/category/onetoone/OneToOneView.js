import React, {Fragment, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../../assets';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import Rating from '../../../../components/Rating';
import RatingProgressBar from '../../../../components/RatingProgressBar';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/myCoursesStyles';
import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import {HEIGHT, WIDTH} from '../../../../utils/constants';
import _ from 'lodash';
import CourseListLoader from '../../../../components/loaders/CourseListLoader';
import NoDataFound from '../../../../components/NoDataFound';
import {getCourseDetails, purchaseCourse} from '../../../../redux/root.actions';
import getProfileImage from '../../../../utils/commonfunctions/getPictures';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Snackbar from 'react-native-snackbar';
import WebView from 'react-native-webview';
export const OneToOneView = props => {
  const {categoryData, courseData} = props.route.params;
  const [courseView, setCourseView] = useState(null);
  const [unSubscribed, setunSubscribed] = useState(false);
  const [confirmationPopup, setConfirationPopup] = useState(false);
  React.useEffect(() => {
    let isActive = true;
    props.navigation.setOptions({headerTitle: courseData.title});
    isActive && getCourseView();
    return () => {
      isActive = false;
    };
  }, []);
  const getCourseView = () => {
    let formData = new FormData();
    formData && formData.append('id', courseData.id);
    props.getCourseDetails(
      formData,
      res => {
        const response = res.data;
        if (response) {
          setCourseView(_.isEmpty(response) ? [] : response);
        }
      },
      false,
    );
  };

  const purchaseCourse = () => {
    setConfirationPopup(false);

    let formData = new FormData();
    formData && formData.append('course_id', courseData.id);
    formData && formData.append('amount', courseView.price);

    props.purchaseCourse(
      formData,
      res => {
        const response = res.data;
        setConfirationPopup(false);

        props.navigation.navigate('Home');
        Snackbar.show({
          text: 'Course purchased successfully',
          backgroundColor: appColors.darkGreen,
          length: Snackbar.LENGTH_SHORT,
        });
      },
      false,
    );
  };
  const getId = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId;
  };

  return (
    <View
      style={
        courseView && !courseView.is_enrolled
          ? {
              flex: 1,
              left: 0,
              top: 0,
              opacity: 0.5,
              backgroundColor: appColors.grey,
              width: WIDTH,
              height: HEIGHT,
            }
          : basicStyles.container
      }>
      {courseView ? (
        courseView.length == 0 ? (
          <View style={{height: HEIGHT}}>
            <NoDataFound />
          </View>
        ) : (
          <ScrollView>
            {courseView.lessons &&
              courseView.lessons.length != 0 &&
              courseView.is_enrolled && (
                <View
                  style={{
                    height: 180,
                    justifyContent: 'center',
                    width: 400,
                  }}>
                  <WebView
                    allowsFullscreenVideo
                    useWebKit
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction
                    javaScriptEnabled
                    scrollEnabled={false}
                    javaScriptEnabled={true}
                    source={{uri: courseView.lessons[0].video_url}}
                  />
                </View>
              )}
            {courseView.lessons &&
              courseView.lessons.length != 0 &&
              !courseView.is_enrolled && (
                <View style={styles.videoContainer}>
                  {getIcon(
                    'mi',
                    'play-disabled',
                    null,
                    100,
                    appColors.smokyBlack,
                  )}
                </View>
              )}
            <Modal
              onDismiss={() => setConfirationPopup(false)}
              onRequestClose={() => setConfirationPopup(false)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: '30%',
              }}
              visible={confirmationPopup}
              transparent>
              <View
                style={{
                  height: '30%',
                  alignSelf: 'center',
                  top: '40%',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      ...styles.confimationPopupContainer,
                    }}>
                    <View
                      style={{
                        height: '50%',

                        backgroundColor: appColors.lightGreen,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => setConfirationPopup(false)}
                        style={{
                          alignSelf: 'flex-end',
                          marginRight: 20,
                        }}>
                        {getIcon(
                          'ad',
                          'closecircle',
                          {marginTop: -20},
                          20,
                          appColors.primaryColor,
                        )}
                      </TouchableOpacity>
                      {getIcon('ad', 'checkcircle', null, 30, appColors.white)}
                      <Text
                        style={{
                          color: appColors.white,
                          ...styles.topSpacing,
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        Payment Details
                      </Text>
                    </View>
                    <View style={{padding: 15}}>
                      <Text style={{...styles.courseTitle}}>
                        {courseView.title}{' '}
                        {courseView.chapters &&
                          courseView.chapters.length != 0 &&
                          `- ${courseView.chapters[0].name}`}
                      </Text>
                      <Text
                        style={{...styles.courseDesc, borderBottomWidth: 0}}>
                        {courseView.duration} hours duration
                      </Text>

                      <View style={styles.priceAndBtnContainer}>
                        <Text
                          style={{
                            ...styles.topSpacing,
                            ...styles.courseRupees,
                            color: appColors.primaryColor,
                            fontSize: 18,
                          }}>
                          RM {courseView.price}
                        </Text>

                        <FullSizeBtn
                          onPress={() => {
                            purchaseCourse();
                          }}
                          btnColor={
                            unSubscribed
                              ? appColors.inkBlue
                              : appColors.paleGreen
                          }
                          btnTitle={'Confirm payment'}
                          // btnTitleStyles={{ backgroundColor: appColors.inkBlue, width: '50%' }}
                          style={{
                            backgroundColor: appColors.inkBlue,
                            width: '60%',
                            height: 40,
                            borderRadius: 40,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            {courseView.lessons.length == 0 && (
              <View
                style={{
                  ...styles.videoContainer,
                  backgroundColor: appColors.white,
                  marginTop: 10,
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '95%',
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                  source={
                    courseView.thumbnail
                      ? {uri: getProfileImage(courseView.thumbnail)}
                      : appImages.otherImages.TEACHING
                  }
                />
              </View>
            )}
            <ScrollView contentContainerStyle={styles.courseDetailsContainer}>
              <Text style={{...styles.courseTitle, fontSize: 16}}>
                {courseView.title}{' '}
                {courseView.lessons &&
                  courseView.lessons.length != 0 &&
                  `- ${courseView.lessons[0].name}`}
              </Text>
              <Text style={{...styles.courseDesc, borderBottomWidth: 0}}>
                {courseView.chapters &&
                  courseView.chapters.length != 0 &&
                  `Chaptor ${courseView.chapters[0].chapter_no}- ${courseView.chapters[0].name}`}
                {courseView.chapters &&
                  courseView.chapters.length != 0 &&
                  courseView.chapters.length != 1 &&
                  's -'}{' '}
                {courseView.duration} hours duration
              </Text>
              <Text style={{...styles.courseTitle, fontSize: 14}}>
                Class description
              </Text>
              <View style={{...styles.courseDesc, borderBottomWidth: 0}}>
                <AutoHeightWebView
                  viewportContent={'width=device-width, user-scalable=no'}
                  source={{html: `<html>${courseView.about}</html>`}}
                />
              </View>

              <View
                style={{
                  backgroundColor: appColors.white,
                  height: 75,
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingTop: 0,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: appColors.dimGrey,
                }}>
                <Text
                  style={{
                    ...styles.topSpacing,
                    ...styles.courseRupees,
                    color: appColors.darkGreen,
                    fontSize: 18,
                  }}>
                  RM {courseView.price} &nbsp;&nbsp;
                  {courseView.discount_price != 0 && courseView.discount_price && (
                    <Text
                      style={{
                        ...styles.topSpacing,
                        ...styles.courseRupees,
                        color: appColors.primaryColor,
                        textDecorationLine: 'line-through',
                        fontSize: 15,
                      }}>
                      ( RM {courseView.price + courseView.discount_price} )
                    </Text>
                  )}
                </Text>

                <FullSizeBtn
                  onPress={() =>
                    !courseView.is_enrolled && setConfirationPopup(true)
                  }
                  btnColor={
                    !courseView.is_enrolled
                      ? appColors.inkBlue
                      : appColors.paleGreen
                  }
                  btnTitle={courseView.is_enrolled ? 'Enrolled' : 'Pay Now'}
                  style={{
                    backgroundColor: !courseView.is_enrolled
                      ? appColors.inkBlue
                      : appColors.darkGreen,
                    width: '55%',
                    height: 35,
                    borderRadius: 40,
                  }}
                />
              </View>

              <Text style={styles.courseTitle}>Reviews</Text>
              {courseView.reviews.length != 0 ? (
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View sty={{width: '40%'}}>
                    {courseView.reviews.map((review, i) => {
                      return (
                        <View
                          key={i}
                          style={{...styles.topSpacing, flexDirection: 'row'}}>
                          <Text style={{...styles.starText, width: '25%'}}>
                            {review.star}
                          </Text>
                          <View>
                            <RatingProgressBar
                              progressLevel={Number(review.star) * 30}
                              widthHeight={{width: 150, height: 20}}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.overallRatingBox}>
                    {courseView.reveiw ? (
                      <Text style={styles.overallRating}>
                        {courseView.reveiw}
                      </Text>
                    ) : null}
                    <Rating
                      rating={courseView.reveiw}
                      iconSize={20}
                      style={{marginTop: 5}}
                    />
                    <Text style={styles.noOfReviews}>
                      {courseView.reveiw == 0
                        ? 'No Reviews yet'
                        : ` ${courseView.reveiw} reviews`}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.noOfReviews,
                    marginVertical: 20,
                    alignSelf: 'center',
                  }}>
                  No reviews yet
                </Text>
              )}
            </ScrollView>
          </ScrollView>
        )
      ) : (
        <ScrollView>
          <CourseListLoader style={{height: 150, width: WIDTH}} />
        </ScrollView>
      )}
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getCourseDetails: (requestData, onResponse, showSnackBar) => {
      dispatch(getCourseDetails(requestData, onResponse, showSnackBar));
    },
    purchaseCourse: (requestData, onResponse, showSnackBar) => {
      dispatch(purchaseCourse(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(OneToOneView);

import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../assets';
import Rating from '../../components/Rating';
import SearchBar from '../../components/SearchBar';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/HomeStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import GradePopup from '../../components/GradePopup';
import store from '../../redux/store';
import _ from 'lodash';
import {
  getSelectedGrade,
  getTopics,
  getUpcomingCourses,
} from '../../redux/root.actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ClassLoader from '../../components/loaders/ClassLoader';
import {GRADELIST, GRADESELECTED, NODATAFOUND} from '../../utils/constants';
import getPictures from '../../utils/commonfunctions/getPictures';
import NoDataFound from '../../components/NoDataFound';
import TopicLoader from '../../components/loaders/TopicLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getqueryParam from '../../utils/commonfunctions/getqueryParam';

export const Home = props => {
  const categories = store.getState().auth.categoryDetails;
  const gradeSelected = store.getState().app.other.selectedGrade;
  const [gradePopup, setGradePopup] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(
    gradeSelected ? gradeSelected.option : null,
  );
  const [selectedGradeLabel, setSelectedGradeLabel] = useState(
    gradeSelected ? gradeSelected.label : null,
  );
  const [upcomingClasses, setUpcomingClasses] = useState(null);
  const [topics, setTopics] = useState(null);

  React.useEffect(() => {
    let isActive = true;
    // BackHandler.addEventListener('hardwareBackPress', backAction);
    isActive && getUpcomingCourses();
    return () => {
      // BackHandler.removeEventListener('hardwareBackPress', backAction);
      isActive = false;
    };
  }, []);

  const [onErr, setOnErr] = useState(false);
  const getUpcomingCourses = async option => {
    props.getUpcomingCourses(
      null,
      res => {
        const response = res.data;
        if (response) {
          setUpcomingClasses(response);
        }
      },
      false,
    );
    let data = {
      grade_id: option ? option : gradeSelected && gradeSelected.option,
    };

    props.getTopics(
      gradeSelected && gradeSelected.option ? getqueryParam(data) : null,
      res => {
        const response = res.data;
        // response &&
        //   typeof response == 'object' &&
        //   _.isEmpty(response[0].title)
        //     ? setTopics([])
        //     :
        if (response) {
          setTopics(response);
        }
      },
      false,
    );
  };
  // const backAction = () => {
  // 	Alert.alert('Exit', 'Are you sure you want to exit from the App?', [
  // 		{
  // 			text: 'Cancel',
  // 			onPress: () => null,
  // 			style: 'cancel'
  // 		},
  // 		{ text: 'YES', onPress: () => BackHandler.exitApp() }
  // 	]);
  // 	return true;
  // };
  const storeGrade = async (option, label) => {
    const selectedObj = {option, label};
    await AsyncStorage.setItem(GRADESELECTED, JSON.stringify({option, label}));
    store.dispatch(getSelectedGrade(selectedObj));
  };
  return (
    <View style={basicStyles.container}>
      <GradePopup
        onSelect={(option, label) => (
          setTopics(null),
          setUpcomingClasses(null),
          storeGrade(option, label),
          setSelectedGrade(option),
          getUpcomingCourses(option),
          setSelectedGradeLabel(label),
          setGradePopup(false)
        )}
        visiblity={gradePopup}
        onClose={() => setGradePopup(false)}
      />
      {/*<View style={styles.searchBarContainer}>
        <SearchBar
          placeHolder="Search Course"
          style={{marginTop: 10, backgroundColor: 'white'}}
        />
      </View>*/}

      <ScrollView>
        <View style={{padding: 10}}>
          <View style={styles.categoryHeading}>
            <Text style={styles.categoryTitle}>Categories</Text>
            <TouchableOpacity
              style={styles.selectGrade}
              onPress={() => setGradePopup(true)}>
              <Text style={styles.selectGradeTxt}>
                {selectedGrade ? selectedGradeLabel : 'Select Grade'}
              </Text>
              {getIcon('ion', 'chevron-down-outline', null, 16)}
            </TouchableOpacity>
          </View>
          {categories ? (
            categories.length != 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginTop: 15}}>
                {categories.map((cat, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        props.navigation.navigate('OneToOne', {from: cat})
                      }
                      style={styles.categoryCard}>
                      <Text style={styles.categoryTitle}>{cat.name}</Text>
                      <Image
                        onError={() => {
                          setOnErr(true);
                        }}
                        resizeMode="stretch"
                        source={
                          cat.thumbnail
                            ? {uri: getPictures(cat.thumbnail)}
                            : appImages.otherImages.ONETOONECLASS
                        }
                        style={styles.categoryImg}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={{height: 150, width: '100%'}}>
                <NoDataFound msg="No categories for you" />
              </View>
            )
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 15}}>
              {[1, 2, 3, 4, 5].map((el, i) => {
                return (
                  <Fragment key={i}>
                    <TopicLoader style={{left: 10}} />
                  </Fragment>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.divisionalCard}>
          <View style={styles.divisionHeader}>
            <Text style={styles.categoryTitle}>Topics</Text>
            {getIcon('ion', 'chevron-forward', null, 25)}
          </View>

          {topics ? (
            topics.length != 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginTop: 15}}>
                {topics.map((top, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        props.navigation.navigate('TopicView', {topicData: top})
                      }
                      style={styles.divisionInnerCard}>
                      <Image
                        resizeMode="stretch"
                        source={
                          top.thumbnail
                            ? {uri: getPictures(top.thumbnail)}
                            : appImages.otherImages.ONETOONE
                        }
                        style={styles.topImg}
                      />
                      <Text
                        style={{
                          ...styles.divisionSub,
                          color: appColors.primaryColor,
                        }}>
                        {top.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <NoDataFound msg="No topics found for you" />
            )
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 15}}>
              {[1, 2, 3, 4, 5].map((el, i) => {
                return (
                  <Fragment key={i}>
                    <TopicLoader style={{left: 10}} />
                  </Fragment>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View
          style={{
            ...styles.divisionalCard,
            height: 250,
            backgroundColor: appColors.white,
            marginTop: -5,
          }}>
          <View style={styles.divisionHeader}>
            <Text style={styles.categoryTitle}>Upcoming Class</Text>
            {getIcon('ion', 'chevron-forward', null, 25)}
          </View>
          {upcomingClasses ? (
            upcomingClasses.length != 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginTop: 15}}>
                {upcomingClasses.map((course, i) => {
                  return (
                    <View style={styles.classesCard} key={i}>
                      <Image
                        resizeMode="stretch"
                        source={
                          course.thumbnail
                            ? {uri: getPictures(course.thumbnail)}
                            : appImages.otherImages.TEACHING
                        }
                        style={styles.continueImg}
                      />

                      <Text style={styles.subTitle}>{course.title}</Text>
                      <Text style={styles.divisionSub}>{course.slug}</Text>
                      <Text style={styles.divisionSub}>
                        {course.publishedDateTime}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <NoDataFound msg="No recent upcoming classes for you" />
            )
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 15}}>
              {[1, 2, 3, 4].map((el, i) => {
                return (
                  <Fragment key={i}>
                    <ClassLoader style={i > 0 && {marginLeft: 10}} />
                  </Fragment>
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// <View
// style={{
//   ...styles.divisionalCard,
//   height: 250,
//   backgroundColor: appColors.white,
// }}>
// <View style={styles.divisionHeader}>
//   <Text style={styles.categoryTitle}>Continue Watching</Text>
//   {getIcon('ion', 'chevron-forward', null, 25)}
// </View>
// <ScrollView
//   horizontal
//   showsHorizontalScrollIndicator={false}
//   contentContainerStyle={{marginTop: 15}}>
//   <View style={styles.classesCard}>
//     <Image
//       resizeMode="stretch"
//       source={appImages.otherImages.TEACHING}
//       style={styles.continueImg}
//     />

//     <Text style={styles.subTitle}>Chemistry</Text>
//     <Text style={styles.divisionSub}>Topic name</Text>
//     {/**							<Rating rating={4} iconSize={20} style={{ marginTop: 5 }} />
//      */}
//   </View>
//   <View style={styles.classesCard}>
//     <Image
//       resizeMode="stretch"
//       source={appImages.otherImages.TEACHING}
//       style={styles.continueImg}
//     />

//     <Text style={styles.subTitle}>Biology</Text>
//     <Text style={styles.divisionSub}>Topic name</Text>
//     {/*<Rating rating={3.5} iconSize={20} style={{marginTop: 5}} />*/}
//   </View>

//   <View style={styles.classesCard}>
//     <Image
//       resizeMode="stretch"
//       source={appImages.otherImages.TEACHING}
//       style={styles.continueImg}
//     />

//     <Text style={styles.subTitle}>English</Text>
//     <Text style={styles.divisionSub}>Topic name</Text>
//     {/*<Rating rating={4.5} iconSize={20} style={{marginTop: 5}} />*/}
//   </View>
// </ScrollView>
// </View>

const mapDispatchToProps = dispatch => {
  return {
    getUpcomingCourses: (requestData, onResponse, showSnackBar) => {
      dispatch(getUpcomingCourses(requestData, onResponse, showSnackBar));
    },
    getTopics: (requestData, onResponse, showSnackBar) => {
      dispatch(getTopics(requestData, onResponse, showSnackBar));
    },
    getSelectedGrade: (requestData, onResponse, showSnackBar) => {
      dispatch(getSelectedGrade(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);

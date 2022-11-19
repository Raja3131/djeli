import {useFocusEffect} from '@react-navigation/native';
import React, {Fragment, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../assets';
import CourseListLoader from '../../components/loaders/CourseListLoader';
import NoDataFound from '../../components/NoDataFound';
import {getMyCourses} from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/myCoursesStyles';
import appColors from '../../utils/appColors';
import getProfileImage from '../../utils/commonfunctions/getPictures';

export const MyCourses = props => {
  const [myCourses, setMycourses] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      getMyCourses();
    }, [props.navigation]),
  );
  const getMyCourses = async () => {
    props.getMyCourses(
      null,
      res => {
        const response = res.data;
        if (response) {
          setMycourses(response);
          console.log(response, 'setMycourses:::::::::');
        }
      },
      false,
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        ...basicStyles.container,
        flex: 0,
        height: undefined,
      }}>
      {myCourses ? (
        myCourses.length == 0 ? (
          <NoDataFound />
        ) : (
          myCourses.map((course, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('OneToOneView', {
                    courseData: course,
                  })
                }
                key={i}
                style={styles.courseCard}>
                <Text style={styles.cardSubTitle}>
                  {course.title} - {course.chapters[0].name}
                </Text>
                <View style={styles.classDetailsContainer}>
                  <Image
                    style={styles.classImage}
                    source={{uri: getProfileImage(course.image)}}
                  />

                  <View style={styles.classDesc}>
                    <Text
                      style={{
                        ...styles.cardTitle,
                        color: appColors.dimBlack,
                        fontWeight: '500',
                      }}>
                      {course.category.name}
                    </Text>
                    <Text style={{fontSize: 15}}>
                      {course.duration} hours duration
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 15,
                        color: appColors.primaryColor,
                      }}>
                      {course.enrolledDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )
      ) : (
        <CourseListLoader style={{...styles.courseCard, margin: 10}} />
      )}
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getMyCourses: (requestData, onResponse, showSnackBar) => {
      dispatch(getMyCourses(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(MyCourses);

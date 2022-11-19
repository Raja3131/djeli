import React, {Fragment, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../../assets';
import CourseListLoader from '../../../../components/loaders/CourseListLoader';
import NoDataFound from '../../../../components/NoDataFound';
import SearchBar from '../../../../components/SearchBar';
import {getAllcourses} from '../../../../redux/root.actions';
import store from '../../../../redux/store';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import appColors from '../../../../utils/appColors';
import getProfileImage from '../../../../utils/commonfunctions/getPictures';
import getqueryParam from '../../../../utils/commonfunctions/getqueryParam';
import {HEIGHT, WIDTH} from '../../../../utils/constants';

export const OneToOneSubList = props => {
  const {categoryData, course} = props.route.params;
  const gradeSelected = store.getState().app.other.selectedGrade;
  const [coursesList, setCoursesList] = useState(null);
  console.log(course.id, 'coursecourse');
  React.useEffect(() => {
    let isActive = true;
    props.navigation.setOptions({headerTitle: course.title});
    isActive && getSubCourseList();
    return () => {
      isActive = false;
    };
  }, []);

  const getSubCourseList = () => {
    let data = {
      grade_id: gradeSelected && gradeSelected.option,
      category: categoryData.id,
      sub_category: course.id,
    };
    props.getAllcourses(
      getqueryParam(data),
      res => {
        const response = res.data;
        if (response) {
          setCoursesList(response);
        }
      },
      false,
    );
  };

  return (
    <View style={{...basicStyles, flex: 0, height: undefined}}>
      <View style={{marginTop: 10}}>
        {coursesList ? (
          coursesList.length == 0 ? (
            <View style={{height: HEIGHT}}>
              <NoDataFound />
            </View>
          ) : (
            <ScrollView>
              {coursesList.map((courseData, i) => {
                return (
                  <View
                    style={{
                      ...styles.oneToOneCard,
                      justifyContent: 'space-between',
                    }}
                    key={i}>
                    <View style={{flexDirection: 'row', width: '70%'}}>
                      <Image
                        style={styles.oneToOneImg}
                        resizeMode="stretch"
                        source={
                          courseData.thumbnail
                            ? {uri: getProfileImage(courseData.thumbnail)}
                            : appImages.otherImages.ONETOONE
                        }
                      />
                      <View style={{marginLeft: 10}}>
                        <Text style={styles.onetoOneTitle}>
                          {courseData.title}
                        </Text>
                        <Text style={styles.onetoOneDesc}>
                          {courseData.slug}
                        </Text>
                        <Text style={styles.onetoOneDesc}>
                          {courseData.duration}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        ...styles.bookingBtn,
                        borderColor: courseData.is_enrolled
                          ? appColors.grey
                          : appColors.primaryColor,
                      }}
                      onPress={() =>
                        props.navigation.navigate('OneToOneView', {
                          categoryData,
                          courseData,
                        })
                      }>
                      <Text
                        style={{
                          ...styles.bookNowTxt,
                          color: courseData.is_enrolled
                            ? appColors.cement
                            : appColors.primaryColor,
                        }}>
                        {courseData.is_enrolled ? 'Enrolled' : 'Book now'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )
        ) : (
          <ScrollView>
            <CourseListLoader
              style={{height: 150, width: WIDTH, marginVertical: 10}}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getAllcourses: (requestData, onResponse, showSnackBar) => {
      dispatch(getAllcourses(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(OneToOneSubList);

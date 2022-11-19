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

export const OneToOne = props => {
  const [coursesList, setCoursesList] = useState(null);
  const categoryData = props.route.params.from;
  const gradeSelected = store.getState().app.other.selectedGrade;
  const categories = store.getState().auth.categoryDetails;
  React.useEffect(() => {
    let isActive = true;
    props.navigation.setOptions({headerTitle: categoryData.name});

    isActive && getCourseList();
    return () => {
      isActive = false;
    };
  }, []);

  const getCourseList = () => {
    let data = {
      grade_id: gradeSelected && gradeSelected.option,
      category: categoryData.id,
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
        {/*<SearchBar
          placeHolder="Seach subject or class"
          style={{height: 50, borderColor: appColors.placeHolderGrey}}
		/>*/}

        {coursesList ? (
          coursesList.length == 0 ? (
            <View style={{height: HEIGHT}}>
              <NoDataFound />
            </View>
          ) : (
            <ScrollView>
              {coursesList.map((course, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      {
                        if (course.ChapterCount == 0) {
                          props.navigation.navigate('OneToOneView', {
                            categoryData,
                            courseData: course,
                          });
                        } else {
                          props.navigation.navigate('PreRecordedView', {
                            categoryData,
                            courseData: course,
                          });
                        }
                      }
                    }}
                    style={{
                      ...styles.oneToOneCard,
                      justifyContent:
                        course.ChapterCount == 0
                          ? 'space-between'
                          : 'flex-start',
                    }}
                    key={i}>
                    <Image
                      style={styles.oneToOneImg}
                      resizeMode="stretch"
                      source={
                        course.image
                          ? {uri: getProfileImage(course.image)}
                          : appImages.otherImages.ONETOONE
                      }
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.onetoOneTitle}>{course.title}</Text>
                      {course.ChapterCount != 0 && (
                        <Text style={styles.onetoOneDesc}>
                          {course.ChapterCount}{' '}
                          {course.ChapterCount == 1 ? 'Chapter' : 'Chapters'}
                        </Text>
                      )}
                      <Text
                        style={{
                          ...styles.onetoOneDesc,
                          color: appColors.primaryColor,
                        }}>
                        {course.duration} hours
                      </Text>
                    </View>
                    {course.ChapterCount == 0 && (
                      <TouchableOpacity
                        style={{
                          ...styles.bookingBtn,
                          borderColor: course.is_enrolled
                            ? appColors.grey
                            : appColors.primaryColor,
                        }}>
                        <Text
                          style={{
                            ...styles.bookNowTxt,
                            color: course.is_enrolled
                              ? appColors.cement
                              : appColors.primaryColor,
                          }}>
                          {course.is_enrolled ? 'Enrolled' : 'Book now'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )
        ) : (
          <ScrollView>
            <Fragment>
              <CourseListLoader
                style={{height: 150, width: WIDTH, marginVertical: 10}}
              />
            </Fragment>
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

export default connect(null, mapDispatchToProps)(OneToOne);

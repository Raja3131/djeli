import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/categoryStyles';
import SearchBar from '../../components/SearchBar';
import appColors from '../../utils/appColors';
import {getAllcourses} from '../../redux/root.actions';
import store from '../../redux/store';
import getqueryParam from '../../utils/commonfunctions/getqueryParam';
import NoDataFound from '../../components/NoDataFound';
import CourseListLoader from '../../components/loaders/CourseListLoader';
import {HEIGHT, WIDTH} from '../../utils/constants';

export const TopicView = props => {
  const colorsArray = ['#f00c2a', '#f00ce1', '#800bd9', '#d92d0b', '#4c0fd9'];
  const [subTopicList, setSubTopicList] = useState(null);
  const gradeSelected = store.getState().app.other.selectedGrade;
  const {topicData} = props.route.params;
  React.useEffect(() => {
    let isActive = true;
    props.navigation.setOptions({headerTitle: topicData.title});

    isActive && getCourseList();
    return () => {
      isActive = false;
    };
  }, []);
  const randomColor = i => {
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randColor;
  };

  const getCourseList = () => {
    let data = {
      grade_id: gradeSelected && gradeSelected.option,
      subject_id: topicData && topicData.id,
    };

    props.getAllcourses(
      getqueryParam(data),
      res => {
        const response = res.data;
        if (response) {
          let filteredArray = response.filter((el, i) => el.ChapterCount != 0);
          setSubTopicList(filteredArray);
        }
      },
      false,
    );
  };

  return (
    <View style={basicStyles.container}>
      {subTopicList ? (
        subTopicList.length == 0 ? (
          <View style={{height: HEIGHT}}>
            <NoDataFound />
          </View>
        ) : (
          <ScrollView>
            {subTopicList.map((course, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    props.navigation.navigate('OneToOneView', {
                      courseData: course,
                    });
                  }}
                  style={{...styles.preRecordOuterView, paddingBottom: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        ...styles.preRecordChapFab,
                        borderRadius: 0,
                        backgroundColor: randomColor(i),
                      }}>
                      <Text style={styles.chapterTxt}>#{i + 1}</Text>
                    </View>
                    <View>
                      <Text style={styles.chapterName}>
                        Chapter {course.chapters[0].chapter_no}
                      </Text>
                      <Text
                        style={{
                          ...styles.chapterName,
                          fontSize: 13,
                          marginTop: 5,
                          fontWeight: 'normal',
                        }}>
                        {course.chapters[0].name}
                      </Text>
                    </View>
                  </View>
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
                </TouchableOpacity>
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
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getAllcourses: (requestData, onResponse, showSnackBar) => {
      dispatch(getAllcourses(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(TopicView);

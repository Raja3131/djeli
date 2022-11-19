import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import appColors from '../../../../utils/appColors';

export const PreRecordedView = props => {
  const {courseData, categoryData} = props.route.params;

  const randomColor = i => {
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randColor;
  };

  return (
    <View style={basicStyles.container}>
      {courseData.chapters &&
        courseData.chapters.length != 0 &&
        courseData.chapters.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('OneToOneView', {
                  categoryData,
                  courseData,
                });
              }}
              style={styles.preRecordOuterView}
              key={i}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    ...styles.preRecordChapFab,
                    backgroundColor: randomColor(i),
                  }}>
                  <Text style={styles.chapterTxt}>#{item.chapter_no}</Text>
                </View>
                <Text style={styles.chapterName}>{item.name}</Text>
              </View>
              <TouchableOpacity
                style={{
                  ...styles.bookingBtn,
                  borderColor: courseData.is_enrolled
                    ? appColors.grey
                    : appColors.primaryColor,
                }}>
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
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreRecordedView);

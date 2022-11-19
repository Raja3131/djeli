import React, {Fragment, useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import store from '../redux/store';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import RadioButton from './RadioButton';

const GradePopup = ({
  visiblity,
  onClose,
  onSelect,
  options,
  selectedOption,
}) => {
  const gradeOptions = options ? options : store.getState().auth.gradeDetails;
  const gradeSelected = selectedOption
    ? selectedOption
    : store.getState().app.other.selectedGrade;
  console.log(gradeSelected, 'GradeSelected');
  const [selectedGrade, setSelectedGrade] = useState(
    gradeSelected ? gradeSelected.option : undefined,
  );

  return (
    <Modal
      onRequestClose={onClose}
      style={{alignItems: 'center', justifyContent: 'center'}}
      visible={visiblity}
      transparent>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: appColors.white,
            borderWidth: 1,
            borderColor: appColors.primaryColor,
            padding: 10,
            width: '60%',
          }}>
          <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 10}}>
            Grade List
          </Text>
          <TouchableOpacity onPress={onClose}>
            {getIcon(
              'ad',
              'closecircle',
              {alignSelf: 'flex-end', marginTop: -30},
              15,
              appColors.primaryColor,
            )}
          </TouchableOpacity>
          {gradeOptions &&
            gradeOptions.map((option, index) => {
              return (
                <Fragment key={index}>
                  <RadioButton
                    label={option.label}
                    style={{
                      marginTop: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: appColors.dimGrey,
                      paddingBottom: 20,
                    }}
                    checked={selectedGrade && selectedGrade == option.value}
                    onChange={() => (
                      setSelectedGrade(option.value),
                      onSelect(option.value, option.label)
                    )}
                  />
                </Fragment>
              );
            })}
        </View>
      </View>
    </Modal>
  );
};

export default GradePopup;

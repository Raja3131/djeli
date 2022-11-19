import React from 'react';
import {View, Text} from 'react-native';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import {HEIGHT} from '../utils/constants';

const NoDataFound = ({msg}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {getIcon('fa5', 'book', {bottom: 5}, 35, appColors.smokyBlack)}
      <Text
        style={{
          fontSize: 18,
          fontWeight: '400',
          textAlign: 'center',
          color: appColors.primaryColor,
          top: 10,
        }}>
        {msg ? msg : 'No data found'}
      </Text>
    </View>
  );
};

export default NoDataFound;

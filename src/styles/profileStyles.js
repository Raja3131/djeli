import {StyleSheet} from 'react-native';
import appColors from '../utils/appColors';
import {WIDTH} from '../utils/constants';

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20,
    marginLeft: 10,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: '10%',
  },
  camerafab: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: appColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    bottom: 50,
    right: 20,
  },
  changePswdBtn: {
    height: 30,
    width: 130,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.primaryColor,
  },
  detailsContainer: {
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: appColors.placeHolderGrey,
  },
  detailTitle: {
    fontWeight: '400',
    fontSize: 16,
    color: appColors.primaryColor,
    textTransform: 'capitalize',
  },
  detailValue: {
    fontSize: 15,
    marginTop: 10,
  },
  //ecom styles upto bottom
  ecomProfileCard: {
    height: WIDTH / 2.5,
    borderBottomLeftRadius: WIDTH,
    borderBottomRightRadius: WIDTH,
    backgroundColor: appColors.ecomRoleCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecomName: {
    color: appColors.smokyBlack,
    fontSize: 20,
    fontWeight: '600',
  },
  ecomNumAndMail: {
    fontSize: 15,
    color: appColors.dimBlack,
    fontWeight: '400',
    top: 5,
  },
});

export default styles;

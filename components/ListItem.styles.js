import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemWrapper: {
    paddingTop: 15,
    marginLeft: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E5',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textWrapper: {
    flex: 1,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secondaryText: {
    fontSize: 15,
    color: '#8E8E93',
  },
  arrow: {
    marginRight: 20,
  },
});

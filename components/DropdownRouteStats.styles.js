import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 2,
    opacity: 0.85,
  },
  stat: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  number: {
    fontSize: 20,
    fontWeight: '400',
    color: '#1C1C1E',
  },
  label: {
    color: '#8e8e93',
    fontWeight: '500',
  },
});

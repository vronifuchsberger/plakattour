import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlays: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flex: 1,
  },
  addButton: {
    bottom: 10,
    backgroundColor: '#ff453a',
    alignSelf: 'flex-end',
    borderRadius: 28,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  addIcon: {
    marginLeft: 2,
    marginTop: 4,
  },
  resetRegion: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 15,
    padding: 10,
    borderRadius: 7,
    alignSelf: 'flex-end',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

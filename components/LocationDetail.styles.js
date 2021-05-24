import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  wrapper2: { overflow: 'hidden', flex: 1 },
  upperArea: {
    flexDirection: 'row',
  },
  closeButton: {
    padding: 5,
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  secondaryText: {},
  textBox: {
    flex: 1,
  },
  lowerArea: {
    borderTopWidth: 1,
    borderTopColor: '#E3E3E5',
    marginTop: 15,
    minHeight: 100,
    flex: 1,
  },
  lowerAreaButtons: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
  },
  button: {
    backgroundColor: '#F2F2F7',
    borderRadius: 5,
    marginBottom: 15,
    flexGrow: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ff453a',
    fontSize: 13,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
  },
  rowText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

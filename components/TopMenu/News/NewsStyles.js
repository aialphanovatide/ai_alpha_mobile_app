import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5F6466',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#D9D9D9',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 1,
    height: '50%',
    overflow: 'hidden',
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: '#242427',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scrollView: {
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EFEFEF',
  },
  newContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTitle: {
    marginBottom: 5,
    color: '#242427',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  textDescription: {
    fontSize: 12,
    color: '#000000',
  },
  newsImage: {
    width: '90%',
    height: 80,
    marginHorizontal: 'auto',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#5F6466',
    textAlign: 'left',
    fontSize: 12,
  },
  backButtonContainer: {paddingHorizontal: 5, paddingVertical: 10},
  backButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B8BBBC',
    textDecorationLine: 'underline',
  },
  dateContainer: {
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default styles;

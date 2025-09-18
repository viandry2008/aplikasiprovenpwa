import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  table: {
    flexDirection: 'column',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2794eb',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  dataRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  alternateRow: {
    backgroundColor: '#F9FAFB',
  },
  headerCell: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  dataCell: {
    fontSize: 13,
    color: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },

  noCell: {
    width: '10%',
    textAlign: 'center',
  },
  idCell: {
    width: '20%',
    textAlign: 'center',
  },
  nameCell: {
    width: '45%',
    textAlign: 'left',
    paddingLeft: 6,
  },
  timeCell: {
    width: '25%',
    textAlign: 'center',
  },
});

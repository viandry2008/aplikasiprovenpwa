import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pageNumberButton: {
    minWidth: 36,
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#2794eb',
    borderColor: '#2794eb',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  activePageText: {
    color: '#ffffff',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});
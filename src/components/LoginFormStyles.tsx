import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5', // Background halus
    padding: 20,
    width: '100%',
  },

  card: {
    backgroundColor: '#2794eb',
    borderRadius: 20,
    padding: 30,
    width: '100%',           // Memenuhi lebar parent
    maxWidth: 400,           // Batas maksimal lebar (penting untuk web)
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 50,
    width: '100%',
  },

  icon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },

  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
    width: '100%',
  },

  picker: {
    height: 50,
    color: '#333',
  },

  loginButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
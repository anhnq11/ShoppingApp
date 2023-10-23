import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu thông tin người dùng khi đăng nhập thành công 
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Lỗi khi lưu thông tin người dùng:', error);
  }
};

// Lấy thông tin người dùng đã lưu
export const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        return userData;
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };
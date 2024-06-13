import React, { FC, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegistrationPage: FC<{navigation: any}> = ({navigation}) => {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleRegistration = () => {
    // כאן יתבצע טיפול בלוגיקה של ההרשמה, כולל בדיקת תקינות נתונים ושליחת בקשה לשרת
    if (email && password && name && age) {
      // אם המשתמש נרשם בהצלחה, נציג הודעה ונעביר לעמוד התחברות
      Alert.alert('ההרשמה הושלמה', 'נרשמת בהצלחה!', [{ text: 'הבנתי', onPress: () => navigation.navigate('mainPageLogin') }]);
    } else {
      // אם יש שדה ריק, נציג הודעת שגיאה
      Alert.alert('שגיאה', 'יש למלא את כל השדות');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>הרשמה</Text>
      <TextInput
        placeholder="אימייל"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="סיסמה"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="שם"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="גיל"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      <Button title="הרשמה" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationPage;

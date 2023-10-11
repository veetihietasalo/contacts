import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(
          data.map(contact => ({
            name: contact.name,
            phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].number : 'N/A',
          }))
        );
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text>Name: {item.name}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={{ padding: 100 }}>
      <Button title="Get Contacts" onPress={getContacts} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default App;

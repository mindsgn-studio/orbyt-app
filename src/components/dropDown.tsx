import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dropdown = ({ list, title }: { list: any[]; title: string }) => {
  const [selectedItem, setSelectedItem] = useState(list[0].name);

  const renderPickerItems = () => {
    return list.map((item: any, index: any) => (
      <Picker.Item key={index} label={item.name} value={item.name} />
    ));
  };

  const renderIcon = () => {
    const selectedIcon = list.find(
      (item: any) => item.name === selectedItem
    )?.icon;
    return selectedIcon ? (
      <Image source={{ uri: selectedIcon }} style={styles.icon} />
    ) : null;
  };

  return (
    <View
      style={{
        flex: 0.5,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'SF-Pro-Rounded-Heavy',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 1,
          padding: 5,
        }}
      >
        {renderIcon()}
        <Picker
          selectedValue={selectedItem}
          style={styles.picker}
          onValueChange={(itemValue: any) => setSelectedItem(itemValue)}
        >
          {renderPickerItems()}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {},
  picker: {
    flex: 1,
  },
});

export default Dropdown;

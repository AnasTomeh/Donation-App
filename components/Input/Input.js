import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import style from './style';
import PropTypes from 'prop-types';
const Input = (props) => {

  const {label, placeholder, secureTextEntry, keyboardType, onChangeText} = props;

  const [value, setValue] = useState('');

  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <TextInput
        placeholder={placeholder ? placeholder : null}
        style={style.input}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={val => {
          setValue(val);
          onChangeText(val);
        }}
      />
    </View>
  );
};

Input.defaultProps = {
  onChangeText: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
};

Input.propTypes = {
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
};

export default Input;

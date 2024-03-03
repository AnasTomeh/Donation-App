import style from "./style";
import { Pressable, Text } from "react-native";
import PropTypes from "prop-types";


const Button = (props) => {

  const {isDisabled, title, onPress} = props;

  return (
    <Pressable
      disabled={isDisabled}
      style={[style.button, isDisabled && style.disabled]}
      onPress={() => onPress()}>
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
}

Button.defaultProps = {
  isDisabled: false,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Button;

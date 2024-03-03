import React from 'react';
import { Image, Pressable, View } from "react-native";
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';
import Header from '../Header/Header';
import style from "./styel";


const SingleDonationItem = (props) => {

  const {badgeTitle, uri, donationTitle, price, onPress, donationItemId} = props;

  return (
    <Pressable onPress={() => onPress(donationItemId)}>
      <View>
        <View>
          <View style={style.badge}>
            <Badge title={ badgeTitle} />
          </View>
          <Image resizeMode={'cover'} source={{uri:  uri}} style={style.image} />
        </View>
        <View style={style.donationInformation}>
          <Header
            title={ donationTitle}
            type={3}
            color={'#0A043C'}
            numberOfLines={1}
          />
          <View style={style.price}>
            <Header
              title={'$' + price.toFixed(2)}
              type={3}
              color={'#156CF7'}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

SingleDonationItem.defaultProps = {
 onPress: () => {}
}

SingleDonationItem.propTypes = {
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  donationItemId: PropTypes.number.isRequired
};

export default SingleDonationItem;

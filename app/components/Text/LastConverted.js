import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const LastConverted = ({
  base, quote, coverstionRate, date,
}) => (
  <Text style={styles.smallText}>
        1
    {' '}
    {base}
    {' '}
=
    {' '}
    {coverstionRate}
    {' '}
    {quote}
    {' '}
as of
    {' '}
  </Text>
);

LastConverted.propTypes = {

  base: PropTypes.string,
  quote: PropTypes.string,
  coverstionRate: PropTypes.number,
  date: PropTypes.object,
};

export default { LastConverted };

import React, { Component } from 'react';
import {
  ScrollView, StatusBar, Platform, Linking,
} from 'react-native';
import { ionIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_SIZE = 23;
const ICON_COLOR = '#868686';
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';

class Options extends Component {
  static propTypes: {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  }

  handleThemesPress = () => {
    this.props.navigation.navigate('Themes');
  };

  handleSitePress = () => {
    Linking.openURL('hfffttp://fixer.io').catch(() => this.props.alertWithType('error', 'Sorry!', 'Fixer.io cant be opened'));
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          // customIcon={
          //   <ionIcons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />
          // }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          // customIcon={
          //   <ionIcons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />
          // }
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);

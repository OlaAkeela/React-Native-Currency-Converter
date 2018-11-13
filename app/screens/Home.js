import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { swapCurrencies, changeCurrencyAmount } from '../actions/currencies';

const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = '0.7974';
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
  };

  handlePressBaseCurrency = () => {
    console.log('press base');
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Base Currency' });
  };

  handlePressQouteCurrency = () => {
    console.log('qoute base');
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Quote Currency' });
  };

  handleTextChange = (amount) => {
    const { dispatch } = this.props;
    dispatch(changeCurrencyAmount(amount));
  };

  handleSwapCurrency = () => {
    const { dispatch } = this.props;
    dispatch(swapCurrencies());
  };

  handleOptionPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Options');
  };

  render() {
    const { baseCurrency, quoteCurrency } = this.props;

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <View />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultVlaue={TEMP_BASE_PRICE}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            onPress={this.handlePressQouteCurrency}
            editable={false}
            defaultVlaue={TEMP_QUOTE_PRICE}
          />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            conversionRate={TEMP_CONVERSION_RATE}
            date={TEMP_CONVERSION_DATE}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    isFetching: conversionSelector.isFetching,
  };
};

export default connect(mapStateToProps)(Home);

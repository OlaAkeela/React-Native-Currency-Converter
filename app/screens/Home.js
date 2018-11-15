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
import { connectAlert } from '../components/Alert';
import { swapCurrencies, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    const { currencyError, alertWithType } = this.props;
    if (nextProps.currencyError && nextProps.currencyError !== currencyError) {
      alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handlePressBaseCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };

  handlePressQouteCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
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
    const {
      baseCurrency,
      quoteCurrency,
      amount,
      conversionRate,
      isFetching,
      lastConvertedDate,
      primaryColor,
    } = this.props;

    let quotePrice = (amount * conversionRate).toFixed(2);
    if (isFetching) {
      quotePrice = '...';
    }

    return (
      <Container backgroundColor={primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={primaryColor} />
          <View />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={primaryColor}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            onPress={this.handlePressQouteCurrency}
            editable={false}
            defaultValue={quotePrice}
            textColor={primaryColor}
          />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            conversionRate={conversionRate}
            date={lastConvertedDate}
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
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));

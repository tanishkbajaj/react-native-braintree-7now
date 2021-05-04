/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BraintreeDropIn from 'react-native-braintree-dropin-ui';


const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const checkIfVenmoInstalled = () => {

    BraintreeDropIn.checkIfVenmoInstalled((callback) => {
      console.log(callback);

    });

  }

  const payPalPayment = () => {

    // let result = {"description": "ddd", "deviceData": "{\"correlation_id\":\"d100754a829c4510bb9334da618cf224\"}", "isDefault": false, "nonce": "049bd691-8b97-0a5b-6c99-771c0d94f186", "type": "PayPal"};

    // let deviceData = JSON.parse(result.deviceData);
    //   console.log("resultData", deviceData);

    //   let alertBody = `type: ${result.type} \n nonce: ${result.nonce} \n Description: ${result.description} \n isDefault: ${result.isDefault} \n deviceData.correlation_id: ${deviceData.correlation_id}`;

    //   Alert.alert(
    //     "Payment Success",
    //     alertBody
    //   );

    // return;
    // BraintreeDropIn.
    BraintreeDropIn.payPalPayment({
      clientToken: 'sandbox_8h2rgnn3_gx4py578yxtwjq5t',
      merchantIdentifier: 'gx4py578yxtwjq5t',
      googlePayMerchantId: 'googlePayMerchantId',
      countryCode: 'US',    //apple pay setting
      currencyCode: 'USD',   //apple pay setting
      merchantName: 'Your Merchant Name for Apple Pay',
      orderTotal: '500'
    })
      .then(
        result => console.log(result)
      )
      .catch((error) => {

        console.log("error", error)
        if (error.code === 'USER_CANCELLATION') {
          // update your UI to handle cancellation
        } else {
          // update your UI to handle other errors
        }
      });
  }

  const venmoPayment = () => {

    // BraintreeDropIn.
    BraintreeDropIn.venmoPayment({
      clientToken: 'sandbox_8h2rgnn3_gx4py578yxtwjq5t',
      merchantIdentifier: 'gx4py578yxtwjq5t',
      googlePayMerchantId: 'googlePayMerchantId',
      countryCode: 'US',    //apple pay setting
      currencyCode: 'USD',   //apple pay setting
      merchantName: 'Your Merchant Name for Apple Pay',
      orderTotal: '500'
    })
      .then(
        result => console.log(result))
      .catch((error) => {

        console.log("error", error)
        if (error.code === 'USER_CANCELLATION') {
          // update your UI to handle cancellation
        } else {
          // update your UI to handle other errors
        }
      });
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: 300
          }}>


          <Button
            title="PayPal"
            onPress={() => payPalPayment()}
          />
          <Button
            title="Venmo"
            onPress={() => venmoPayment()}
          />
          <Button
            title="check venmo"
            onPress={() => checkIfVenmoInstalled()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

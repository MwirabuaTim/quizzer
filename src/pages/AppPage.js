import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import AppHeader from '../components/AppHeader';
import TriviaContainer from '../containers/TriviaContainer';
import ScoreboardContainer from '../containers/ScoreboardContainer';

// navigation
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

export const AppNavigator = TabNavigator(
  {
    TriviaScreen: { screen: TriviaContainer },
    ScoreboardScreen: { screen: ScoreboardContainer } // replace with a container depending of the detail page function
  },
  {
    lazy: true, // do not load scoreboard results unless the screen is navigated to
    tabBarOptions: {
      activeTintColor: 'black',
      labelStyle: {
        fontSize: 18,
      },
      style: {
        backgroundColor: 'powderblue',
      }
  }
});

const AppPage = ({ dispatch, nav }) => (
  <View style={{flex: 1}}>
    <AppHeader />
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav
      })}
    />
  </View>
)

AppPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nav: state.nav
});


export default connect(mapStateToProps)(AppPage);

import React, {useMemo} from 'react';
import {selectMatchingAlerts} from '../../../actions/alertsActions';
import {useSelector} from 'react-redux';
import useSearchStyles from '../SearchStyles';
import useAlertsStyles from '../../Alerts/styles';
import {View} from 'react-native';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import AlertDetails from '../../Alerts/AlertItem';

// Component to render the section with the alerts that match the search query. It receives the current text and the loading state as props. It uses the AlertDetails component to render the alert details in the same way as the other sections, but displaying them with the other search results.
export const SearchAlertSection = ({currentText, loading}) => {
  const memoizedSelector = useMemo(
    () => selectMatchingAlerts(currentText),
    [currentText],
  );
  const foundAlerts = useSelector(memoizedSelector) || [];
  const styles = useSearchStyles();
  const alertsStyles = useAlertsStyles();

  return (
    <View style={styles.cryptoSearch}>
      {loading ? (
        <SkeletonLoader type="alerts" quantity={4} />
      ) : (
        foundAlerts &&
        foundAlerts.length > 0 &&
        foundAlerts.map(alert => (
          <AlertDetails
            key={alert.alert_id}
            message={alert.alert_message}
            timeframe={alert.alert_name}
            price={alert.price}
            created_at={alert.created_at}
            styles={alertsStyles}
          />
        ))
      )}
    </View>
  );
};

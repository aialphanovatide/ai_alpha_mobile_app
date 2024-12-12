import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import AlertDetails from './alertDetails';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../../../../NoContentDisclaimer/NoContentDisclaimer';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAlertsByCoin,
  selectAlertsByCoin,
  selectAlertsLoading,
} from '../../../../../../../actions/alertsActions';

const AlertListComponent = ({botName, timeframe, styles}) => {
  // const [alerts, setAlerts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const alerts = useSelector(selectAlertsByCoin);
  const loading = useSelector(selectAlertsLoading);
  const dispatch = useDispatch();

  // Fetches the alerts
  useEffect(() => {
    dispatch(fetchAlertsByCoin({coins: botName, timeInterval: timeframe}));
  }, [timeframe, botName, dispatch]);

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      style={styles.alertListContainer}>
      {loading === 'idle' ? (
        <View style={styles.loaderContainer}>
          <SkeletonLoader type="alerts" quantity={3} />
        </View>
      ) : loading !== 'idle' && alerts.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, no matches.'}
          description={
            "We couldn't find any search results.\nGive it another go."
          }
        />
      ) : (
        alerts.slice(0,10).map(alert => (
          <AlertDetails
            key={alert.alert_id}
            date={alert.created_at}
            message={alert.alert_message}
            timeframe={alert.alert_name}
            price={alert.price}
            styles={styles}
          />
        ))
      )}
    </ScrollView>
  );
};

export default AlertListComponent;

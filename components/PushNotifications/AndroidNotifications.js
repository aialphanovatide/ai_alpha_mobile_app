// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import React, {useEffect} from 'react';
// import {Platform} from 'react-native';
// import PushNotification from 'react-native-push-notification';

// const PushController = () => {
//   useEffect(() => {
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log('TOKEN:', token);
//       },
//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);
//         // process the notification here
//         // required on iOS only
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },
//       // Android only
//       senderID: '1090501687137',
//       // iOS only
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },
//       popInitialNotification: false,
//       requestPermissions: Platform.OS === 'android' ? false : true,
//     });

//     return () => {
//       // Optionally, you can clean up PushNotification configuration here
//       // For example:
//       PushNotification.off('notification');
//       PushNotification.off('register');
//     };
//   }, []);

//   return null;
// };

// export default PushController;
/**
 * Socket Provider
 */
 import React, {useEffect, useRef} from 'react';
 import socketIOClient from 'socket.io-client';
 
 const SOCKET_DEV = 'https://ntf1vmdf-9000.use.devtunnels.ms/';
 
 export const SocketContext = React.createContext({socket: null});
 
 /**
  * connectionConfig
  */
 const connectionConfig = {
   jsonp: false,
   reconnection: true,
   reconnectionDelay: 100,
   reconnectionAttempts: 100000,
   transports: ['websocket'],
 
 };
 

 export const SocketProvider = ({children}) => {
   const env = SOCKET_DEV;
   const socket = useRef(socketIOClient(env, connectionConfig));
   //console.log("SOCKET IN PROVIDER ->", socket)
/*
 
   useEffect(() => {
    socket.on('connect', msg => {
        console.log('SocketIO: Connect', msg);
        socket = socketIOClient(env, connectionConfig);
      }); 
     socket.current.on('disconnect', msg => {
       console.log('SocketIO: Disconnect', msg);
       socket.current = socketIOClient(env, connectionConfig);
     });
 
     return () => {
       if (socket && socket.current) {
         socket?.current?.removeAllListeners();
         socket?.current?.close();
       }
     };
   }, [env]);

   */
 
   return (
     <SocketContext.Provider value={{socket: socket.current}}>
       {children}
     </SocketContext.Provider>
   );
 };
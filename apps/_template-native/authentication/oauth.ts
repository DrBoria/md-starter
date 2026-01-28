
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '219402392863-r749djotop4lrj514evfvpdhr9m575k3.apps.googleusercontent.com', // From Google Console
    offlineAccess: true, // If you want serverAuthCode
});


export { GoogleSignin };

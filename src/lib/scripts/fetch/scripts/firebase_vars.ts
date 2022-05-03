import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDoqLHD5-IDiJaiJQgdP_a8Zy7Tas-gSls',
	authDomain: 'atelmo-f3241.firebaseapp.com',
	projectId: 'atelmo-f3241',
	storageBucket: 'atelmo-f3241.appspot.com',
	messagingSenderId: '31078064670',
	appId: '1:31078064670:web:f0adc605fe4bee02e5040f',
	measurementId: 'G-SGQQVNRQGG'
};

export const firebase_app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase_app);
export const firestore = getFirestore(firebase_app);

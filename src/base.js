import Rebase from 're-base';

//connection to firebase
const base = Rebase.createClass({
	// Initialize Firebase
	apiKey: "AIzaSyDUBfqqxzqFas-gIfsNo9x5V-Uln0D5uFU",
	authDomain: "catch-of-the-day-leao.firebaseapp.com",
	databaseURL: "https://catch-of-the-day-leao.firebaseio.com",
	// storageBucket: "catch-of-the-day-leao.appspot.com",
	// messagingSenderId: "769351571238"
});

export default base;
// HTTP Request
import axios from 'axios';
import fileDownload from 'js-file-download';

// Firebase Config
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDCsbGBCMX5kjiWjc_zXpiQaexBT_gCC9Y',
    authDomain: 'unihack-fiatlux.firebaseapp.com',
    projectId: 'unihack-fiatlux',
    storageBucket: 'unihack-fiatlux.appspot.com',
    messagingSenderId: '668936761557',
    appId: '1:668936761557:web:d78decde68b1ea09b7b25c'
};

export default function handleDownload(fileName) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    const storageRef = firebase.storage().ref();
    const pptxRef = storageRef.child(fileName);
    pptxRef.getDownloadURL()
        .then((url) => {
            axios.get(url, {
                responseType: 'blob',
            })
                .then((res) => {
                    fileDownload(res.data, fileName);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}
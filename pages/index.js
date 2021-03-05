import React from 'react';
import { Heading } from '@chakra-ui/react';
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDCsbGBCMX5kjiWjc_zXpiQaexBT_gCC9Y',
    authDomain: 'unihack-fiatlux.firebaseapp.com',
    projectId: 'unihack-fiatlux',
    storageBucket: 'unihack-fiatlux.appspot.com',
    messagingSenderId: '668936761557',
    appId: '1:668936761557:web:d78decde68b1ea09b7b25c'
};

export default function Home() {
    return (
        <Heading>Hello</Heading>
    );
}

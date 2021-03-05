// POST request
import Pptxgen from 'pptxgenjs';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export default (req, res) => {
    if (req.method === 'POST') {
        res.status(200).json({name: 'John Doe' });
    }
};

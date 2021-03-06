// POST request
import Pptxgen from 'pptxgenjs';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

function createChevron(pptx, title, items) {
    const sl = pptx.addSlide();
    const texts = [];
    const subheadings = [];
    const icons = [];
    const numberOfChevron = items.length;

    for (let i = 0; i < numberOfChevron; i++) {
        texts.push(items[i].heading);
        subheadings.push(items[i].subheading);
        icons.push(items[i].iconName);
    }

    sl.addText(title,
        {
            x: '43%',
            y: '10%',
            color: '000000',
            fill: { color: 'FFFFFF' },
            align: pptx.AlignH.left,
        });

    sl.background = {
        fill: 'FFFFFF',
    };
    sl.color = '000000';

    const positions = new Map();

    positions.set(4,
        [
            ['8%', '28%', '48%', '68%'], /* chevron pos */
            ['17%', '37%', '57%', '77%'], /* image pos */
            ['14%', '34%', '54%', '74%'], /* textbox pos */
            '24%',
        ]);

    positions.set(5,
        [
            ['12%', '27%', '42%', '57%', '72%'],
            ['19%', '34%', '49%', '64%', '79%'],
            ['14%', '29%', '44%', '59%', '74%'],
            '19%',
        ]);
    positions.set(6,
        [
            ['12%', '24%', '36%', '48%', '60%', '72%'],
            ['18%', '30%', '42%', '54%', '66%', '78%'],
            ['12%', '24%', '36%', '48%', '60%', '72%'],
            '16%',
        ]);

    for (let i = 0; i < numberOfChevron; i++) {
        // add chevron
        sl.addShape(pptx.ShapeType.chevron,
            {
                x: positions.get(numberOfChevron)[0][i],
                y: '43%',
                w: positions.get(numberOfChevron)[3],
                h: '18%',
                fill: {
                    color: 'ED7D31'
                },
            });

        // add image
        sl.addImage(
            {
                path: icons[i],
                // path: "01.png", //change to image url
                w: '5%',
                h: '7.5%',
                x: positions.get(numberOfChevron)[1][i],
                y: '48%',
            },
        );

        // add textbox
        sl.addText(
            texts[i],
            {
                x: positions.get(numberOfChevron)[2][i],
                y: '30%',
                w: '12%',
                h: '12%',
                align: 'center',
                valign: 'middle',
                fontSize: 14,
            },
        );

        // add subheading
        sl.addText(
            subheadings[i],
            {
                x: positions.get(numberOfChevron)[2][i],
                y: '65%',
                w: '12%',
                h: '12%',
                align: 'center',
                valign: 'middle',
                fontSize: 11,
            },
        );
    }
    return sl;
}

export default (req, res) => {
    if (req.method === 'POST') {
        // Initialize pptxgen instance
        const pptx = new Pptxgen();
        // pptxgen metadata
        pptx.author = 'Sample Author';
        pptx.company = 'University of Melbourne';
        pptx.revision = '1';
        pptx.subject = 'Sample Presentation';
        pptx.title = 'Sample Presentation';

        // const slide = pptx.addSlide();
        // const textboxText = `${req.body.title}`;
        // const textboxOpts = {
        //     x: 1, y: 1, color: '363636', fill: { color: 'F1F1F1' }, align: pptx.AlignH.center,
        // };
        // slide.addText(textboxText, textboxOpts);

        const slides = [];
        if (req.body.slideType === 'CHEVRON') {
            slides.push(createChevron(pptx, req.body.title, req.body.body));
        }

        // Initialize Firebase Admin instance
        const rootDirectory = process.cwd();
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(`${rootDirectory}/service-account-file.json`),
                storageBucket: 'unihack-fiatlux.appspot.com',
            });
        } else {
            admin.app();
        }

        // Establish connection to Firebase Storage
        const bucket = admin.storage().bucket();
        const uniqueId = uuidv4();
        const fileName = `pptx/sample-${uniqueId}.pptx`;
        const file = bucket.file(fileName);

        // Save the pptx instance, then upload it to Firebase Storage
        pptx.write('uint8array')
            .then((data) => {
                file.save(data)
                    .then(() => {
                        console.log('Upload successful!');
                        res.status(200).json({ fileName });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).end();
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end();
            });
    } else {
        // Method Not Allowed
        res.status(405).end();
    }
};

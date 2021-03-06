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
    const fontFaceHeading = 'Bahnschrift SemiBold SemiConden'; // This is the default text style for headings
    const fontFaceBody = 'Bahnschrift Light Condensed'; // This is the default text style for body
    const themeColor1 = '1500B1'; // Dark blue
    const themeColor2 = 'DE4C4D'; // Red

    for (let i = 0; i < numberOfChevron; i += 1) {
        texts.push(items[i].heading);
        subheadings.push(items[i].subheading);
        icons.push(items[i].iconName);
    }

    sl.addText(title,
        {
            x: '8%',
            y: '10%',
            w: '80%',
            h: '10%',
            color: '000000',
            bold: true,
            fontFace: fontFaceHeading,
            fontSize: '28',
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
            ['8%', '28%', '48%', '68%'], // chevron pos
            ['17%', '37%', '57%', '77%'], // image pos
            ['9%', '29%', '49%', '69%'], // heading text pos
            ['8%', '28%', '48%', '68%'], // sub-heading text pos
            '24%', // width of chevron
            '18%', // width of heading text
            '20%', // width of sub heading text
        ]);

    positions.set(5,
        [
            ['12%', '27%', '42%', '57%', '72%'],
            ['19.5%', '34.5%', '49.5%', '64.5%', '79.5%'],
            ['12.5%', '27.5%', '42.5%', '57.5%', '72.5%'],
            ['12%', '27%', '42%', '57%', '72%'],
            '19%',
            '13%',
            '15%',
        ]);
    positions.set(6,
        [
            ['10%', '22%', '34%', '46%', '58%', '70%'],
            ['16.5%', '28.5%', '40.5%', '52.5%', '64.5%', '76.5%'],
            ['9.5%', '21.5%', '33.5%', '45.5%', '57.5%', '69.5%'],
            ['10%', '22%', '34%', '46%', '58%', '70%'],
            '16%',
            '13%',
            '12%',
        ]);

    for (let i = 0; i < numberOfChevron; i += 1) {
        // add chevron
        sl.addShape(pptx.ShapeType.chevron,
            {
                x: positions.get(numberOfChevron)[0][i],
                y: '43%',
                w: positions.get(numberOfChevron)[4],
                h: '18%',
                fill: {
                    color: themeColor2,
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

        // add heading textbox
        sl.addText(
            texts[i],
            {
                x: positions.get(numberOfChevron)[2][i],
                y: '30%',
                w: positions.get(numberOfChevron)[5],
                h: '12%',
                align: 'center',
                valign: 'middle',
                fontSize: 14,
                bold: true,
                fontFace: fontFaceHeading,
                color: themeColor1,
            },
        );

        // add subheading
        sl.addText(
            subheadings[i],
            {
                x: positions.get(numberOfChevron)[3][i],
                y: '65%',
                w: positions.get(numberOfChevron)[6],
                h: '30%',
                align: 'left',
                valign: 'top',
                fontSize: 11,
                fontFace: fontFaceBody,
            },
        );
    }
    return sl;
}

function createGanttChart(pptx, data, sl, startBar = 42.5) {
    const steps = new Map();
    //let bar = startBar;
    for (let i = 0; i < data.length; i += 1) {
        steps.set(data[i].activityName, [
            data[i].period, parseInt(data[i].startPeriod, 10), parseInt(data[i].endPeriod, 10), 'DE4C4D',
            parseInt(data[i].eventPeriod, 10), data[i].eventName, data[i].eventColour,
        ]);
    }
    let startBarV = 31.5;
    const startEvent = 42.5;
    let startLegend = 15;

    let barWidth = 0;

    steps.forEach((value) => {
        if (value[0]) {
            startBar = 42.5 + ((value[1] - 1) * 4.1);
            barWidth = (value[2] - value[1] + 1) * 4.1;
            sl.addShape(pptx.ShapeType.rect,
                {
                    x: startBar.toString().concat('%'),
                    y: startBarV.toString().concat('%'),
                    w: barWidth.toString().concat('%'),
                    h: '7.1%',
                    fill: {
                        color: value[3],
                    },
                });
            startBar += barWidth;
        }
        if (value[4] > 0) {
            barWidth = (value[4] - 1) * 4.1;

            sl.addShape(
                pptx.ShapeType.triangle,
                {
                    x: (startEvent + barWidth + 1).toString().concat('%'),
                    y: (startBarV + 1.25).toString().concat('%'),
                    w: '2%',
                    h: '3.6%',
                    fill: {
                        color: value[6],
                    },
                },
            );

            sl.addShape(
                pptx.ShapeType.triangle,
                {
                    x: startLegend.toString().concat('%'),
                    y: '87%',
                    w: '2%',
                    h: '3.6%',
                    fill: {
                        color: value[6],
                    },
                },
            );

            startLegend += 3;

            sl.addText(
                value[5],
                {
                    x: startLegend.toString().concat('%'),
                    y: '85%',
                    w: '12.5%',
                    h: '7.1%',
                },
            );

            startLegend += 14;
        }

        startBarV += 7.15;
    });

    return startBar;
}

function createTableGantt(pptx, tableData, title) {
    console.log(JSON.stringify(tableData));
    console.log(tableData);
    const fontFaceHeading = 'Bahnschrift SemiBold SemiConden'; // This is the default text style for headings
    const fontFaceBody = 'Bahnschrift Light Condensed'; // This is the default text style for body

    const dataDate = [
        {
            text: 'Week',
            fontSize: 11,
            fontFace: fontFaceBody,
            options: {
                fill: '00008B',
                border: [{ color: '000000' },
                    { color: '000000' },
                    { color: '000000' },
                    { color: '000000' }],
            },
        },
        { text: '1', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '2', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '3', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '4', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '5', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '6', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '7', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '8', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '9', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '10', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '11', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
        { text: '12', fontFace: fontFaceBody, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
    ];
    let sl = pptx.addSlide();
    let dataSlideA = [dataDate];
    let dataSlideB = [dataDate];
    let dataA = [];
    let dataB = [];
    let slides = [];
    let threshold = 0;
    let leftOver = 0;

    if (tableData.length > 7) {
        threshold = Math.round(tableData.length / 2);
        leftOver = tableData.length - threshold;
        for (let index = 0; index < threshold; index += 1) {
            dataSlideA.push(
                [
                    { text: tableData[index].activityName, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
                ],
            );

            dataA.push(tableData[index]);
        }
        for (let index = threshold; index < tableData.length; index += 1) {
            dataSlideB.push(
                [
                    { text: tableData[index].activityName, options: { border: [{ color: '000000' }, { color: '000000' }, { color: '000000' }, { color: '000000' }] } },
                ],
            );

            dataB.push(tableData[index]);
        }
    }
    sl.addText(title,
        {
            x: '8%',
            y: '10%',
            w: '80%',
            h: '10%',
            color: '000000',
            bold: true,
            fontFace: fontFaceHeading,
            fontSize: '28',
            fill: { color: 'FFFFFF' },
            align: pptx.AlignH.left,
        });
    sl.addTable(dataSlideA, {
        x: '7.5%',
        y: '25%',
        colW: [3.5, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41],
        rowH: 0.375,
    });
    console.log(dataA);
    console.log(dataB);
    const startTimeline = createGanttChart(pptx, dataA, sl);
    slides.push(sl);
    if (dataSlideB.length > 1) {
        sl = pptx.addSlide();
        sl.addTable(dataSlideB,
            {
                x: '7.5%',
                y: '25%',
                colW: [3.5, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41],
                rowH: 0.375,
            });
        createGanttChart(pptx, dataB, sl, startTimeline);
        slides.push(sl);
        return slides;
    }
    return slides;
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
        if (req.body.slideType === 'GANTT') {
            slides.push(createTableGantt(pptx, req.body.body, req.body.title));
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

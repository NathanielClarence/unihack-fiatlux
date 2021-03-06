// POST request
import Pptxgen from 'pptxgenjs';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

// function createChart(pptx, title, csvFile,chartType = "LINE"){
//     if (chartType === "LINE"){
//         const type = pptx.ChartType.line
//     } else if (chartType === "BAR"){
//         const type = pptx.ChartType.bar
//     }

//     return new Promise(function(resolve, reject){
//         let sl = pptx.addSlide()
//         sl.addText(title, 
//             {
//                 x: "43%", 
//                 y: "10%", 
//                 color: "000000", 
//                 fill:{color: "FFFFFF"},
//                 align: pptx.AlignH.left
//             }
//         )

//         sl.background = {
//             fill: "FFFFFF"
//         }
//         sl.color = "000000"

//         let chartData = []

//         fs.createReadStream(csvFile)
//             .pipe(parse())
//             .on('error', error => {
//                 console.error(error)
//             })
//             .on('data', row => chartData.push(row))
//             .on('end', rowCount => 
//                 {
//                     //console.log(`Parsed ${rowCount} rows`)
                    
//                     let title = chartData.shift()
//                     //console.log(title)
//                     title.shift()
//                     //console.log(title)
//                     let labels = []
//                     let values = []
//                     title.forEach(e => {values.push(new Array())})

//                     for (let i = 0; i < chartData.length; i++){
//                         labels.push(chartData[i].shift())
//                         for(let j = 0; j < chartData[i].length; j++){
//                             values[j][i] = chartData[i][j]
//                         }
//                     }

//                     let dt = []

//                     for (let i = 0; i < title.length; i++){
//                         dt.push(
//                             {
//                                 name: title[i],
//                                 labels: labels,
//                                 values: values[i]
//                             }
//                         )
//                     }

//                     sl.addChart(type, dt, {showLegend: true})

//                     resolve(sl)
//                 }
//             );
//     })
// }

// function createPieChart(pptx, title, csvFile) {
//     return new Promise(function(resolve, reject){
//         let sl = pptx.addSlide()
//         sl.addText(title,
//             {
//                 x: '43%',
//                 y: '10%',
//                 color: '000000',
//                 fill:{ color: 'FFFFFF' },
//                 align: pptx.AlignH.left,
//             }
//         )

//         sl.background = {
//             fill: "FFFFFF"
//         }
//         sl.color = "000000"

//         let chartData = []

//         fs.createReadStream(csvFile)
//             .pipe(parse())
//             .on('error', error => {
//                 console.error(error)
//             })
//             .on('data', row => chartData.push(row))
//             .on('end', rowCount =>
//                 {
//                     //console.log(`Parsed ${rowCount} rows`)

//                     let title = chartData.shift()
//                     let labels = []
//                     let values = []

//                     for (let i = 0; i < chartData.length; i++){
//                         labels.push(chartData[i][0])
//                         values.push(chartData[i][1])
//                     }

//                     let dt = [
//                         {
//                             name: title.pop(),
//                             labels: labels,
//                             values: values
//                         }
//                     ]

//                     sl.addChart('pie', dt, {
//                         type: 'pie',
//                         showLegend: true,
//                         legendPos: 't'
//                     })

//                     resolve(sl)
//                 }
//             );
//     })
// }

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
        // const slide;
        // if (req.body.slideType === 'CHEVRON') {
        //     slides.push(createChevron(pptx, req.body.title, req.body.body));
        // } else if (req.body.slideType === 'PIE') {
        //     slide = await createPieChart(pptx, req.body.title, req.body.file); //req.body.file as csv file upload
        //     slides.push(slide);
        // } else if (req.body.slideType === 'CHART') {
        //     //req.body.file as csv file upload
        //     // req.body.chartType as string "LINE" "BAR" (for now only 2 provided)
        //     slide = await createChart(pptx, req.body.title, req.body.file, req.body.chartType)
        //     slides.push(slide);
        // }

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

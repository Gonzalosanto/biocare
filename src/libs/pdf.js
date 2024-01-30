const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs  = require('fs')
const Path = require('path')

async function createPdf(data) {
    const pdfDoc = await PDFDocument.create()
    //FUENTE
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    //COLOR DE TEXTO y DOCUMENTO
    const documentColor = rgb(0,0.6,0.6)

    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 20
    const textFontSize = 14
    const xInitialPosition = 50
    const yInitialPosition = height - 4 * fontSize
    const yDisplacement = 46
    const textDisplacement = 240
    const yRelativePosition = yInitialPosition - 80
    const keyToTxt = (key, index) => {
        page.drawText(key.toString().toUpperCase(), {
            x: xInitialPosition + textDisplacement,
            y: yRelativePosition - yDisplacement * index,
            size: textFontSize,
            font: helveticaBold,
        })
    }
    const renderProperty = () => {
        let index = 0
        for (let [key, value] of Object.entries(data.content)) {
            //subtitle
            switch (key){
                case "usuario":
                    keyToTxt("Solicitado por:", index);
                    break;
                case "equipo":
                    if(data.type === 'consumible'){
                        keyToTxt("Consumible", index)
                        break;
                    }
                    if(data.type === 'capacitacion'){
                        keyToTxt("Capacitación")
                        break;
                    }
                    keyToTxt("Equipo médico", index)
                    break;
                default:
                    keyToTxt(key, index);
                    break;
            }

            function prioridadColor(p){
                page.drawText(value.toString().toLocaleLowerCase(), {
                    x: xInitialPosition + textDisplacement,
                    y: yRelativePosition - yDisplacement * index - 20,
                    size: textFontSize,
                    font: helveticaBold,
                    color: () => { if(value.toString() === 'ALTA') return rgb(1,0,0)
                    else if(value.toString() === 'MEDIA') {rgb(0.7, 0.3, 0)} else {
                        return documentColor
                    }}
                })
            }

            page.drawText(value.toString(), {
                x: xInitialPosition + textDisplacement,
                y: yRelativePosition - yDisplacement * index - 20,
                size: textFontSize,
                font: helveticaBold,
            })
            index++;
        }
    }

    //images constants

    //logo
    const logoPath = Path.join(process.cwd(),"\\public\\logo.png")
    const embedLogoPNG = fs.readFileSync(logoPath)
    const logoImage = await pdfDoc.embedPng(embedLogoPNG)

    //hospital logo
    const hospitalLogoPath = Path.join(process.cwd(),"\\public\\hospital_logo.png")
    const embedHospitalLogoPNG = fs.readFileSync(hospitalLogoPath)
    const hospitalLogoImage = await pdfDoc.embedPng(embedHospitalLogoPNG)


    //REPORT TITLE
    const title = (type) => {
        page.drawText('SOLICITUD DE',{
            x: xInitialPosition,
            y: yInitialPosition + 20,
            size: 20,
            font: helveticaBold,
            color: documentColor
        })
        if(type == 'FALLO'){
            page.drawText("MANTENIMIENTO", {
                x:xInitialPosition,
                y: yInitialPosition - 10,
                size: 20,
                font: helveticaBold,
                color: documentColor
            })
        } else {
            page.drawText(type, {
                x:xInitialPosition,
                y: yInitialPosition - 10,
                size: 24,
                font: helveticaBold,
                color: documentColor
            })
        }



        page.drawImage(logoImage,{
            x:xInitialPosition + 180,
            y: yInitialPosition - 30,
            width: 100, height: 100
        })
        page.drawImage(hospitalLogoImage,{
            x:xInitialPosition + 300,
            y: yInitialPosition - 10,
            width: 200, height: 50
        })
    }
    title(data.tipo)

    //image
    if (data.icon){
        //        page.drawImage(iconImage,{
        //             x:xInitialPosition,
        //             y: yInitialPosition - 260,
        //             size: 200
        //         })
    } else {
        page.drawSquare({
            color: documentColor,
            x: xInitialPosition,
            y: yInitialPosition - 260,
            size: 200
        })
    }

    //TEXTOS VARIABLES
    if(data.content) {
        renderProperty()
    }
    else {
        page.drawText('No hay reportes...', {
            x: xInitialPosition + 120,
            y: yInitialPosition - yDisplacement,
            size: fontSize,
            font: helveticaBold,
        })
    }

    if(data.description){
        let index = 0
        const verticalDisplacement = 220
        for (let [key, value] of Object.entries(data.description)) {
            //subtitle
            page.drawText(key.toString().toUpperCase(), {
                x: xInitialPosition,
                y: (yRelativePosition - verticalDisplacement) - 140 * index,
                size: textFontSize,
                font: helveticaBold,
            })
            //text
            console.log(value)
            page.drawText(value.toString().toLocaleLowerCase(), {
                x: xInitialPosition,
                y: (yRelativePosition - verticalDisplacement) - 30 - 60 * index,
                size: textFontSize,
                font: helveticaBold
            })
            index++;
        }
    }
    //footer
    page.drawRectangle({
        x:xInitialPosition,
        y: yInitialPosition - 700,
        width: 500,
        color: documentColor,
        opacity: 0.3
    })
    page.drawText("NOMBRE Y FIRMA", {
        x: xInitialPosition + 200,
        y: yInitialPosition - 672,
        font: helveticaBold,
        size: 14
    })
    page.drawText("DEPARTAMENTO DE INGENIERÍA BIOMÉDICA", {
        x: xInitialPosition + 100,
        y: yInitialPosition - 690,
        font: helveticaBold,
        size: 14
    })

    //SAVE
    return pdfDoc.save()
}

module.exports = { createPdf }
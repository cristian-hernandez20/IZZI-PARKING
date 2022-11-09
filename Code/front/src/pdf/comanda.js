import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

let structureImage = (image) => {
  let format = { width: "13%", margin: [0, 2, 0, 2], alignment: "start" };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [50, 50];
    format.image = image;
  }

  return { ...format };
};
let tableBody = (listado = []) => {
  let items_pdf = [];

  listado.forEach((item) => items_pdf.push(formatItem(item)));

  return items_pdf;
};
let formatItem = (item) => {
  return [
    { text: item.point_name, fontSize: 9, bold: true, alignment: "start" },
    { text: item.name_watchman, fontSize: 9, bold: true, alignment: "start" },
    { text: item.document_watchman, fontSize: 9, bold: true, alignment: "center" },
    { text: item.date, fontSize: 9, bold: true, alignment: "center" },
    { text: item.time_date, fontSize: 9, bold: true, alignment: "center" },
  ];
};

export default function (items, info_print, logo) {
  console.log(items);
  return new Promise((resolve) => {
    var dd = {
      info: {
        title: "Ticket",
        author: "eonia",
        subject: "Informacion de parqueo",
        keywords: "keywords for document",
      },
      pageMargins: [200, 95, 20, 60],
      header: function (currentPage, pageCount, pageSize) {
        var width_page = pageSize.width - 40;

        return {
          margin: [40, 30, 40, 0],
          stack: [
            {
              columns: [
                {
                  margin: [200, 20, 0, 0],
                  stack: [{ text: "IZZI PARKING" }],
                  width: "100%",
                  fontSize: 30,
                },
              ],
            },
          ],
        };
      },
      content: [
        {
          stack: [
            {
              stack: llenarFormato(items),
            },
          ],
        },
      ],
    };
    pdfMake.createPdf(dd).open();
    resolve(true);
  });
}

function llenarFormato(item) {
  return [
    {
      columns: [
        {
          table: {
            bold: true,
            widths: ["68%"],
            body: [
              [
                {
                  // text: " NIT:900.190.679-9,REGIMEN COMUN, RES NO: 07000085880, FECHA22/11-2010,FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS",
                  text: `NIT:900.190.679-9,REGIMEN COMUN, RES NO: 07000085880, FECHA ${moment().format(
                    "YYYY-MM-DD"
                  )},FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS`,
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
    {
      alignment: "center",
      marginTop: 15,
      columns: [
        {
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: " Encargado:", bold: true, border: [false, false, false, false] },

                { text: item.name, border: [false, false, false, false] },
              ],
              [
                { text: " Tiquete No:", bold: true, border: [false, false, false, false] },
                { text: "78945632454586", border: [false, false, false, false] },
              ],
              [
                { text: " Fecha de ingreso ", bold: true, border: [false, false, false, false] },
                { text: item.date_init, border: [false, false, false, false] },
              ],
              [
                { text: " Hora de ingreso", bold: true, border: [false, false, false, false] },
                { text: item.time_init, border: [false, false, false, false] },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
    {
      alignment: "center",
      marginTop: 15,
      columns: [
        {
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: " Tipo veh.:", bold: true, border: [false, false, false, false] },

                { text: "MOTOS", border: [false, false, false, false] },
              ],
              // [
              //   { text: " Marca:", bold: true, border: [false, false, false, false] },
              //   { text: "YAMAHA ", border: [false, false, false, false] },
              // ],
              [
                { text: "Placa", bold: true, border: [false, false, false, false] },
                { text: item.placa, border: [false, false, false, false] },
              ],
              [
                { text: " Puesto", bold: true, border: [false, false, false, false] },
                { text: item.puesto, border: [false, false, false, false] },
              ],
              // [
              //   { text: " Cedula:", bold: true, border: [false, false, false, false] },
              //   { text: "412121836", border: [false, false, false, false] },
              // ],
            ],
          },

          width: "90%",
        },
      ],
    },
    {
      marginTop: 15,
      columns: [
        {
          table: {
            widths: ["68%"],
            body: [
              [
                {
                  text: " IZZI PARKING NO SE HACE RESPONSABLE POR DAÑOS O PERDIDAS CAUSADS POR MOTIN,INCENDIO,TERREMOTO,ATRAACOS, Y DEMAS PENDEJADAS QUE SE LE OCURRA >:v ",
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
  ];
}

function cuadroCanvasLetter(condicion) {}

function llenarDiagnosticos(col) {}
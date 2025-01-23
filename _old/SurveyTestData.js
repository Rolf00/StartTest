// start app: npm run start-pc


import IConst from './itable/IConst';

import { 
  statusIncomplete, 
  statusUnverified, 
  statusComplete } from './IIconHtml';


export const dataRoles = [
  { id: 1, name:"Patient", },
  { id: 2, name:"Secretary", },
  { id: 3, name:"Doctor", },
  { id: 4, name:"Nurse", },
];

/*
export const dataEditors = [
  { id: 1, name:"Patient",                institution: "",                   idRole: 1, },
  { id: 2, name:"Secretary (Insel)",      institution: "Insel Spital, Bern", idRole: 2, },
  { id: 3, name:"Dr. med. Cuche (Insel)", institution: "Insel Spital, Bern", idRole: 3, },
  { id: 4, name:"Dr. med. Jans (KSZ)",    institution: "Ka.Spi. Zürich",     idRole: 3, },
  { id: 5, name:"Nrs. Monika (Insel)",    institution: "Insel Spital, Bern", idRole: 4, },
  { id: 6, name:"Nrs. Jasmine (KSZ)",     institution: "Ka.Spi. Zürich",     idRole: 4, },
];
*/

export const dataPatients = [
  { id: 1, lastname: "Zurkinden",  firstname: "Hans",    age: 34, },
  { id: 2, lastname: "Müller",     firstname: "Brigit",  age: 28, },
  { id: 3, lastname: "Vonlanthen", firstname: "Peter",   age: 56, },
  { id: 4, lastname: "Scherrer",   firstname: "Eveline", age: 45, },
  { id: 5, lastname: "Bircher",    firstname: "Pascal",  age: 38, },
];

export const dataSurveys = [
  { id: 1, name: "Demographic Baseline",  },
  { id: 2, name: "Primary Diagnosis",  },
  { id: 3, name: "Baseline Health Inventory",  },
  { id: 4, name: "Tumor-related Surgery", },
  { id: 5, name: "Imaging",  },
  { id: 6, name: "Radiation",  },
  { id: 7, name: "Chemotherapy And Protocols", },
  { id: 8, name: "Follow Up", },
  { id: 9, name: "Study", },
  { id: 10, name: "Radiation Prior To Proton Therapy", },
  // TODO : more
];


export const dataPatientSurveys = [
  // TODO : other fields needed?
  { id:1,  idPatient: 1, idSurvey: 1, startDate: "01.01.2025",},
  { id:2,  idPatient: 1, idSurvey: 2, startDate: "01.01.2025", },
  { id:3,  idPatient: 1, idSurvey: 3, startDate: "01.01.2025", },
  { id:4,  idPatient: 1, idSurvey: 4, startDate: "01.01.2025", },
  { id:5,  idPatient: 2, idSurvey: 4, startDate: "01.01.2025", },
  { id:6,  idPatient: 2, idSurvey: 5, startDate: "01.01.2025", },
  { id:7,  idPatient: 2, idSurvey: 6, startDate: "01.01.2025", },
  { id:8,  idPatient: 3, idSurvey: 7, startDate: "01.01.2025", },
  { id:9,  idPatient: 3, idSurvey: 8, startDate: "01.01.2025", },
  { id:10, idPatient: 4, idSurvey: 9, startDate: "01.01.2025", },
  { id:11, idPatient: 4, idSurvey: 1, startDate: "01.01.2025", },
  { id:12, idPatient: 4, idSurvey: 2, startDate: "01.01.2025", },
  { id:13, idPatient: 4, idSurvey: 3, startDate: "01.01.2025", },
  { id:14, idPatient: 5, idSurvey: 4, startDate: "01.01.2025", },
  { id:15, idPatient: 5, idSurvey: 5, startDate: "01.01.2025", },
  { id:16, idPatient: 5, idSurvey: 6, startDate: "01.01.2025", },
];

export const dataSurveysSections = [
  // TODO : other fields needed?
  { id:1,  idSurvey: 1, idSection: 1, },
  { id:2,  idSurvey: 1, idSection: 2, },
  { id:3,  idSurvey: 1, idSection: 3, },
  { id:4,  idSurvey: 1, idSection: 4, },
  { id:5,  idSurvey: 2, idSection: 1, },
  { id:6,  idSurvey: 2, idSection: 5, },
  { id:7,  idSurvey: 2, idSection: 6, },
  { id:8,  idSurvey: 3, idSection: 7, },
  { id:9,  idSurvey: 3, idSection: 8, },
  { id:10, idSurvey: 4, idSection: 9, },
  { id:11, idSurvey: 4, idSection: 1, },
  { id:12, idSurvey: 4, idSection: 2, },
  { id:13, idSurvey: 4, idSection: 3, },
  { id:14, idSurvey: 5, idSection: 4, },
  { id:15, idSurvey: 5, idSection: 5, },
  { id:16, idSurvey: 5, idSection: 6, },
];

export const dataSections = [
  // TODO : remove idSurvey here
  { id: 1, idSurvey: 1, idRole: 1, name: "Clinical Trial",           },
  { id: 2, idSurvey: 1, idRole: 1, name: "Key Current Infos",        },
  { id: 3, idSurvey: 1, idRole: 1, name: "Executive Office Section", },
  { id: 4, idSurvey: 2, idRole: 2, name: "Research studies",         },
  { id: 5, idSurvey: 3, idRole: 3, name: "Musculoskeletal",          },
  { id: 6, idSurvey: 4, idRole: 4, name: "Airways",                  },
];

export const dataQuestions = [
  // 1 = Clinical Trial
  { 
    id: 101, 
    idSection: 1,
    question: "Trial name", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Trial name item 1" },
      {id: 2, value: "Trial name item 2" },
      {id: 3, value: "Trial name item 3" },
    ],
  },
  { 
    id: 102, 
    idSection: 1, 
    question: "Medical centre", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Medical center item 1" },
      {id: 2, value: "Medical center item 2" },
      {id: 3, value: "Medical center item 3" },
    ],
  },
  { 
    id: 103, 
    idSection: 1, 
    question: "Current status", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Current status item 1" },
      {id: 2, value: "Current status item 2" },
      {id: 3, value: "Current status item 3" },
    ],
  },
  { 
    id: 104, 
    idSection: 1, 
    question: "Start date", 
    editType: IConst.editType_Date,
    datetimeCheck: IConst.datetimeCheck_After,
    helperText: "the date can be in the future"
  },
  { 
    id: 105, 
    idSection: 1, 
    question: "Stop date", 
    editType: IConst.editType_Date,
    datetimeCheck: IConst.datetimeCheck_Before,
    helperText: "the date can be in the past"
  },
  { 
    id: 106, 
    idSection: 1, 
    question: "Comment", 
    editType: IConst.editType_TextfieldMultiline,
    maxTextLenght: 200,
  },
  // 2 = "Key Current Infos"
  { 
    id: 201, 
    idSection: 2, 
    question: "Date of last report / last FU date", 
    editType: IConst.editType_Date,
    datetimeCheck: IConst.datetimeCheck_Before,
    helperText: "the date can be in the future"
  },
  { 
    id: 202, 
    idSection: 2, 
    question: "Today's date if address was checked", 
    editType: IConst.editType_Date,
    datetimeCheck: IConst.datetimeCheck_After,
  },
  { 
    id: 203, 
    idSection: 2, 
    question: "Weight last FU", 
    editType: IConst.editType_Date,
    helperText: "the date can be in the future",
  },
  { 
    id: 204, 
    idSection: 2, 
    question: "Sitting without support", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Sitting without support item 1" },
      {id: 2, value: "Sitting without support item 2" },
      {id: 3, value: "Sitting without support item 3" },
    ],
  },
  /*
  { 
    id: 205, 
    idSection: 3, 
    question: "Walking alone (without support)", 
    //editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Walking without support item 1" },
      {id: 2, value: "Walking without support item 2" },
      {id: 3, value: "Walking without support item 3" },
    ],
  },
  { 
    id: 206, 
    idSection: 3, 
    question: "Able to walk 10m unaided", 
    //editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Able to walk 10m item 1" },
      {id: 2, value: "Able to walk 10m item 2" },
      {id: 3, value: "Able to walk 10m item 3" },
    ],
  },
  */
  // 3 = "Executive Office Section"
  { 
    id: 301, 
    idSection: 3, 
    question: "The Executive Office", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "The Executive Office item 1" },
      {id: 2, value: "The Executive Office item 2" },
      {id: 3, value: "The Executive Office item 3" },
    ],
  },
  { 
    id: 302, 
    idSection: 3, 
    question: "TODO list for Executive Office", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 303, 
    idSection: 3, 
    question: "Communication with patient/family", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 304, 
    idSection: 3, 
    question: "Communication with medical centre", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 305, 
    idSection: 3, 
    question: "Communication with medical centre", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 306, 
    idSection: 3, 
    question: "Communication with medical centre", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 307, 
    idSection: 3, 
    question: "Communication with medical centre", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 308, 
    idSection: 3, 
    question: "Communication with medical centre", 
    editType: IConst.editType_TextfieldMultiline,
  },
  // 4 = "Research studies"
  { 
    id: 401, 
    idSection: 4, 
    question: "Patient is involved in project", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Patient is involved item 1" },
      {id: 2, value: "Patient is involved item 2" },
      {id: 3, value: "Patient is involved item 3" },
    ],
  },
  { 
    id: 402, 
    idSection: 4, 
    question: "Date of first information of patient", 
    editType: IConst.editType_Date,
    datetimeCheck: IConst.datetimeCheck_Before,
    helperText: "the date can be in the future",
  },
  { 
    id: 403, 
    idSection: 4, 
    question: "First informatioen done by", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "First information done item 1" },
      {id: 2, value: "First information done item 2" },
      {id: 3, value: "First information done item 3" },
    ],
  },
  { 
    id: 404, 
    idSection: 4, 
    question: "Project status", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Project status item 1" },
      {id: 2, value: "Project status item 2" },
      {id: 3, value: "Project status item 3" },
    ],
  },
  { 
    id: 405, 
    idSection: 4, 
    question: "Actions requested", 
    editType: IConst.editType_TextfieldMultiline,
  },
  { 
    id: 406, 
    idSection: 4, 
    question: "Communication Doctor-Patient", 
    editType: IConst.editType_TextfieldMultiline,
  },
  // 5 = "Musculoskeletal"
  { 
    id: 501, 
    idSection: 5, 
    question: "Scoliosis previous", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Scoliosis previous item 1" },
      {id: 2, value: "Scoliosis previous item 2" },
      {id: 3, value: "Scoliosis previous item 3" },
    ],
  },
  { 
    id: 502, 
    idSection: 5, 
    question: "Cobb angle before surgery", 
    editType: IConst.editType_Integer,
  },
  { 
    id: 503, 
    idSection: 5, 
    question: "Contractures previous", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Contractures previous item 1" },
      {id: 2, value: "Contractures previous item 2" },
      {id: 3, value: "Contractures previous item 3" },
    ],
  },
  // 6  = "Airways"
  { 
    id: 601, 
    idSection: 6, 
    question: "Pulmonary function test doone?", 
    editType: IConst.editType_Dropdown,
    dropdownList: [
      {id: 1, value: "Pulmonary function test item 1" },
      {id: 2, value: "Pulmonary function test item 2" },
      {id: 3, value: "Pulmonary function test item 3" },
    ],
  },
  { 
    id: 602, 
    idSection: 6, 
    question: "Pulmonary function test done?", 
    // TODO
    //editType = IConst.editType_CheckboxList,
    checkboxList: [
      {id: 1, caption: "No" },
      {id: 2, caption: "Non-invasive / part-time" },
      {id: 3, caption: "Non-invasive / any" },
      {id: 4, caption: "Nosagastric exclusive" },
      {id: 5, caption: "Nosagastric inclusive" },
      {id: 6, caption: "Unknown" },
    ],
  },
  { 
    id: 603, 
    idSection: 6, 
    question: "Show stop dates for", 
    // TODO
    //editType = IConst.editType_CheckboxList,
    checkboxList: [
      {id: 1, caption: "Non-invasive / part-time" },
      {id: 2, caption: "Non-invasive / full-time" },
      {id: 3, caption: "Nosagastric exclusive" },
      {id: 4, caption: "Nosagastric inclusive" },
    ],
  },
];


// EXAMPLE data
export const dataAnswers = [
  // TODO date inserted ? date updated needes?
  { id: 1001, idQuestion: 101, value: 1,              idPatient: 1, verified: true, },  // dropdown
  { id: 1002, idQuestion: 102, value: 3,              idPatient: 1, verified: false,},  // dropdown
  //{ id: 1003, idQuestion: 103, value: 2,            idPatient: 1, verified: true, },  // dropdown
  { id: 1004, idQuestion: 104, value: "01.01.2025",   idPatient: 1, verified: true, },  // date
  //{ id: 1005, idQuestion: 105, value: "01.01.2025", idPatient: 1, verified: true, },  // date
  { id: 1006, idQuestion: 106, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  // 2 = "Key Current Infos"
  //{ id: 2001, idQuestion: 201, value: "01.01.2025", idPatient: 1, verified: true, },  // date
  { id: 2002, idQuestion: 202, value: "01.01.2025",   idPatient: 1, verified: true, },  // date
  { id: 2003, idQuestion: 203, value: 65,             idPatient: 1, verified: false,},  // integer
  { id: 2004, idQuestion: 204, value: 2,              idPatient: 1, verified: true, },  // dropdown
  //{ id: 2005, idQuestion: 205, value: 1,            idPatient: 1, verified: true, },  // dropdown
  //{ id: 2006, idQuestion: 206, value: 2,            idPatient: 1, verified: true, },  // dropdown
  // 3 = "Executive Office Section"
  { id: 3001, idQuestion: 301, value: 2,              idPatient: 1, verified: true, },  // dropdown
  { id: 3002, idQuestion: 302, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  { id: 3003, idQuestion: 303, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  //{ id: 3004, idQuestion: 304, value: "Long text",  idPatient: 1, verified: true, },  // multiline text
  { id: 3004, idQuestion: 305, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  { id: 3004, idQuestion: 306, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  //{ id: 3004, idQuestion: 307, value: "Long text",  idPatient: 1, verified: true, },  // multiline text
  { id: 3004, idQuestion: 308, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  // 4 = "Research studies"
  { id: 4001, idQuestion: 401, value: 2,              idPatient: 1, verified: true, },  // dropdown
  { id: 4002, idQuestion: 402, value: "01.01.2025",   idPatient: 1, verified: true, },  // date
  { id: 4003, idQuestion: 403, value: 3,              idPatient: 1, verified: true, },  // dropdown
  { id: 4004, idQuestion: 404, value: 4,              idPatient: 1, verified: true, },  // dropdown
  { id: 4005, idQuestion: 405, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  { id: 4006, idQuestion: 406, value: "Long text",    idPatient: 1, verified: true, },  // multiline text
  // 5 = "Musculoskeletal"
  { id: 5001, idQuestion: 501, value: 3,              idPatient: 1, verified: true, },  // dropdown
  { id: 5002, idQuestion: 502, value: 35,             idPatient: 1, verified: true, },  // integer
  { id: 5003, idQuestion: 503, value: 1,              idPatient: 1, verified: true, },  // dropdown
  // 6  = "Airways"
  { id: 6001, idQuestion: 601, value: ";1;2;3;",      idPatient: 1, verified: true, },  // dropdown
  { id: 6002, idQuestion: 602, value: ";1;3;",        idPatient: 1, verified: true, },  // dropdown
  { id: 6003, idQuestion: 603, value: ";2;3;",        idPatient: 1, verified: true, },  // dropdown
];

function getLinkPage1(islink)
{
  const onelink  = {
    isLink: islink,
    caption: "Patients",
    href: "/P1Patients_R",
  }
  return onelink;
}

function getLinkPage2(islink, patientId)
{
  const pat = dataPatients.filter(p => p.id === patientId);
  const onelink  = {
    isLink: islink,
    caption: pat[0].lastname + " " + pat[0].firstname,
    href: `/P2OnePatient_R?idPatient=${patientId}`,
  }
  return onelink;
}

function getLinkPage3(islink, roleId, surveyId)
{
  const rol = dataRoles.filter(p => p.id === roleId);
  let title = "role '" + rol[0].name + "', ";
  const srv = dataSurveys.filter(p => p.id === surveyId);
  title = title + "survey '" + srv[0].name + "'";
  const onelink  = {
    isLink: islink,
    caption: title,
  }
  return onelink;
}

function getLinkPage4(islink, sectionId)
{
  const section = dataSections.filter(p => p.id === sectionId);
  const title = "section '" + section[0].name + "'";
  const onelink  = {
    isLink: islink,
    caption: title,
  }
  return onelink;
}

export function titlePage1()  
{
  const links = [];
  const link1  = getLinkPage1(false);
  links.push(link1);
  return links;
} 

export function titlePage2(patientId)  
{
  const link1  = getLinkPage1(true);
  const link2  = getLinkPage2(false, patientId);
  return [link1, link2];
} 

export function titlePage3(patientId, roleId, surveyId)  
{
  const links = [];
  const link1  = getLinkPage1(true);
  links.push(link1);
  const link2  = getLinkPage2(true, patientId);
  links.push(link2);
  const link3  = getLinkPage3(false, roleId, surveyId);
  links.push(link3);
  return links;
} 

export function titlePage3a(patientId, roleId, surveyId, sectionId)  
{
  const links = [];
  const link1  = getLinkPage1(true);
  links.push(link1);
  const link2  = getLinkPage2(true, patientId);
  links.push(link2);
  const link3  = getLinkPage3(true, roleId, surveyId);
  links.push(link3);
  const link4  = getLinkPage4(false, sectionId);
  links.push(link4);
  return links;
} 

export function titlePage4(patientId, roleId, surveyId, sectionId)  
{
  const page3 = titlePage3(patientId, roleId, surveyId);
  const section = dataSections.filter(p => p.id === sectionId);
  const title = "section " + section[0].name;
  return page3 + " | " + title;
} 

export function dataPage1 () {

  let title = "Page1: Overview Patients";

  let data = [];
  for (let p = 0; p < dataPatients.length; p++)
  {
    const onerow = { 
      id: dataPatients[p].id, 
      lastname: dataPatients[p].lastname, 
      firstname: dataPatients[p].firstname, 
      age: dataPatients[p].age, 
      countsurveys: 0,
      status: null,
    };
    data.push(onerow);
  }

  for (let p = 0; p < data.length; p++)
  {
    // count surveys
    const ps = dataPatientSurveys.filter(q => q.idPatient === data[p].id);
    data[p].countsurveys = ps.length;

    // count answered questions
    let cntAnsw = 0;
    let totalAnsw = 0;
    for (let s = 0; s < ps.length; s++)
    {
      const ct = dataAnswers.filter(a => 
        a.idPatient === data[p].id && 
        a.idSurvey ===  ps[s].id).length;
      cntAnsw = cntAnsw + ct;

      const ctq = dataQuestions.filter(a => 
        a.idSurvey ===  ps[s].id).length;
      totalAnsw = totalAnsw + ctq;
    }

    /*
    if (totalAnsw === 0) 
    {
      data[p].status = StatusIcon0;
    }
    else if (cntAnsw < totalAnsw)
    {
      data[p].status = StatusIcon1;
    }
    else if (cntAnsw === totalAnsw)
    {
      data[p].status = StatusIcon2;
    }

    // fake
    if (p === 0) data[p].status = StatusIcon0;
    if (p === 1) data[p].status = StatusIcon2;
    if (p === 2) data[p].status = StatusIcon0;
    if (p === 3) data[p].status = StatusIcon1;
    if (p === 4) data[p].status = StatusIcon2;
    */

    if (totalAnsw === 0) 
      {
        data[p].status = statusIncomplete;
      }
      else if (cntAnsw < totalAnsw)
      {
        data[p].status = statusUnverified;
      }
      else if (cntAnsw === totalAnsw)
      {
        data[p].status = statusComplete;
      }
  
      // fake
      if (p === 0) data[p].status = statusIncomplete;
      if (p === 1) data[p].status = statusComplete;
      if (p === 2) data[p].status = statusIncomplete;
      if (p === 3) data[p].status = statusUnverified;
      if (p === 4) data[p].status = statusComplete;

  }

  return data;
}

export function dataPage2 (patientId)  {

  const tmpData = dataPatientSurveys.filter(d => d.idPatient === patientId);

  let data = [];
  for (let p = 0; p < tmpData.length; p++)
  {
    const oneRow = {
      id: tmpData[p].id,
      idPatient: tmpData[p].idPatient,
      idSurvey: tmpData[p].idSurvey,
      nameSurvey: "", 
    };
    data.push(oneRow);
  }
  
  for (let p = 0; p < data.length; p++)
  {
    const survIndex = dataSurveys.findIndex(s => s.id === data[p].idSurvey);
    const survName = dataSurveys[survIndex].name;
    data[p].nameSurvey = survName;
  
    for (let r = 0; r < dataRoles.length; r++)
    {
      let total = 0;
      let cntUnverified = 0;
      let cntComplete = 0;
      const dataSect = dataSections.filter(s => 
        s.idSurvey === data[p].id && 
        s.idRole ===  dataRoles[r].id);
  
      for (let s = 0; s < dataSect.length; s++)
      {
        // total question
        const qst = dataQuestions.filter(qs => 
          qs.idSection === dataSect[s].id);
        total = total + qst.length;
  
        for (let r = 0; r < qst.length; r++)
        {
          const ansUnv = dataAnswers.filter(q => 
            q.idQuestion === qst[r].id && 
            q.idPatient === patientId &&
            q.verified === false);
          cntUnverified = cntUnverified + ansUnv.length;
  
          const ansVer = dataAnswers.filter(q => 
            q.idQuestion === qst[r].id && 
            q.idPatient === patientId &&
            q.verified === true);
          cntComplete = cntComplete + ansVer.length;
        }        
      }
  
      const rolename = "idRole" + dataRoles[r].id;
      if (total === 0)
      {
        data[p][rolename] = "";
      }
      else if (total === cntComplete && cntUnverified === 0) 
      {
        data[p][rolename] = statusComplete;
      }
      else if (total === cntComplete && cntUnverified > 0)
      {
        data[p][rolename] = statusUnverified;
      }
      else if (total > cntComplete + cntUnverified)
      {
        data[p][rolename] = statusIncomplete;
      }
      else
      {
        data[p][rolename] = "";
      }
      
  
      // fakes:
      if (patientId === 1)
      {
        if (r == 0 && p == 2) data[p][rolename] = statusIncomplete;
        if (r == 0 && p == 3) data[p][rolename] = statusUnverified;
  
        if (r == 1 && p == 2) data[p][rolename] = statusUnverified;
        if (r == 1 && p == 3) data[p][rolename] = statusIncomplete;
  
        if (r == 2 && p == 1) data[p][rolename] = statusComplete;
        if (r == 2 && p == 2) data[p][rolename] = statusIncomplete;
        if (r == 2 && p == 3) data[p][rolename] = statusUnverified;
  
        if (r == 3 && p == 1) data[p][rolename] = statusComplete;
        if (r == 3 && p == 2) data[p][rolename] = statusUnverified;
        if (r == 3 && p == 3) data[p][rolename] = statusIncomplete;
  
      }
    }
  }
        
  return data;
} 


export function dataPage3 (patientId, roleId, surveyId)  
{
  const tmpData = dataSections.filter(s => s.idSurvey === surveyId);

  let data = [];
  for (let p = 0; p < tmpData.length; p++)
  {
    const oneRow = {
      id: tmpData[p].id,
      idPatient: patientId,
      idRole: roleId,
      idSurvey: tmpData[p].idSurvey,
      nameSection: tmpData[p].name,
      questionCount: 0,
    };
    data.push(oneRow);
  }
  
  let fieldCount = 0;
  for (let p = 0; p < data.length; p++)
  {
    const quest = dataQuestions.filter(q => q.idSection === data[p].id);
    if (fieldCount < quest.length) fieldCount = quest.length;
    data[p].questionCount = quest.length;
  }
  
  for (let p = 0; p < data.length; p++)
  {
    const quest = dataQuestions.filter(q => q.idSection === data[p].id);
    for (let q = 0; q < fieldCount; q++)
    {
      const questionIndex = "qIdx" + q;
      const questionId = "dataId" + q;
      if (q < quest.length)
      {
        const index = dataAnswers.findIndex(a => a.idQuestion === quest[q].id);
        // we need to store the id of the question
        data[p][questionId] = quest[q].id;
        // here we store the index of the question
        data[p][questionIndex] = 
          index === -1 ? statusIncomplete : 
          dataAnswers[index].verified === false ? statusUnverified : statusComplete;
      }
      else
      {
        data[p][questionIndex] = "";
        data[p][questionId] = -1;
      }
    }
  }
      
  return data;
} 

export function dataPage3a (patientId, roleId, surveyId, sectionId)  
{
  const tmpData = dataQuestions.filter(s => s.idSection === sectionId);

  let data = [];
  for (let p = 0; p < tmpData.length; p++)
  {
    const aIndex = dataAnswers.findIndex(a => 
      a.idQuestion === tmpData[p].id &&
      a.idPatient === patientId);
    const answer = aIndex === -1 ? null : dataAnswers[aIndex].value;

    const oneRow = {
      id: tmpData[p].id,
      done: aIndex === -1 ? statusIncomplete : statusComplete,
      question: tmpData[p].question,
      answer: answer,
      editType: tmpData[p].editType,
    };
    data.push(oneRow);
  }
      
  return data;
} 

export function dataPage4 (patientId, surveyId, roleId)  {

  let title = "Page4: ";
  const pat = dataPatients.filter(p => p.id === patientId);
  title = title + pat[0].lastname + " " + pat[0].firstname + ", ";
  const rol = dataRoles.filter(p => p.id === roleId);
  title = title + "role " + rol[0].name + ", ";
  const srv = dataSurveys.filter(p => p.id === surveyId);
  title = title + "survey " + srv[0].name;

  const tmpData = dataQuestions.filter(d => 
    d.idSurvey === surveyId &&
    d.idRole === roleId);

  let data = [];
  for (let p = 0; p < tmpData.length; p++)
  {
    // search answer
    const anw = dataAnswers.filter(a => 
      a.idQuestion === tmpData[p].id &&
      a.idPatient === patientId);

    const answerValue = anw.length === 0 ? "" : anw[0].value;

    const oneRow = {
      id: tmpData[p].id,
      idPatient: patientId,
      idSurvey: tmpData[p].idSurvey,
      question: tmpData[p].question,
      answer: answerValue,
    };
    data.push(oneRow);
  }
  
  return data;
} 

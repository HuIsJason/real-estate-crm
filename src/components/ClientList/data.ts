import {v4 as uuid} from 'uuid'

function createData(name: string, email: string, tags: string, id: string) {
    return {
      name,
      email,
      tags,
      id
    };
  }
  
const fullRows = [
    createData('George Smith', "GeorgeS@Outlook.com", "Active expensive", uuid()),
    createData('Johnny Smith', "JohnnyeS@Outlook.com", "Active expensive", uuid()),
    createData('Jill Smith', "JillS@Outlook.com", "Active expensive", uuid()),
    createData('Jenny Smith', "JennyS@Outlook.com", "Active expensive", uuid()),
  ];

export {createData};
export {fullRows};
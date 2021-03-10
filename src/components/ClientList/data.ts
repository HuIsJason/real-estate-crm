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
    createData('George Smith', "GeorgeS@Outlook.com", "Active, expensive", uuid()),
    createData('Johnny Smith', "JohnnyeS@Outlook.com", "Active, Highrise", uuid()),
    createData('Jill Smith', "JillS@Outlook.com", "Active, Big Family", uuid()),
    createData('Jenny Smith', "JennyS@Outlook.com", "Active, Single", uuid()),
    createData('Joey Smith', "JoeyS@Outlook.com", "Active, Older", uuid()),
    createData('Julia Smith', "JoeyS@Outlook.com", "Active, Student", uuid()),
    createData('Jelly Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('Jeremy Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('Jolly Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('June Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('Jhala Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('Joony Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
    createData('Jonathon Smith', "JoeyS@Outlook.com", "Active, expensive", uuid()),
  ];

export {createData};
export {fullRows};
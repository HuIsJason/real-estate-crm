function createData(name: string, email: string, tags: string[]) {
    return {
      name,
      email,
      tags
    };
  }
  
const fullRows = [
    createData('George Smith', "GeorgeS@Outlook.com", ["Active", "expensive"]),
    createData('Johnny Smith', "JohnnyeS@Outlook.com", ["Active", "expensive"]),
    createData('Jill Smith', "JillS@Outlook.com", ["Active", "expensive"]),
    createData('Jenny Smith', "JennyS@Outlook.com", ["Active", "expensive"]),
    createData('Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('2Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('3Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('4Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('5Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('6Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('7Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('8Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('9Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('0Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('11Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('12Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('13Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('14Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
    createData('15Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  ];

export {createData};
export {fullRows};
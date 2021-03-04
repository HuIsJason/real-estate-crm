import React, { useState } from 'react';
import AccountListTable from '../../../components/AccountListTable/index';
import SearchBar from '../../../components/SearchBar/index';
import { Account, AccountSummary } from '../../../components/AccountListTable/types';
import AccountDetail from "../../../components/AccountDetail/index";

const accounts : Account[] = [

    { email: "joe@gmail.com",
      firstName: "joe",
      lastName: "brown",
      licenseId: "H123456",
      phone: "647-123-4567",
      brokerage: "Royal LePage",
      brokerageAddress: "123 Sesame St",
      brokeragePhone: "905-798-1000"
    },
    { email: "maryg@gmail.com",
      firstName: "Mary",
      lastName: "Green",
      licenseId: "H898009",
      phone: "905-888-9999",
      brokerage: "Homelife Miracle",
      brokerageAddress: "88 Pacific Ave",
      brokeragePhone: "905-798-2222"
    }
]

const accountSummaries: AccountSummary[] = [
    { 
        accountEmail: 'joe@gmail.com',
        lastLogin: '2021-01-22', 
    },
    { 
        accountEmail: 'maryg@gmail.com',
        lastLogin: '2021-02-22', 
    }
]

const  AccountManagerView: React.FC = () => {

    const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
    const [openDetails, toggleOpenDetails]=  useState(false);
    const [accountsList, setAccountsList] = useState(accountSummaries);

    const openAccountDetails = (accountEmail: string) => {
        const account = accounts.filter(account => account.email === accountEmail)[0];
        setSelectedAccount(account); 
        toggleOpenDetails(true);
    }

    const deleteAccount = (accountEmail: string) => {
        const newAccountsList = accountsList.filter(account => account.accountEmail !== accountEmail);
        setAccountsList(newAccountsList);
        toggleOpenDetails(false);
    }


    return (
        <div>
            <h1 style={{ margin: 10}}>Account Manager</h1>
            {openDetails ?
            ( <AccountDetail account={selectedAccount} hideDetails={() => toggleOpenDetails(false)} 
            deleteAccount={deleteAccount}/> )
            :
            (<div> 
                <SearchBar />
                <AccountListTable accountSummaries={accountsList} onSelectRow={openAccountDetails}/>
            </div>)
            }
        </div>

    )

}


export default AccountManagerView;


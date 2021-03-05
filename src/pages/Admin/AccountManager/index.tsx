import React, { useState } from 'react';
import AccountListTable from '../../../components/AccountListTable/index';
import SearchBar from '../../../components/SearchBar/index';
import { AgentAccount, ClientAccount, AccountSummary } from '../../../components/AccountListTable/types';
import AgentAccountDetail from "../../../components/AccountDetail/agent";
import ClientAccountDetail from "../../../components/AccountDetail/client";

import AccountSelector from '../../../components/AccountSelector/index';


const accountSummaries: AccountSummary[] = [
    { 
        accountEmail: 'joe@gmail.com',
        lastLogin: '2021-01-22', 
        accountType: 'agent'
    },
    { 
        accountEmail: 'maryg@gmail.com',
        lastLogin: '2021-02-22', 
        accountType: 'agent'
    },
    {
        accountEmail: 'jenny@hotmail.com',
        lastLogin: '2021-02-28',
        accountType: 'client'
    }
]

const  AccountManagerView: React.FC = () => {

    const [selectedAccount, setSelectedAccount] = useState('');
    const [accountType, setAccountType] = useState('agent');
    const [openDetails, toggleOpenDetails]=  useState(false);
    const [accountsList, setAccountsList] = useState(accountSummaries.filter(account => account.accountType === 'agent'));

    const openAccountDetails = (accountEmail: string) => {
        setSelectedAccount(accountEmail); 
        toggleOpenDetails(true);
    }

    const deleteAccount = (accountEmail: string) => {
        const newAccountsList = accountsList.filter(account => account.accountEmail !== accountEmail);
        setAccountsList(newAccountsList);
        toggleOpenDetails(false);
    }

    const filterByType = (type: string) => {
        setAccountType(type);
        const newAccountsList = accountSummaries.filter(account => account.accountType === type);
        setAccountsList(newAccountsList);
    }


    return (
        <div>
            <h1 style={{ margin: 10}}>Account Manager</h1>
            { openDetails ?
            ( accountType === 'agent' ? <AgentAccountDetail accountEmail={selectedAccount} hideDetails={() => toggleOpenDetails(false)} 
            deleteAccount={deleteAccount}/> : <ClientAccountDetail accountEmail={selectedAccount} hideDetails={() => toggleOpenDetails(false)} deleteAccount={deleteAccount} />)
            :
            (<div> 
                <SearchBar />
                <AccountSelector selection={accountType} setSelection={filterByType}/>
                <AccountListTable accountSummaries={accountsList} onSelectRow={openAccountDetails}/>
            </div>)
            }
        </div>

    )

}


export default AccountManagerView;


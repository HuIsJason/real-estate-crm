import React, { useState } from 'react';
import AccountListTable from '../../../components/AccountListTable/index';
import SearchBar from '../../../components/SearchBar/index';
import { AccountSummary } from '../../../components/AccountListTable/types';
import AgentAccountDetail from "../../../components/AccountDetail/agent";
import ClientAccountDetail from "../../../components/AccountDetail/client";
import AccountSelector from '../../../components/AccountSelector/index';
import AppBar from "../../../components/AppBar";


import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';


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
    },
    {
        accountEmail: 'harrym@gmail.com',
        lastLogin: '2021-02-28',
        accountType: 'agent'
    },
    {
        accountEmail: 'georgeli@gmail.com',
        lastLogin: '2021-02-28',
        accountType: 'agent'
    },
    {
        accountEmail: 'james@gmail.com',
        lastLogin: '2021-02-28',
        accountType: 'agent'
    },
    {
        accountEmail: 'miranda@gmail.com',
        lastLogin: '2021-02-28',
        accountType: 'agent'
    },
    {
        accountEmail: 'taylor.white@gmail.com',
        lastLogin: '2021-02-28',
        accountType: 'agent'
    },
]

const  AccountManagerView: React.FC = () => {

    const classes = useStyles();

    const [selectedAccount, setSelectedAccount] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [accountType, setAccountType] = useState('agent');
    const [openDetails, toggleOpenDetails]=  useState(false);
    const [displayPage, setDisplayPage] = useState(1);

    // Need to get list of summaries of all active accounts from the server
    const [activeAccounts, setActiveAccounts] = useState<AccountSummary[]>(accountSummaries);
    const [displayAccounts, setDisplayAccounts] = useState(activeAccounts.filter(account => account.accountType === accountType));
    

    const openAccountDetails = (accountEmail: string) => {
        setSelectedAccount(accountEmail); 
        setSearchValue('');
        toggleOpenDetails(true);
        setDisplayPage(1);
    }

    const deleteAccount = (accountEmail: string) => {
        // TODO: Send request to server to delete account associated with accountEmail
        const newAccountsList = activeAccounts.filter(account => account.accountEmail !== accountEmail);
        setActiveAccounts(newAccountsList);

        const newDisplay = activeAccounts.filter(account => account.accountEmail !== accountEmail && account.accountType === accountType);
        setDisplayAccounts(newDisplay);
        toggleOpenDetails(false);
    }

    const filterByType = (type: string) => {
        setAccountType(type);
        const newAccountsList = activeAccounts.filter(account => account.accountType === type);
        setDisplayAccounts(newAccountsList);
        setSearchValue('');
        setDisplayPage(1);
    }

    const searchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        const newAccountsList = activeAccounts.filter(account => account.accountEmail.includes(event.target.value) && account.accountType === accountType);
        setDisplayAccounts(newAccountsList);
        setDisplayPage(1);
    }


    return (
        <div>
            <AppBar showDashboardbtn/>
            <div className={classes.root} > 
                <div> <Typography variant="h6" gutterBottom color='primary'> Account Manager </Typography> </div>
                { openDetails ?
                ( accountType === 'agent' ? <AgentAccountDetail accountEmail={selectedAccount} hideDetails={() => toggleOpenDetails(false)} 
                deleteAccount={deleteAccount}/> : <ClientAccountDetail accountEmail={selectedAccount} hideDetails={() => toggleOpenDetails(false)} deleteAccount={deleteAccount} />)
                :
                (<div> 
                    <SearchBar onChange={searchFilter} value={searchValue}/>
                    <AccountSelector selection={accountType} setSelection={filterByType}/>
                    <AccountListTable displayPage={displayPage} accountSummaries={displayAccounts} 
                        onSelectRow={openAccountDetails}
                        onClickNext={() => setDisplayPage(displayPage + 1)}
                        onClickPrev={() => setDisplayPage(displayPage - 1)}
                        />
                </div>) }

            </div>
        </div>

    )

}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      margin: theme.spacing(5),
    },
  }));


export default AccountManagerView;


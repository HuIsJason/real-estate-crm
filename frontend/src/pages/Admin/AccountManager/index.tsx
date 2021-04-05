import React, { useEffect, useState } from 'react';
import AccountListTable from '../../../components/AccountListTable/index';
import SearchBar from '../../../components/SearchBar/index';
import AgentAccountDetail from "../../../components/AccountDetail/agent";
import ClientAccountDetail from "../../../components/AccountDetail/client";
import AccountSelector from '../../../components/AccountSelector/index';
import AppBar from "../../../components/AppBar";

import { Agent } from "../../../utils/types";

import send from "../../../requests/request";


import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';


const accountSummaries = [
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

const agentAccounts: Agent[] = [];

const  AccountManagerView: React.FC = () => {

    const classes = useStyles();

    const [selectedAccount, setSelectedAccount] = useState(agentAccounts[0]);
    const [searchValue, setSearchValue] = useState('');
    const [accountType, setAccountType] = useState('agent');
    const [openDetails, toggleOpenDetails]=  useState(false);
    const [displayPage, setDisplayPage] = useState(1);

    // Need to get list of summaries of all active accounts from the server
    const [activeAccounts, setActiveAccounts] = useState<Agent[]>(agentAccounts);
    const [displayAccounts, setDisplayAccounts] = useState(activeAccounts.filter(account => account.accountType === accountType));
    
    useEffect(() => {
        send("getAllAgents")
        .then(response => response.json())
        .then(data => {
            setActiveAccounts(data.agents);
            setDisplayAccounts(data.agents);
        })
    }, []);
    
    const openAccountDetails = (username: string) => {
        setSelectedAccount(activeAccounts.filter(account => account.username === username)[0]); 
        setSearchValue('');
        toggleOpenDetails(true);
        setDisplayPage(1);
    }

    const deleteAccount = (username: string) => {
        // TODO: Send request to server to delete account associated with accountEmail
        send("deleteAgent", {}, `/${username}`)
        .then(response => {
            if (response.status === 204) {
                const newAccountsList = activeAccounts.filter(account => account.username !== username);
                setActiveAccounts(newAccountsList);

                const newDisplay = newAccountsList.filter(account => account.username !== username && account.accountType === accountType);
                setDisplayAccounts(newDisplay);
            }
        });
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
        const newAccountsList = activeAccounts.filter(account => account.username.includes(event.target.value) && account.accountType === accountType);
        setDisplayAccounts(newAccountsList);
        setDisplayPage(1);
    }


    return (
        <div>
            <AppBar showDashboardbtn/>
            <div className={classes.root} > 
                <div> <Typography variant="h6" gutterBottom color='primary'> Account Manager </Typography> </div>
                { openDetails ?
                ( accountType === 'agent' ? <AgentAccountDetail account={selectedAccount} username={selectedAccount.username} hideDetails={() => toggleOpenDetails(false)} 
                deleteAccount={deleteAccount}/> : <ClientAccountDetail account={selectedAccount} username={selectedAccount.username} hideDetails={() => toggleOpenDetails(false)} deleteAccount={deleteAccount} />)
                :
                (<div> 
                    <SearchBar onChange={searchFilter} value={searchValue}/>
                    <AccountSelector selection={accountType} setSelection={filterByType}/>
                    <AccountListTable displayPage={displayPage} accounts={displayAccounts} 
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


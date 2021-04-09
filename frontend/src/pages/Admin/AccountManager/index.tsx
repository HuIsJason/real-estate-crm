import React, { useEffect, useState } from 'react';
import AccountListTable from '../../../components/AccountListTable/index';
import SearchBar from '../../../components/SearchBar/index';
import AgentAccountDetail from "../../../components/AccountDetail/agent";
import AppBar from "../../../components/AppBar";

import { Agent } from "../../../utils/types";

import send from "../../../requests/request";

import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';

const agentAccounts: Agent[] = [];

const AccountManagerView: React.FC = () => {

    const classes = useStyles();

    const [selectedAccount, setSelectedAccount] = useState(agentAccounts[0]);
    const [searchValue, setSearchValue] = useState('');
    const [accountType, setAccountType] = useState('agent');
    const [openDetails, toggleOpenDetails]=  useState(false);
    const [displayPage, setDisplayPage] = useState(1);

    const [activeAccounts, setActiveAccounts] = useState<Agent[]>(agentAccounts);
    const [displayAccounts, setDisplayAccounts] = useState(activeAccounts.filter(account => account.accountType === accountType));
    
    useEffect(() => {
        send("getActivatedAgents")
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
        // Send request to server to delete account associated with accountEmail
        send("deleteAgent", {}, `/${username}`)
        .then(response => {
            if (response.status === 204) {
                const newAccountsList = activeAccounts.filter(account => account.username !== username);
                setActiveAccounts(newAccountsList);

                const newDisplay = newAccountsList.filter(account => account.username !== username && account.accountType === accountType);
                setDisplayAccounts(newDisplay);
            } else {
                throw `Could not delete... Error ${response.status}`;
            }
        })
        .catch(err => {
            console.log(err);
            alert("Account acould not be deleted at this time... please try again later.");
        });
        toggleOpenDetails(false);
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
                (<AgentAccountDetail account={selectedAccount} username={selectedAccount.username} hideDetails={() => toggleOpenDetails(false)} 
                deleteAccount={deleteAccount}/>)
                :
                (<div> 
                    <SearchBar onChange={searchFilter} value={searchValue}/>
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


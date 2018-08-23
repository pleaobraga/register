import React from 'react';
import AccountForm from '../../components/AccountForm/AccountForm'
import ErrorModal from '../../components/Modal/ErrorModal/ErrorModal'
import './style/index.scss'

const CreateAccount = () => {
    return (
      <div className='create-account' >
        <AccountForm />
        <ErrorModal />
      </div>
    )
}

export default CreateAccount;

import React from 'react';
import AccountForm from '../../components/AccountForm/AccountForm'
import ErrorModal from '../../components/Modal/ErrorModal/ErrorModal'
import SuccessModal from '../../components/Modal/SuccessModal/SuccessModal'

import './style/index.scss'

const CreateAccount = () => {
    return (
      <div className='create-account' >
        <AccountForm />
        <ErrorModal />
        <SuccessModal />
      </div>
    )
}

export default CreateAccount;

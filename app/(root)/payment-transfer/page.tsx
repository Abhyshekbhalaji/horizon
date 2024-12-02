import HeaderBox from '@/app/components/HeaderBox'
import PaymentTransferForm from '@/app/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const PaymentTransfer = async() => {
  const loggedIn = await getLoggedInUser(); // this is working fine
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  return (
    <section className='payment-transfer'>
      <HeaderBox
      title='Payment Transfer'
      subtext='Please provide any specific details or notes related to payment transfer'
      />

      <section className='size-full pt-5'>
        <PaymentTransferForm 
        accounts={accountsData}
        />
      </section>
    </section>
  )
}

export default PaymentTransfer
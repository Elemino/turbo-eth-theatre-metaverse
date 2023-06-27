'use client'

import { WalletAddress, WalletBalance, WalletEnsName } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { useState } from "react";
import { useAppDispatch } from "./store/redux-hooks/hooks";


export default function PageDashboard() {

  const [status, setStatus] = useState("Added");
  const showUsers = true;
  const dispatch = useAppDispatch();


  return (
    <>

<h3 className="px-4 py-2 text-grey rounded-3xl font-bold border-none">Search users</h3>
        {showUsers ? (
          <>
            <input 
              type="text" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"
              onChange={(e) => {
                console.log(e.target.value);
                setStatus(e.target.value);
              }}
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <BranchIsWalletConnected>
          <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
            <div className="text-center">
              <h3 className="font-primary text-2xl font-bold lg:text-6xl">
                <span className="text-gradient-secondary">
                  hi 👋 <WalletEnsName />
                </span>
              </h3>
              <span className="font-light">
                <WalletAddress className="mt-5 block text-xl font-light" />
                <div className="mt-4">
                  <span className="font-primary text-3xl font-light">
                    Balance: <WalletBalance decimals={7} className="" /> ETH
                  </span>
                </div>
              </span>
            </div>
          </div>
          <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
        </BranchIsWalletConnected>
      </motion.div>
    </>
  )
}

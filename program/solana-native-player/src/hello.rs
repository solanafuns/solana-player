use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    msg,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MathStuffSum {
    pub sum: u32,
}

pub fn process_instruction(accounts: &[AccountInfo], program_id: &Pubkey) {
    msg!("================= debug account as counter  ================= ");
    let mut account_iter = accounts.into_iter();
    let account = next_account_info(&mut account_iter).unwrap();

    assert!(account.owner == program_id);
    msg!("Debug output:");
    msg!("Account ID: {}", account.key);
    msg!("Executable?: {}", account.executable);
    msg!("Lamports: {:#?}", account.lamports);

    let mut math_stuff = MathStuffSum::try_from_slice(&account.data.borrow()).unwrap();

    msg!("current sum: {}", math_stuff.sum);

    math_stuff.sum += 1;
    math_stuff
        .serialize(&mut &mut account.data.borrow_mut()[..])
        .unwrap();
    msg!("Debug output complete.");
}

use std::io::Write;

use solana_program::{
    account_info::AccountInfo,
    msg,
    program::invoke_signed,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

pub fn process_instruction(accounts: &[AccountInfo], program_id: &Pubkey) {
    if accounts.len() > 0 {
        msg!("================= debug account output ================= ");
        for account in accounts {
            msg!("account : {:?}", account);
            msg!("account key : {:?}", account.key);
        }
        msg!("================= end account debug ================= ");

        let mut account_iter = accounts.into_iter();

        let signer = account_iter.next().unwrap();
        assert!(signer.is_signer);
        msg!("siner key : {}", signer.key);

        let pda_account = account_iter.next().unwrap();
        assert!(pda_account.is_writable);
        msg!("pda_account : {}", pda_account.key);

        let system_program = account_iter.next().unwrap();

        msg!("checking pda account address : ");

        let (pda, bump_seed) =
            Pubkey::find_program_address(&[signer.key.as_ref(), "pda-usage".as_ref()], program_id);

        assert!(pda_account.key == &pda);
        msg!("{},{}", pda, bump_seed);

        let rent = Rent::get().unwrap();
        let rent_lamports = rent.minimum_balance(1024);

        match invoke_signed(
            &system_instruction::create_account(
                signer.key,
                pda_account.key,
                rent_lamports,
                1024,
                program_id,
            ),
            &[signer.clone(), pda_account.clone(), system_program.clone()],
            &[&[signer.key.as_ref(), "pda-usage".as_ref(), &[bump_seed]]],
        ) {
            Err(err) => {
                msg!("error : {}", err)
            }
            Ok(()) => {
                msg!("invoke success");
                msg!("PDA created: {}", pda);
            }
        }
    }
}

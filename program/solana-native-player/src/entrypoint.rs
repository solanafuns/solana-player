use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

use crate::hello;

// declare and export the program's entrypoint
entrypoint!(process_instruction);

// program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // log a message to the blockchain
    msg!("Hello solana world!");
    msg!("program id: {:?}", program_id);
    msg!("account : {:?}", accounts);
    msg!(
        "data received : {}",
        String::from_utf8(instruction_data.to_vec()).unwrap()
    );

    // hello::process_instruction(accounts, program_id)
    Ok(())
}

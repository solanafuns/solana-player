use solana_program::account_info::AccountInfo;

use {
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::pubkey::Pubkey,
    solana_sdk::{signature::Signer, signer::keypair::Keypair, transaction::Transaction},
    std::str::FromStr,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MathStuffSum {
    pub sum: u32,
    pub owner: Pubkey,
}

// ┌─────────────┬────────────────────────────────────────────────┐
// │   (index)   │                     Values                     │
// ├─────────────┼────────────────────────────────────────────────┤
// │  seed_msg   │                 'hello world'                  │
// │  seed_key:  │ 'EU5Zf4e6XqNa2D9RPwHFaJTJNdgnvXTsaCQLJgF19QXv' │
// │   program   │ 'EU5Zf4e6XqNa2D9RPwHFaJTJNdgnvXTsaCQLJgF19QXv' │
// │ pda address │ '4ckbLpAkpFQKhwJTUqemC64fpoYsC63zLLxeg5cRKNes' │
// │  bump_seed  │                      255                       │
// └─────────────┴────────────────────────────────────────────────┘

fn main() {
    let pk = Pubkey::from_str("EU5Zf4e6XqNa2D9RPwHFaJTJNdgnvXTsaCQLJgF19QXv").unwrap();
    println!("client address : {}", pk.to_string());

    const SEED_STR: &str = "hello world";

    // println!("SEED KEY : {}", payer.pubkey().to_string());
    // println!("SEED_STR : {}", SEED_STR);

    let (pda, bump) = Pubkey::find_program_address(&[&pk.to_bytes(), SEED_STR.as_bytes()], &pk);
    println!("pda address : {} , bump_seed : {}", pda.to_string(), bump);
}

use {
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::pubkey::Pubkey,
    std::str::FromStr,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MathStuffSum {
    pub sum: u32,
    pub owner: Pubkey,
}

fn main() {
    let owner = Pubkey::from_str("11111111111111111111111111111111").unwrap();
    let s = MathStuffSum { sum: 0, owner };
    // let mut math_stuff = MathStuffSum::try_from_slice(&[0, 0, 0, 0]).unwrap();
    let payload = s.try_to_vec().unwrap();
    println!("vector : {:?}", payload);

    let a = Pubkey::find_program_address(&["hello".as_bytes()], &owner);
    println!("pda : {:?}", a);

    println!("hello world ???");
}

import bcrypt from 'bcrypt';

export async function getHashSenha(senha:string) {
    let rounds:number = parseInt(process.env.BCRYPT_ROUNDS);
    let salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(senha, salt);
}

export async function validarHashSenha(senha:string, hash:string) {
    return await bcrypt.compare(senha, hash);
}

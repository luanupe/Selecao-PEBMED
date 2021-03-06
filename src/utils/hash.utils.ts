import bcrypt from 'bcrypt';

export async function getHashSenha(senha:string) {
    const rounds:number = parseInt(process.env.BCRYPT_ROUNDS);
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(senha, salt);
}

export async function validarHashSenha(senha:string, hash:string) {
    return await bcrypt.compare(senha, hash);
}

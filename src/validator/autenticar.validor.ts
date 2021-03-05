import { body } from "express-validator";

/*
    [OK] Validar se é email
    [OK] Validar tamanho do email
*/
/*
    [OK] Validar tamanho mínimo da senha (6 caracteres)
*/

export const validacaoLogin:any[] = [
    // Validar campo de email
    body('email')
        .isEmail().withMessage('O email informado não é válido')
        .isLength({ max:255 }).withMessage('O email informado é muito grande.'),
    
    // Validar campo de senha
    body('senha')
        .isLength({ min:6 }).withMessage('A senha necessitar ter no mínimo 6 caracteres')
];

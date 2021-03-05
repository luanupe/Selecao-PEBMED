import { body } from "express-validator";
import { getRepository, Repository } from "typeorm";

import {Sexo} from "../utils/sexo.utils";

import { Paciente } from "../database/entity/Paciente";

// Créditos do REGEX: https://pt.stackoverflow.com/users/129/sergio
const REGEX_NOME = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;

// Créditos do REGEX: https://pt.stackoverflow.com/users/132/victor-stafusa
const REGEX_TELEFONE = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

/*
    [OK] Validar nome apenas letras e espaços
    [OK] Validar tamanho do nome (255 caracteres)
*/
/* 
    [OK] Validar se é um email
    [OK] Validar o tamanho do email (255 caracteres)
    [OK] Validar se o email já está em uso por terceiros
*/
/*
    [OK] Validar se nascimento é uma data válida
*/
/*
    [OK] Validar se sexo está dentro dos valores do ENUM
*/
/*
    [OK] Validar se peso é float
*/
/*
    [OK] Validar se altura é float
*/
/*
   [OK]  Validar se telefone possui um formato válido
*/

export const validacaoPaciente:any[] = [
    // Validar nome
    body('nome')
        .custom((value) => { return value.match(REGEX_NOME); }).withMessage('Nome deve conter apenas letras e espaços')
        .isLength({ max:255 }).withMessage('Seu nome ultrapassa 255 caracteres, por favor, utilizar abreviações'),

    // Validar Email
    body('email')
        .isEmail().withMessage('O email informado não é válido')
        .isLength({ max:255 }).withMessage('O email informado é muito grande')
        .custom(async (value) => {
    
            let repositorio:Repository<Paciente> = getRepository(Paciente);
            let paciente = await repositorio.findOne({ where: { email:value } });
            if ((paciente != null)) return Promise.reject("O email informado já está em uso por outro paciente");
    
        }),

    // Validar nascimento
    body('nascimento')
        .isDate().withMessage('A data de nascimento informada é inválida'),

    // Validar sexo
    body('sexo')
        .isIn(Object.values( Sexo )).withMessage('O sexo informado não está de acordo com as opções válidas'),

    // Validar peso
    body('peso')
        .isFloat().withMessage('O peso informado deve ser um número'),

    // Validar altura
    body('altura')
        .isFloat().withMessage('A altura informada deve ser um número'),
    
    // Validar nome
    body('telefone')
        .custom((value) => { return value.match(REGEX_TELEFONE); }).withMessage('O telefone informado está em um formato inválido.')
];

import styled from "styled-components"
import SelectContainer from "../form/SelectContainer"
import InputContainer from "./InputContainer"
import { useState } from "react"
import ButtonContainer from "../utils/ButtonContainer"

const MainContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    height: 700px;
`

const FormCard = styled.div`

    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px; 

    height: 650px;
    width: 600PX;
`

function FormContainer({onClick}){

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [tipo, setTipo] = useState('Individual')
    const [empresa, setEmpresa] = useState('Veloo')

    
    const options = [
        { value: 'Individual', label: 'Individual'},
        { value: 'Empresarial', label: 'Empresarial'}
    ]

    const Empresas = [
        { value: 'Veloo', label: 'Veloo'},
        { value: 'Itelx', label: 'Itelx'},
        { value: 'MaisTV', label: 'MaisTV'},
        { value: 'Sitramico', label: 'Sitramico'},
        { value: 'Colégio Santa Úrsula', label: 'Colégio Santa Úrsula'},
        
    ]

    const retornarDadosDoFormulario = () => {
        const formData = {
            nome,
            cpf,
            email,
            telefone,
            tipo,
            empresa,
        }

        onClick(formData)
    }

    return(
        <MainContainer>
            <FormCard>
                <InputContainer
                label="Nome"
                value={nome}
                onChange={(event) => (setNome(event.target.value))}
                />

                <InputContainer
                label="CPF"
                value={cpf}
                placeholder="000.000.000-00"
                onChange={(event) => (setCpf(event.target.value))}
                />

                <InputContainer
                value={telefone}
                label="Telefone"
                placeholder="(00) 00000-0000"
                onChange={(event) => (setTelefone(event.target.value))}
                />

                <InputContainer
                label="Email"
                value={email}
                onChange={(event) => (setEmail(event.target.value))}
                />

                <SelectContainer
                label='Tipo'
                value={tipo}
                options={options}
                onChange={(event) => (setTipo(event.target.value))}
                />

                {tipo === 'Empresarial' && 
                <SelectContainer 
                label='Convênio'
                value={empresa}
                options={Empresas}
                onChange={(event) => (setEmpresa(event.target.value))}
                />}

                <ButtonContainer
                title="Gerar"
                onClick={retornarDadosDoFormulario}/>
                
            </FormCard>
        </MainContainer>
    )
}

export default FormContainer
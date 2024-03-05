import styled from "styled-components"
import InputContainer from "./InputContainer"
import { useState } from "react"
import SelectContainer from "./SelectContainer"
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
    /* border: solid 0.1px #000;*/
    border-radius: 8px; 

    height: 600px;
    width: 600PX;
`

function FormContainer({onClick}){

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    // const [tipo, setTipo] = useState('')

    
    // const options = [
    //     {value: 'Individual', label: 'Individual'},
    //     {value: 'Empresarial', label: 'Empresarial'}
    // ]

    const retornarDadosDoFormulario = () => {
        const formData = {
            nome,
            cpf,
            email,
            telefone,
        }

        onClick(formData)
    }

    return(
        <MainContainer>
            <FormCard>
                <InputContainer
                label="Nome"
                value={nome}
                onChange={(event) => (setNome(event.target.value))}/>
                <InputContainer
                label="CPF"
                value={cpf}
                placeholder="000.000.000-00"
                onChange={(event) => (setCpf(event.target.value))}/>
                <InputContainer
                value={telefone}
                label="Telefone"
                placeholder="(00) 00000-0000"
                onChange={(event) => (setTelefone(event.target.value))}/>
                <InputContainer
                label="Email"
                value={email}
                onChange={(event) => (setEmail(event.target.value))}
                />

                <ButtonContainer
                title="Gerar"
                onClick={retornarDadosDoFormulario}/>
                {/* <SelectContainer
                label='Tipo'
                value={tipo}
                options={options}
                onChange={(event) => (setTipo(event.target.value))}/> */}
            </FormCard>
        </MainContainer>
    )
}

export default FormContainer
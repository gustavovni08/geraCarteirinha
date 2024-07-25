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
    height: 100%;
    padding:30px;
`

const FormCard = styled.div`

    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px; 

    height: 100%;
    width: 600px;

    padding-top:40px
`

function FormContainer({onClick}){

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [tipo, setTipo] = useState('Individual')
    const [empresa, setEmpresa] = useState('SELECIONE')
    const [qtdDepedentes, setQtdDepedentes] = useState('SELECIONE')
    const [listaDepedentes, setListaDepedentes] = useState([])

    
    const options = [
        { value: 'Individual', label: 'Individual'},
        { value: 'Familiar', label: 'Familiar'},
        { value: 'Empresarial', label: 'Empresarial'},
    ]

    const Empresas = [
        { value: 'SELECIONE', label:'SELECIONE'},
        { value: 'Veloo', label: 'Veloo'},
        { value: 'Itelx', label: 'Itelx'},
        { value: 'MaisTV', label: 'MaisTV'},
        { value: 'Sitramico', label: 'Sitramico'},
        { value: 'Colégio Santa Úrsula', label: 'Colégio Santa Úrsula'},
        { value: 'Sindhal', label: 'Sindhal'},
        { value: 'Alparque', label:'Alparque'},
        { value: 'UPM', label:'UPM'},
        { value: 'Sindprev', label:'Sindprev'},
        { value: 'Assomal', label:'Assomal'},
        { value: 'Bali', label:'Bali'},
        { value: 'OdontoShopping', label:'OdontoShopping'}
        ,
        
    ]

    const multiplier = [
        {value: 0, label: 'SELECIONE'},
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
        {value: 5, label: '5'}
    ]

    const adicionarCampoDepedentes = (value) => {
        setQtdDepedentes(value)
        console.log(value)

        const novosDepdentes = []


        for (let i = 0; i < parseInt(value); i++) {

            

            novosDepdentes.push(
                { id: i * 2 + 1, label:`${i+1}º Nome`, value:''},
                { id: i *2 + 2, label:`${i+1}º Cpf`, value:''},
             )
        }

        setListaDepedentes(novosDepdentes)
        console.log(listaDepedentes)
    }

    const changeDepedenteValue = (event, id) => {
        const updatedDependentes = listaDepedentes.map((item) =>
          item.id === id ? { ...item, value: event.target.value } : item
        );
    
        setListaDepedentes(updatedDependentes);
      };

    const retornarDadosDoFormulario = () => {


        const formData = {
            nome,
            cpf,
            email,
            telefone,
            tipo,
            empresa,
            listaDepedentes
        }
        // console.log(formData)
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

                {tipo ==='Familiar' && (
                    <>
                    <SelectContainer 
                    label='Convênio'
                    value={empresa}
                    options={Empresas}
                    onChange={(event) => (setEmpresa(event.target.value))}/>

                    <SelectContainer
                    label='N° Depedentes'
                    value={qtdDepedentes}
                    options={multiplier}
                    onChange={(event) => (adicionarCampoDepedentes(event.target.value))}
                    />

                    {listaDepedentes.map((item, index) => {
                        return(
                            <InputContainer
                            key={index}
                            label={item.label}
                            value={item.value}
                            onChange={(event) => changeDepedenteValue(event, item.id)}
                            />
                        )

                    })}
                    
                    </>

                )


  
                }

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
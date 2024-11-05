import styled from "styled-components"
import SelectContainer from "./SelectContainer"
import InputContainer from "./InputContainer"
import { useState, useEffect } from "react"
import ButtonContainer from "../utils/ButtonContainer"
import api from "../../services/api"
import axios from "axios"

const MainContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    height: 100%;
    padding:30px;
`

const FormCard = styled.div `

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
    const [empresas, setEmpresas] = useState([])
    const [qtdDepedentes, setQtdDepedentes] = useState('SELECIONE')
    const [listaDepedentes, setListaDepedentes] = useState([])
    const [dataNascimento, setDataNascimento] = useState()
    const [vendedor, setVendedor] = useState('Júlio')
    const [formaPagamento, setFormaPagamento] = useState('BOLETO')
    const [vencimento, setVencimento] = useState('5')
    const [link, setLink] = useState('')
    
    const options = [
        { value: 'Individual', label: 'Individual'},
        { value: 'Familiar', label: 'Familiar'},
        { value: 'Empresarial', label: 'Empresarial'},
    ]

    const formasPagamento = [
        { value: 'Boleto', label: 'Boleto'},
        { value: 'Cartão', label: 'Cartão'},
    ]

    const vencimentos = [
        { value: '5', label: '5'},
        { value: '10', label: '10'},
        { value: '15', label: '15'},
        { value: '20', label: '20'},
        { value: '25', label: '25'},
        { value: '30', label: '30'},
    ]

    const vendedores = [
        { value: 'Júlio', label: 'Júlio'},
        { value: 'Daniel', label: 'Daniel'},
        { value: 'Andréia', label: 'Andréria'},
        { value: 'Ana', label: 'Ana'},
        { value: 'Janaína', label: 'Janaína'},
        { value: 'Patrícia', label: ' Patrícia'},
        { value: 'Diego', label: 'Diego'},
        { value: 'Deya', label: 'Deya'},
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

    const retornarDadosDoFormulario = async () => {

        if(!nome || !email || !cpf || !telefone || !dataNascimento){
            window.alert('Preencha todos os campos')
            return
        }
        const formData = {
            nome,
            email,
            senha: cpf,
            cpf,
            cep: null,
            cidade: null,
            bairro: null,
            logadouro: null,
            numero_logadouro: null,
            data_nascimento: dataNascimento,
            status: 1,
            plano: tipo,
            telefone,
            convenio: empresa || '',
            vendedor,
            forma_pagamento: formaPagamento,
            vencimento,
            link
        }
        console.log(formData)
        try{
            await api.post('/adicionarAssociado', formData)
        }catch(error){
            window.alert('Dados já registrados ou inválidos')
        }
        onClick(formData)
    }

    async function getConvenios(){
        try{
            const {data} = await axios.get("https://api.hbcard.com.br/convenios")
            console.log(data.response)
            return data.response
        } catch (error) {
            console.error(error)
        }
    
    }

    useEffect(() => {
        
        const getData = async () => {
           const convenios = await getConvenios()
            let iteredConvenios = []
            convenios.forEach((item) => {
                const convenio = {
                    value: item.nome,
                    label: item.nome,
                    link: item.link
                }
                console.log(iteredConvenios)
                iteredConvenios.push(convenio)
            })

            setEmpresas(iteredConvenios)

        }

        getData()

    }, [])

    return(
        <MainContainer>
            <FormCard>
                <InputContainer
                placeholder="Digite o nome do associado"
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
                placeholder="email@email.com.br"
                value={email}
                onChange={(event) => (setEmail(event.target.value))}
                />

                <InputContainer
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                type="date"
                value={dataNascimento}
                onChange={(event) => (setDataNascimento(event.target.value))}
                />
                

                <SelectContainer
                label='Vendedor'
                value={vendedor}
                options={vendedores}
                onChange={(event) => (setVendedor(event.target.value))}
                />

                <SelectContainer
                label='Forma de Pagamento'
                value={formaPagamento}
                options={formasPagamento}
                onChange={(event) => (setFormaPagamento(event.target.value))}
                />

                <SelectContainer
                label='Vencimento'
                value={vencimento}
                options={vencimentos}
                onChange={(event) => (setVencimento(event.target.value))}
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
                    options={empresas}
                    onChange={(event) => {
                        console.log(event.target.value)
                        setEmpresa(event.target.value)
                    }}/>

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
                options={empresas}
                onChange={(event) => {
                        console.log(event.target.value)
                        console.log(empresas)
                        empresas.forEach((item) => {
                            if(item.label === event.target.value){
                                console.log(item.link)
                                setLink(item.link)
                            }
                        })
                        setEmpresa(event.target.value)
                    }}
                />}

                <ButtonContainer
                title="Gerar"
                onClick={retornarDadosDoFormulario}/>
                
            </FormCard>
        </MainContainer>
    )
}

export default FormContainer
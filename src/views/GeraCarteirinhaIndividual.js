import PersonalCard from "../components/card/Personalcard"
import BusinessCard from "../components/card/BusinessCard"
import FormContainer from "../components/form/FormContainer"
import { useState } from "react"

function GeraCarteirinhaIndividual(){

    const [nome, setNome] = useState('')
    const [codigo, setCodigo] = useState('')
    const [card, setCard] = useState('Individual')
    const [empresa, setEmpresa] = useState('')
    const [showCard, setShowCard] = useState(false)


    const gerarCarteirinha = (formData) => {

            setNome(formData.nome.toUpperCase())
            setCodigo(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
            setCard(formData.tipo)
            setEmpresa(formData.empresa)
            console.log()
            setShowCard(true)
            
    }
    return(
        <div>
        {!showCard && <FormContainer onClick={gerarCarteirinha}/>}
        {showCard && card === 'Individual' && <PersonalCard nome={nome} codigo={codigo}/>}
        {showCard && card === 'Empresarial' && <BusinessCard nome={nome} codigo={codigo} empresa={empresa}/>}
        </div>
    )
}

export default GeraCarteirinhaIndividual
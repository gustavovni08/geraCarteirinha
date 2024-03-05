import Card from "../components/card/card"
import FormContainer from "../components/form/FormContainer"
import { useState } from "react"

function GeraCarteirinhaIndividual(){

    const [nome, setNome] = useState('')
    const [codigo, setCodigo] = useState('')
    const [showCard, setShowCard] = useState(false)


    const gerarCarteirinha = (formData) => {
        if(formData.nome === '' || formData.cpf === ''){
            window.alert('nome e cpf são obrigatorios')
            return
        } else {
            setNome(formData.nome.toUpperCase())
            setCodigo(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
            setShowCard(true)
            
        }
    }
    return(
        <div>
        {!showCard && <FormContainer onClick={gerarCarteirinha}/>}
        {showCard && <Card nome={nome} codigo={codigo}/>}
        </div>
    )
}

export default GeraCarteirinhaIndividual
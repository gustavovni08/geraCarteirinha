import PersonalCard from "../components/card/Personalcard"
import BusinessCard from "../components/card/BusinessCard"
import FormContainer from "../components/form/FormContainer"
import { useState, useEffect } from "react"

function GeraCarteirinhaIndividual(){

    const [nome, setNome] = useState('')
    const [codigo, setCodigo] = useState('')
    const [card, setCard] = useState('Individual')
    const [convenio, setConvenio] = useState('')
    const [showCard, setShowCard] = useState(false)
    const [lista, setLista] = useState([])
    const [link, setLink] = useState()

    const gerarCarteirinha = (formData) => {

        const nomeLista = formData.nome.split(' ')
        const newNome = `${nomeLista[0]} ${nomeLista[nomeLista.length-1]}`

            setNome(newNome.toUpperCase())
            setCodigo(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
            setCard(formData.plano)
            setConvenio(formData.convenio)
            setLista(formData.listaDepedentes)
            setLink(formData.link)
            console.log(formData)
            console.log(nome, lista, card, convenio)
            setShowCard(true)
            
    }

    useEffect(() => {
        console.log(showCard, card, convenio)
    }, [showCard, convenio])
    return(
        <div>
        {!showCard && <FormContainer onClick={gerarCarteirinha}/>}
        {showCard && card === 'Individual' && <PersonalCard nome={nome} codigo={codigo}/>}
        {showCard && card === 'Empresarial' &&  convenio !== 'Sindprev' && <BusinessCard nome={nome} codigo={codigo} empresa={convenio} mostrarBotao={true} link={link}/>}
        {showCard && card === 'Empresarial' &&  convenio === 'Sindprev' && <PersonalCard nome={nome} codigo={codigo} empresa={convenio} link={link}/>}
        {showCard && card === 'Familiar' && convenio === 'SELECIONE' && (
            <>
            <PersonalCard
            nome={nome}
            codigo={codigo}
            />

            {
                lista
                    .filter(item => item.label.includes('Nome'))
                    .map((item, index) => {
                        return(
                            <PersonalCard
                            nome={item.value}
                            codigo={codigo+index+1}
                            />
                        )
                    })
            }
            </>
        )}
        {showCard && card === 'Familiar' && convenio !== 'SELECIONE' && convenio !== 'Sindprev' && (
            <>
            <BusinessCard
            nome={nome}
            codigo={codigo}
            empresa={convenio}
            mostrarBotao={true}
            />

            {
                lista
                    .filter(item => item.label.includes('Nome'))
                    .map((item, index) => {
                        return(
                            <BusinessCard
                            nome={item.value}
                            codigo={codigo+index+1}
                            empresa={convenio}
                            mostrarBotao={true}
                            link={link}
                            />
                        )
                    })
            }

            </>
        )}
        {showCard && card === 'Familiar' && convenio !== 'SELECIONE' && convenio === 'Sindprev' && (
            <>
            <PersonalCard
            nome={nome}
            codigo={codigo}
            empresa={convenio}
            />

            {
                lista
                    .filter(item => item.label.includes('Nome'))
                    .map((item, index) => {
                        return(
                            <PersonalCard
                            nome={item.value}
                            codigo={codigo+index+1}
                            empresa={convenio}
                            />
                        )
                    })
            }
            </>
        )}
        </div>
    )
}

export default GeraCarteirinhaIndividual
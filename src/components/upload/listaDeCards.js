function listaDeCards(props) {

    const {lista, empresa} = props

    const listaDeRefs = []

    const gerarCodigo = () => {
        const codigo = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
        return codigo
    }

    return(
        <div>
            {lista.map((item, index) => (
                 <BusinessCard 
                    key={index} 
                    nome={item} 
                    codigo={gerarCodigo()} 
                    empresa={empresa} 
                    mostrarBotao={false}
                /> ))}
                
            <ButtonContainer title='Exportar Tudo' onClick={() => console.log(listaDeRefs)}/>
        </div>
    )
}

export default listaDeCards
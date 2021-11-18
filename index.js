const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    scalar Date

    type Usuario{
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    #Pontos de entrada da API!
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLoagado: Usuario
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Retornando uma String'
        },
        horaAtual() {
            return new Date
        },
        usuarioLoagado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@gmail.com',
                idade: 23,
                salario: 1234.56,
                vip: true
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})

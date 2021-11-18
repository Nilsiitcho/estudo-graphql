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

    type Produto {
        id: ID,
        nome: String!,
        preco: Float!,
        desconto: Float,
        precoComDesconto: Float
    }

    #Pontos de entrada da API!
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLoagado: Usuario,
        produtoEmDestaque: Produto,
        numerosMegaSena: [Int!]!
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            return produto.desconto ? produto.preco - (produto.preco * produto.desconto) : produto.preco
        }
    },
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
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                id: 1,
                nome: 'Macbook Pro 17',
                preco: 8000.00,
                desconto: 0.20
            }
        },
        numerosMegaSena() {
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1)).sort(crescente);
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

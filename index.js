const {ApolloServer, gql} = require('apollo-server');

const usuarios = [
    {
        id: 1,
        nome: 'Nilson Neto',
        email: 'nysonneto@gmail.com',
        idade: 25
    },
    {
        id: 2,
        nome: 'Gabriel Rezende',
        email: 'gmrezende91o@gmail.com',
        idade: 30
    },
    {
        id: 3,
        nome: 'Ana Hellena',
        email: 'aninhagatinha@gmail.com',
        idade: 27
    },
]

const perfis = [
    {
        id: 1,
        nome: 'Comun'
    },
    {
        id: 2,
        nome: 'Administrador'
    }
]

const typeDefs = gql`
    scalar Date

    type Perfil {
        id: Int,
        nome: String!
    }

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
        numerosMegaSena: [Int!]!,
        usuarios: [Usuario],
        usuario(id: Int) : Usuario,
        perfis: [Perfil],
        perfil(id: Int): Perfil
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
        },
        usuarios() {
            return usuarios;
        },
        usuario(_, {id}) {
            const sels = usuarios.filter(u => u.id === id)
            return sels ? sels[0] : null
        },
        perfis(){
            return perfis
        },
        perfil(_, {id}) {
            const sels = perfis.filter(u => u.id === id)
            return sels ? sels[0] : null
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})

//Es para usar dentro de módulos de nest (building blocks)

export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    default_limit: +process.env.DEFAULT_LIMIT || 7
})
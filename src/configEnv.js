const schemaEnv = {
    type: 'object',
    required: ['PORT', "HOST", "MONGO_URI", "CLOUD_NAME", "API_KEY", "API_SECRET"],
    properties: {
        PORT: {
            type: 'number'
        },

        HOST: {
            type: "string"
        },

        MONGO_URI: {
            type: "string"
        },

        CLOUD_NAME: {
            type: "string"
        },

        API_KEY: {
            type: "string"
        },

        API_SECRET: {
            type: "string"
        }
    }
}

export const optionsEnv = {
    schema: schemaEnv,
    dotenv: true
}
import swagger from 'swagger-node-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import appConfig from '../configs/app';

const swaggerDefinition = {
  info: {
    title: 'NodeJS mentoring program',
    version: '1.0.0',
    description: 'API docs for NodeJS mentoring program',
  },
  protocol: 'https',
  host: `localhsot:${ appConfig.PORT }`,
  basePath: '/',
  securityDefinitions: {
    APIKeyHeader: {
      type: 'apiKey',
      in: 'header',
      name: 'token',
    },
  },
};

const apis = [
  //'./routes/api/**/*.mjs',
  //'./swagger-doc/definitions.yaml',
  //'./swagger-doc/parameters.yaml',
  //'./swagger-doc/responses.yaml',
];

const options = { swaggerDefinition, apis };

const swaggerSpec = swaggerJSDoc(options);

export default function (app) {
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  swagger.setAppHandler(app);
}

import { DB_DATABASE, USER_NAME, PASSWORD, CLUSTER_NAME, QUERY_PARAMS } from '@config';
const { ServerApiVersion } = require('mongodb');

export const dbConnection = {
  url: `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}/${DB_DATABASE}${QUERY_PARAMS}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
};

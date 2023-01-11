import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_gBHvk7ptw',
  ClientId: 'iq598tbtuck3ropmriens18a7',
};

export default new CognitoUserPool(poolData);
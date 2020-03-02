const dev = {
    s3: {
      REGION: "eu-central-1",
      BUCKET: "astorgacollections-backend-dev-attachmentsbucket-kk81bi0m2uvx"
    },
    apiGateway: {
      REGION: "eu-central-1",
      URL: "https://api.astorgacollections.com/dev"
    },
    cognito: {
      REGION: "eu-central-1",
      USER_POOL_ID: "eu-central-1_YEQK4vE9L",
      APP_CLIENT_ID: "7iuatp2n8bkhctltigetcrnr5q",
      IDENTITY_POOL_ID: "eu-central-1:8341cdc9-dac4-4c04-94bc-ef11de801466"
    }
  };
  
  const prod = {
    s3: {
      REGION: "eu-central-1",
      BUCKET: "astorgacollections-backend-prod-attachmentsbucket-1asdr9rqu9lzo"
    },
    apiGateway: {
      REGION: "eu-central-1",
      URL: "https://api.astorgacollections.com/prod"
    },
    cognito: {
      REGION: "eu-central-1",
      USER_POOL_ID: "eu-central-1_Ry0V9yzPQ",
      APP_CLIENT_ID: "16arjbh7du376ht1bja2t9ka3g",
      IDENTITY_POOL_ID: "eu-central-1:4c0bb00a-3f7b-4c8b-a04b-243f4ba181b7"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };
# Script Administrador

## Instalando dependencias

    npm install

## Rodando script administrador

    npm run start

## Rodando script administrador em modo desenvolvedor

    npm run dev

## Configurando (config.json)

Firebase (https://firebase.google.com/docs/server/setup)

S3 (https://console.aws.amazon.com/iam/home#security_credential) (Access Keys (Access Key ID and Secret Access Key)

Serial (/dev/ttyACM0, verifique em qual porta esta rodando o Arduino)

```json
{
  "firebase": {
    "serviceAccount": {
      "type": "service_account",
      "project_id": "...",
      "private_key_id": "...",
      "private_key": "...",
      "client_email": "...",
      "client_id": "...",
      "auth_uri": "...",
      "token_uri": "...",
      "auth_provider_x509_cert_url": "...",
      "client_x509_cert_url": "..."
    },
    "databaseURL": "..."
  },
  "s3": {
    "accessKeyId": "...",
    "secretAccessKey": "...",
    "region": "...",
    "bucket": "plataforma-robotica"
  },
  "serial": "/dev/ttyACM0"
}
```

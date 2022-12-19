import dotenv from 'dotenv'
dotenv.config()

export const serviceAccount = {
    type: "service_account",
    project_id: "sport-yard-40ac7",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: "firebase-adminsdk-k1gbj@sport-yard-40ac7.iam.gserviceaccount.com",
    client_id: "104228023085371395949",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k1gbj%40sport-yard-40ac7.iam.gserviceaccount.com"
}
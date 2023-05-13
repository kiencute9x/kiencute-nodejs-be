import {userRouter } from './routers/index.js'
import {fcmRouter } from './routers/index.js'
import {userControllers } from './controllers/index.js'
import express from 'express'
import dotenv from 'dotenv'
import { print  ,OutputType} from './helpers/print.js'
import checkToken from './authentication/auth.js'
dotenv.config()
import {connect} from './database/db.js'
import admin from "firebase-admin"
admin.initializeApp({
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "iamhere-49ba7",
      "private_key_id": "15f7efdbda2e23c1dd8ce738b3c729d66b531a87",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzqNeSUnPhYUGJ\nHXd/MqnHDIw+JwnW+waqeylGqER3VORASJv24E/KQYCxorGRa+cruQjf3jx1tnBW\nw+Y813g33VxVjqCFbzQa/eL51f9ipo3FcnbWZoSyHD5uvSe8Yv6edn2BBCcObnfM\nOGxXTY+q8IxIVktOdzC0wkL0s3QXjgwGMrW2V60/EU7EnrfIS6SYT1FCbkbeZ1Wk\n263tq0Z0PjY0PoAXEJTH057w9EiaitJXLcKcXpTPrfdiLbPasmUvGm4Jsy36qGLg\ngiRvrAMsq/UhFwc1Sn6WVX8xnU0zqyRuat85y6ujHmpUd8hPn/rsGiXL5PMIlhIn\nEemky6RPAgMBAAECggEAH75P5IMcBXD1LuBdekR92fUeHGcyZmExItMjDmBxxHHj\n6HXL1Nl6T562OeyomiyqCkAl0MRIA3ZqL/JqDkr160z54QYT16+30aMVRRZqCsip\n2P6p/6TagkvaPh++0xrcqSv/bdnJetPK5/L6NYy3OzlIWAmjQahumymNwgWpF/YN\n0osf9wX2UPLCn/+REu7d+xOfd/rLuQP4ACDfJXSpBOPQYBGv0sRjYz1ngeXC56gH\nrvQpTZerpz/U5/bp47owAQg2sGeI4KW7vVBq63Bfv+bl89ArQJL8D0sIY/dLbzue\nPFtBaUvKzoMMiX9gOHfE0353QAoDyZpko9dFc92kmQKBgQDfIfAy8RW/c3sk3mwN\nQtxy3mxgbu9XPg7Km6O2n2ryC7k0ONMfbx4ZM7aU+SZ9429oYlBcu4b5Gx0nz18M\nWgjonLEb7flqL85goORIr5g4fAMtlQPTVCa2oxP/cP4enjroGgf9ZEpqklPKKYU9\nSvbehq5iESuQeM8y3k3/HEEHuQKBgQDOH5Z/wrSmqiV/3yQmjBy+hbs4/t2vxX6D\naBZHQ2DfkPKiuJ5fQ6ZANGESKdQTLRlfWFI+iuAuQuLwUenAPQVUTu7QskEanh/l\nEJm1PcQcN+m5nUtjhyeizXXKoeM16XV3BBcOhjW97NBZvdigqll4pa68R2RIsU+M\nvRxdKRaARwKBgEgXOPncdoBSmTjCO/rU3VCnmDBX5zAytqizPGOmgfEN5JqAuYVw\nazMNSDI9hTgrITWCfiBX3jXhkrvn/feJp1MwPPCfJHQwWedSVC8/vFiTiJtTh9bh\nW1iqu61OHmxaBwIyVt6BZqGkATpRy+CPtc8TiIfasE6PGbJ/rId942zRAoGAcIbq\nIIFpIfuNUUu+bpTbNF/JoAnzeHv230I5t1nfTu3QqGjlfNhvsGln/QR81KMwUM7k\nx2QFkvvM7KmrVNl7SVV2JtTJmgBtJR5062722vjjTgPDHmiwiL5l6eOLKOl0yS6g\nb7txJ2hbLkLoOn4FLko1JHBNHSo/ZXPwQiOmNw0CgYEAx2td3h+ZpvWlayYEMWfL\nGSp8TgB/1FkNSBioNGXL+MyEEgi/57tfMtyTVDcCksc/3Ool9CfVSQms4+7OMmxX\niDOraJ/GEMGWVqifI1Dqvjl1KYIRRbKjPIdM5cKeKI+1f709IF39tHqiwwgTQmf+\n2Qj1FOAYkUamZZiT6S5m8jg=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-fvxk8@iamhere-49ba7.iam.gserviceaccount.com",
      "client_id": "105940923165232805824",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fvxk8%40iamhere-49ba7.iam.gserviceaccount.com"
    }
  ),
});

const _app = express();

const port = process.env.PORT ?? 3000

_app.use(checkToken) // check token middle ware

_app.use(express.json())

_app.use('/users',userRouter)
_app.use('/fcm',fcmRouter)


_app.get('/index',(_req , _res) =>{
    _res.send('response route router off kien cutes')
})

_app.listen(port, async() => {
    // await disconnectMongo()
    await connect()
    console.log(`listening on port : ${port}`)
})
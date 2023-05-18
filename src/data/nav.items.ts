import { getEnvVar } from "../utils/common.utils"

const callbackUrl = getEnvVar("REACT_APP_CALLBACK_URL")
const env = getEnvVar("REACT_APP_ENVIRONMENT")
const cognitoClientId = getEnvVar("REACT_APP_COGNITO_CLIENT_ID")

const loginUrl = `https://${env.toLowerCase()}-enchantrek-domain.auth.ap-southeast-2.amazoncognito.com/login?client_id=${cognitoClientId}&response_type=code&scope=email+openid&redirect_uri=${callbackUrl}`
const signupUrl = `https://${env.toLowerCase()}-enchantrek-domain.auth.ap-southeast-2.amazoncognito.com/signup?client_id=${cognitoClientId}&response_type=code&scope=email+openid&redirect_uri=${callbackUrl}`

export const links = [
  {
    id: 1,
    url: loginUrl,
    text: "login",
  },
  {
    id: 2,
    url: signupUrl,
    text: "sign up",
  },
  {
    id: 3,
    url: "/about",
    text: "about",
  },
  {
    id: 4,
    url: "/contact",
    text: "contact",
  },
]

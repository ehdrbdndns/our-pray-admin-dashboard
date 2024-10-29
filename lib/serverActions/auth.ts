import { auth } from '../auth'

async function hasSession() {
  console.log("--- hasSession ---");
  console.log(process.env.NODE_ENV);
  console.log("------------------");
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  const session = await auth()

  if (!session) {
    return false
  } else {
    return true;
  }
}

export {
  auth as getSession,
  hasSession
}
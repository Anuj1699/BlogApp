import React from 'react'
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Oauth = () => {
  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  }
  return (
    <button className="mb-6 flex justify-center -mx-2 w-full" onClick={handleGoogleLogin}>
      <div className="w-full px-2">
        <a
          className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-200 hover:border-gray-400 transition duration-100"
          href="#"
        >
          <img
            src="saturn-assets/images/sign-up/icon-apple.svg"
            alt=""
          />
          <span className="ml-4 text-sm font-semibold text-gray-500">
            Continue with Google
          </span>
        </a>
      </div>
    </button>
  )
}

export default Oauth;
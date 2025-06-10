import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();
    
    if(!isLoaded) {
        return null
    }

    const signInWithGoogle = async () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: `/sso-callback`,
            redirectUrlComplete: `/auth-callback`,
        })
    }
  return (
    <Button onClick={signInWithGoogle} variant={'secondary'} className="w-full border-zinc-200 h-11 text-white" >
        Continue with Google
    </Button>
  )
}

export default SignInOAuthButtons

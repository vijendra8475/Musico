import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import ChatPage from "./pages/Chats/ChatPage";
import AlbumPage from "./pages/Album/AlbumPage";


const App = () => {
  return (
    <Routes>
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback  signUpForceRedirectUrl={'/auth-callback'} />} />
      <Route path='/auth-callback' element={<AuthCallback />}/>

      <Route element={<MainLayout />} >
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/albums/:albumId' element={<AlbumPage />} />
      </Route>
    </Routes>
  )
}

export default App

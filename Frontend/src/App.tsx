import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import ChatPage from "./pages/Chats/ChatPage";
import AlbumPage from "./pages/Album/AlbumPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { Toaster } from 'react-hot-toast'
import { NotFoundPage } from "./pages/404/NotFoundPage";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />
        <Route path='/auth-callback' element={<AuthCallback />} />
        <Route path='/admin' element={<AdminPage />} />

        <Route element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App

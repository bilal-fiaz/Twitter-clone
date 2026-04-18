import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import Sidebar from './components/common/SideBar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'

function App() {


	return (
		<div className='flex max-w-6xl mx-auto'>
			{/* common component, bc it's not wrapped with routes */}
			<Sidebar />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/profile/:username' element={<ProfilePage />} />
			</Routes>


			<RightPanel />
		</div>

	)
}

export default App

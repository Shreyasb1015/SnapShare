import './App.css'
import {Register,Login,Welcome,MyProfile,UpdatePost ,AddPost,AddStory,ChangePassword} from  './components/index'
import  Home  from './pages/Home'
import Stories from './pages/Stories';
import ProfileUpdate from './pages/ProfileUpdate'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/register' element={<Register/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/my-profile' element={<MyProfile/>}/>
           <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/update-profile' element={<ProfileUpdate/>}/>
          <Route path='/add-post' element={<AddPost/>}/>
          <Route path='/add-story' element={<AddStory/>}/>
          <Route path='/all-stories' element={<Stories/>}/>
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path='/:postId/update-post' element={<UpdatePost/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App

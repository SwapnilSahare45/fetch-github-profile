import React, { useContext, useState } from 'react'
import { ProfileContext } from '../context/ProfileContext'
import Loader from './Loader';

const Profile = () => {

    const { state, getProfile } = useContext(ProfileContext);

    const [input, setInput] = useState('')
 

    const handleSearch = () => {
        if (!input == '') {
            getProfile(input)
            setInput('')
        } else {
            alert('Enter name')
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center bg-gray-50'>

            <div className='w-96 flex justify-between mb-8'>
                <input className='w-[70%] py-3 pl-4 rounded-full focus:outline-none shadow-lg' onChange={e => setInput(e.target.value)} value={input} placeholder='Search...' type="text" />
                <button className='w-[28%] bg-green-400 text-white rounded-full shadow-lg' onClick={handleSearch}>Search</button>
            </div>

            {state.profile ? state.loading ? <Loader /> :
                <div className='p-5 rounded-xl bg-white shadow-lg'>
                    <div>
                        <img className='w-80 mb-6 shadow-md rounded-xl' src={state.profile?.avatar_url} alt={state.profile?.name || "Profile"} />
                    </div>

                    <div>
                        <div className='flex justify-evenly mb-3'>
                            <div className='font-semibold'>Follwers : {state.profile?.followers}</div>
                            <div className='font-semibold'>Following : {state.profile?.following}</div>
                        </div>
                        <h1 className=''>Name : {state.profile?.name || 'Not available'}</h1>
                        <h3 className='my-1'>Email : {state.profile?.email || 'Not available'}</h3>
                        <h5>Repos : {state.profile?.public_repos || 'Not available'}</h5>
                    </div>
                </div>
                : <h1>Search profile.</h1>
            }
        </div>
    )
}

export default Profile
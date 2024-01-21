import { User } from '../components/UserCard'
import storedUsers from '../data/users.json'
import { createContext, useState } from 'react'

type AppContextType = {
	users: User[]
	setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const AppContext = createContext({} as AppContextType)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<User[]>(storedUsers)

	return <AppContext.Provider value={{ users, setUsers }}>{children}</AppContext.Provider>
}

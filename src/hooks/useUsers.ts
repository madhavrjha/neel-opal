import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import { UserUpdateFormType } from '../components/Modal'

const useUsers = () => {
	const { users, setUsers } = useContext(AppContext)

	const updateUser = (id: string, data: UserUpdateFormType) => {
		setUsers(prev => {
			const currentUser = prev.find(u => u.id === id)
			if (!currentUser) return prev
			const otherUsers = users.filter(u => u.id !== id)
			return [
				...otherUsers,
				{
					...currentUser,
					...data,
					id,
				},
			]
		})
	}

	const deleteUser = (id: string) => {
		setUsers(prev => [...prev.filter(u => u.id !== id)])
	}

	const toggleLike = (id: string) => {
		setUsers(prev => {
			const currentUser = prev.find(u => u.id === id)
			if (!currentUser) return prev
			const otherUsers = users.filter(u => u.id !== id)
			return [
				...otherUsers,
				{
					...currentUser,
					like: !currentUser.like,
				},
			]
		})
	}

	return { users, updateUser, deleteUser, toggleLike }
}

export default useUsers

import { useMemo } from 'react'
import useUsers from '../hooks/useUsers'
import UserCard from './UserCard'

const UserList = () => {
	const { users } = useUsers()

	const sortedUsers = useMemo(() => users.sort((a, b) => (a.id > b.id ? 1 : -1)), [users])

	return (
		<>
			<div className='card-list'>
				{sortedUsers.map(user => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</>
	)
}

export default UserList

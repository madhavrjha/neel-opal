import { MdOutlineEmail } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { CiGlobe } from 'react-icons/ci'
import { IoMdHeart } from 'react-icons/io'
import { IoMdHeartEmpty } from 'react-icons/io'
import { PiPencilSimpleLineThin } from 'react-icons/pi'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'
import Modal from './Modal'
import useUsers from '../hooks/useUsers'

export type User = {
	id: string
	name: string
	email: string
	phone: string
	website: string
	avatarUrl: string
	like?: boolean
}

const UserCard = ({ user }: { user: User }) => {
	const [open, setOpen] = useState(false)

	const { deleteUser, toggleLike } = useUsers()

	const closeModal = () => {
		setOpen(false)
	}
	return (
		<>
			{open && <Modal closeModal={closeModal} user={user} />}
			<div className='card'>
				<div className='card-media'>
					<img src={user.avatarUrl} alt={user.name} />
				</div>
				<div className='card-content'>
					<h2>{user.name}</h2>
					<p>
						<MdOutlineEmail style={{ fontSize: '1.2rem' }} /> {user.email}
					</p>
					<p>
						<FiPhone style={{ fontSize: '1.2rem' }} /> {user.phone}
					</p>
					<p>
						<CiGlobe style={{ fontSize: '1.2rem' }} /> {user.website}
					</p>
				</div>
				<div className='card-actions'>
					<div className='action'>
						<button className='like' onClick={() => toggleLike(user.id)}>
							{user.like ? <IoMdHeart style={{ color: 'red' }} /> : <IoMdHeartEmpty style={{ color: 'red' }} />}
						</button>
					</div>
					<div className='action'>
						<button className='edit' onClick={() => setOpen(true)}>
							<PiPencilSimpleLineThin />
						</button>
					</div>
					<div className='action'>
						<button className='delete' onClick={() => deleteUser(user.id)}>
							<MdDelete />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserCard

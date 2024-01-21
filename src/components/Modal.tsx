import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { z } from 'zod'
import { User } from './UserCard'
import useUsers from '../hooks/useUsers'

const UserUpdateFormSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	phone: z.string().min(8),
	website: z.string().url(),
})

export type UserUpdateFormType = z.infer<typeof UserUpdateFormSchema>

const Modal = ({ closeModal, user }: { closeModal: () => void; user: User }) => {
	const overlayRef = useRef<HTMLDivElement>(null)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<UserUpdateFormType>({
		defaultValues: {
			name: user.name,
			email: user.email,
			phone: user.phone,
			website: user.website,
		},
		resolver: zodResolver(UserUpdateFormSchema),
	})

	const { updateUser } = useUsers()

	const onSubmit: SubmitHandler<UserUpdateFormType> = data => {
		updateUser(user.id, data)
		closeModal()
	}

	return (
		<div
			ref={overlayRef}
			className='modal-overlay'
			onClick={e => {
				if (e.target === overlayRef.current) closeModal()
			}}>
			<div className='modal-box'>
				<div className='modal-header'>
					<h3>Update User</h3>
					<IoIosClose style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={closeModal} />
				</div>
				<div className='modal-content'>
					<form noValidate onSubmit={handleSubmit(onSubmit)}>
						<div className='form-field'>
							<label>
								<span>*</span> Name:
							</label>
							<div>
								<input type='text' {...register('name')} className={errors.name ? 'error' : ''} />
								{errors.name && <p className='helper-message'>{errors.name.message}</p>}
							</div>
						</div>
						<div className='form-field'>
							<label>
								<span>*</span> Email:
							</label>
							<div>
								<input type='email' {...register('email')} className={errors.email ? 'error' : ''} />
								{errors.email && <p className='helper-message'>{errors.email.message}</p>}
							</div>
						</div>
						<div className='form-field'>
							<label>
								<span>*</span> Phone:
							</label>
							<div>
								<input type='text' {...register('phone')} className={errors.phone ? 'error' : ''} />
								{errors.phone && <p className='helper-message'>{errors.phone.message}</p>}
							</div>
						</div>
						<div className='form-field'>
							<label>
								<span>*</span> Website:
							</label>
							<div>
								<input type='text' {...register('website')} className={errors.website ? 'error' : ''} />
								{errors.website && <p className='helper-message'>{errors.website.message}</p>}
							</div>
						</div>
					</form>
				</div>
				<div className='modal-footer'>
					<button className='secondary' onClick={closeModal}>
						Cancel
					</button>
					<button className='primary' onClick={handleSubmit(onSubmit)}>
						OK
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal

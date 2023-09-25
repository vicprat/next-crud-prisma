'use client'
import { Task } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
    const router = useRouter()

    return (
        <div
            className='p-4 my-4 bg-gray-900 rounded-md shadow-sm hover:bg-gray-800 hover:cursor-pointer'
            onClick={() => router.push(`/task/edit/${task.id}`)}
        >
            <h1 className='text-xl font-bold'>{task.title}</h1>
            <p className='text-slate-400'>{task.description}</p>
        </div>
    )
}


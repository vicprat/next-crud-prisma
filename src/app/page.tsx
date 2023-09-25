import TaskCard from '@/components/TaskCard'
import { prisma } from '@/libs/prisma'
import Link from 'next/link'
async function loadTask() {
  return await prisma.task.findMany()
}

export const dynamic = 'force-dynamic'
export default async function Home() {
  const tasks = await loadTask()

  return (
    <div className='grid grid-cols-1 gap-4 mt-5 md:grid-cols-2'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

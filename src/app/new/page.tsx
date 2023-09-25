'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useEffect } from "react"

export default function Page({ params }: { params: { id: string } }) {

    const { handleSubmit, register, setValue } = useForm()
    const router = useRouter()

    console.log(params)

    useEffect(() => {
        if (params.id) {
            axios.get(`/api/tasks/${params.id}`)
                .then(res => {
                    setValue('title', res.data.title)
                    setValue('description', res.data.description)
                })
        }
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await axios.put(`/api/tasks/${params.id}`, data)
        } else {
            await axios.post('/api/tasks', data)
        }
        router.push('/')
        router.refresh()
    })

    return (
        <section className="flex items-center justify-center h-[calc(100vh-7rem)]">
            <form onSubmit={onSubmit} className="w-2/4">
                <h1 className="text-2xl font-bold">{params.id ? "Update" : "Create"} Task</h1>
                <label htmlFor="title" className="text-xs font-bold">Write a title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Write a title"
                    className="block w-full px-3 py-1 mb-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("title", { required: true })}
                />
                <label htmlFor="title" className="text-xs font-bold">Write a description</label>
                <textarea
                    id="description"
                    placeholder="Write a description"
                    className="block w-full px-3 py-1 mb-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("description", { required: true })}
                ></textarea>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-3 py-1 text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >{params.id ? "Update" : "Create"}</button>
                    {params.id && <button
                        className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        type="button"
                        onClick={async () => {
                            if (confirm('Are you sure you want to delete this task?')) {
                                await axios.delete(`/api/tasks/${params.id}`)
                                router.push('/')
                                router.refresh()
                            }
                        }}
                    >
                        Delete
                    </button>}
                </div>
            </form>
        </section>
    )
}



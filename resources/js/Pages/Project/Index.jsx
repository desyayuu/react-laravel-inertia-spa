import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";


export default function Index({auth, projects}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >

        <Head title="Projects" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark::bg-gray-700 dark:text-gray-400">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Imagee</th>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Create Date</th>
                                    <th className="px-3 py-3">Due Date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:norder-gray-700">
                                        <td>{project.id}</td>
                                        <td className="px-3 py-3">
                                            <img src={project.image_path} style={{width:60}}/>
                                        </td>
                                        <td className="px-3 py-3">{project.name}</td>
                                        <td className="px-3 py-3">{project.status}</td>
                                        <td className="px-3 py-3">{project.created_at}</td>
                                        <td className="px-3 py-3">{project.due_date}</td>
                                        <td className="px-3 py-3">{project.createdBy.name}</td>
                                        <td>
                                            <Link
                                                href={route('project.edit', project.id)}
                                                className="font-meidum text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <Link 
                                                href={route('project.destroy', project.id)}
                                                className="font-meidum text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </td>

                                    </tr>

                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}
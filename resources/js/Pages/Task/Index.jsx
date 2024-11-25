import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP} from "../constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({auth, tasks, queryParams=null}) {

    queryParams = queryParams || {}
    const searchFieldChanges = (name, value) =>{
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('task.index', queryParams));
    };

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanges(name, e.target.value);
    };

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            }else{
                queryParams.sort_direction = "asc";
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('task.index', queryParams));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Task
                </h2>
            }
        >

        <Head title="Task" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark::bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className="px-3 py-3">Image</th>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading
                                            name="creted_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Create Date
                                        </TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Due Date
                                        </TableHeading>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark::bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Project Name"
                                                onBlur={(e) => searchFieldChanges('name', e.target.value)}
                                                onKeyPress={(e)=> onKeyPress('name', e)}
                                            
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={(e) => searchFieldChanges('status', e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr key={task.id}className="bg-white border-b dark:bg-gray-800 dark:norder-gray-700">
                                            <td>{task.id}</td>
                                            <td className="px-3 py-3">
                                                <img src={task.image_path} style={{width:60}}/>
                                            </td>
                                            <td className="px-3 py-3">{task.name}</td>
                                            <td className="px-3 py-3">
                                                <span
                                                    className={
                                                        `px-2 py-1 rounded-lg text-xs font-medium text-white 
                                                        ${TASK_STATUS_CLASS_MAP[task.status]}`
                                                    }
                                                >
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">{task.created_at}</td>
                                            <td className="px-3 py-3">{task.due_date}</td>
                                            <td className="px-3 py-3">{task.createdBy.name}</td>
                                            <td>
                                                <Link
                                                    href={route('task.edit', task.id)}
                                                    className="font-meidum text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link 
                                                    href={route('task.destroy', task.id)}
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
                        <Pagination links={tasks.meta.links} />
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}
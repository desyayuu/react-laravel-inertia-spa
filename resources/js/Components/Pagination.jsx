import { Link } from "@inertiajs/react"; 

export default function Pagination({links}){
    return(
        <nav className="text-center mt-4">
            {links.map((link)=>(
                <Link
                    href={link.url || ""}
                    key={link.url}
                    className={
                        "inline-block py-2 px-3 rounded-lg  text -xs" + 
                        (link.active ? "bg-gray-950" : " ") + 
                        (!link.url ? "!text-gray-500 cursor-not-allowed": "hover:bg-gray-400")
                    }
                    dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    );
}
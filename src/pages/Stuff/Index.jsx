import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const [error, setError] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            } else {
                setError({ message: 'Terjadi kesalahan saat memuat daftar barang.' });
            }
        });
    }, [navigate]);
    
    const deleteStuff = (id) => {
        instance.delete(`stuff/delete/${id}`)
        .then(() => {
            setStuffs(stuffs.filter(stuff => stuff.id !== id));
            setNotification({ message: 'Stuff successfully deleted.', type: 'success' });
        })
        .catch(err => {
            setError(err.response.data);
            setNotification({ message: 'Failed to delete stuff.', type: 'error' });
        });
    };

    const clearNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <Case>
            <div className="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="m-5 pb-10 pt-10">
        <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
            <button className="px-4 py-2 bg-purple-700 text-white shadow-md border-sky-500 rounded-lg">
                <Link to="/stuff/create">
                    <small className="text-white">Tambah</small>
                </Link>
                
                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
            </button>
       
            <div>
                <Link to="/stuff/trash">
                    <button className="px-4 py-2 bg-purple-700 text-white shadow-md border-sky-500 rounded-lg">
                    <small className="text-white">Trash</small>
                    <button onClick={clearNotification} className="text-xl font-bold">×</button>
                
                        </button>
                </Link>

                </div>

        </div>  
                    {notification.message && (
                        <div role="alert" className={`mb-4 px-4 py-3 rounded ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            <div className="flex justify-between items-center">
                                <span>{notification.message}</span>
                                <button onClick={clearNotification} className="text-xl font-bold">×</button>
                            </div>
                        </div>
                    )}
                    {Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {error.message}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium white:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Stock</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuffs.map((stuff, id) => (
                                    <tr key={stuff.id} className="text-white border-b white:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                        {
                                            stuff.stock ? (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Total Available: {stuff.stock.total_available} <br/>
                                                    Total Defec: {stuff.stock.total_defec} <br/>
                                                </td>
                                            ) : (
                                                <td className="text-white whitespace-nowrap px-6 py-4">
                                                    Stock Belum Tersedia
                                                </td>
                                            )
                                        }
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={`/stuff/edit/${stuff.id}`}>
                                                <button className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</button>
                                            </Link>
                                            <button onClick={() => deleteStuff(stuff.id)} type="button" className="px-4 py-2 bg-red-500 rounded-lg font-bold text-white">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}

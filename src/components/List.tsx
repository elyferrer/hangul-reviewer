import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import type { Character } from "../interfaces/Character";

const List = ({ data }: { data: Character[] }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filter, setFilter] = useState<number|string>(0);

    useEffect(() => {
        const handleFilter = () => {
            if (filter == 0) {
                setCharacters(data);
            } else {
                setCharacters(data.filter(item => item.group == filter));
            }
        }

        handleFilter();
    }, [data, filter])

    return (
        <>
            <div className='md:w-2/5 bg-red-200 mx-auto min-h-screen p-2'>
                <Link to='/quiz' className='bg-blue-600 text-white rounded px-3 py-1'>Take a quiz</Link>
                <h1 className='text-center text-3xl pt-2 my-3'>List</h1>
                <select className='p-2 rounded bg-white w-full' onChange={ (e) => setFilter(e.target.value)}>
                    <option value={0}>All</option>
                    <option value={1}>Consonants</option>
                    <option value={2}>Vowels</option>
                </select>
                <div className='grid grid-cols-4 gap-2 pt-2'>
                    {
                        characters.length > 0 ?
                            characters.map((char, index) => (
                                <div key={index} className='bg-white rounded text-center p-2'>
                                    <h2 className='text-3xl'>{ char.character }</h2>
                                    <p>({ char.sound.join(', ')})</p>
                                </div>
                            ))
                            : ''
                    }
                </div>
            </div>
        </>
        
        
    )
}

export default List

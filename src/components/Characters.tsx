import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz'
import List from './List'
import type { Character } from '../interfaces/Character';
import { data } from '../data/data';

const Characters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
        
    useEffect(() => {
        const handlePopulate = () => {
            setCharacters(data);
        }

        handlePopulate();
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<List data={characters} />} />
                    <Route path='/quiz' element={<Quiz data={characters} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Characters

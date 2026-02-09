import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz'
import List from './List'
import type { Character, QuizItems } from '../interfaces/Character';
import { data } from '../data/data';

const Characters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const [filters, setFilters] = useState<QuizItems>({
        count: 0,
        type: 0
    });

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFilters((prev) => ({...prev, [name]: value }))
    }
        
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

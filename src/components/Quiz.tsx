import { useState, useEffect, useRef } from "react"
import type { Character, QuizFilter, QuizItems } from "../interfaces/Character";

const Quiz = ({ data }: { data: Character[] }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const [filters, setFilters] = useState<QuizFilter>({
        count: 5,
        type: 0
    });
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [quizItems, setQuizItems] = useState<Character[]>([]);
    const [resultItems, setResultItems] = useState<QuizItems[]>([]);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFilters((prev) => ({...prev, [name]: value }))
    }

    const generateQuizItems = () => {
        setQuizItems([]); setCurrentIndex(0); setResultItems([]);

        const filteredItems: Character[] = filters.type === 0 ? characters 
            : characters.filter(item => item.group == filters.type);
        const indices: number[] = [];

        while (indices.length < filters.count) {
            const randomNumber: number = randomizeNumber(filteredItems.length - 1);
            if (!indices.includes(randomNumber)) {
                indices.push(randomNumber);
            }
        }
        
        setQuizItems(indices.map(index => filteredItems[index]));
        setShowMenu(false)
        
        inputRef.current?.focus();
    }

    const randomizeNumber = (max: number) => {
       return Math.ceil(Math.random() * (max - 0) + 0);
    }

    const handleNext = (itemDetails: Character) => {
        const isCorrect = itemDetails.sound.includes(inputRef.current?.value);

        console.log('currentIndex', currentIndex)
        console.log('filter', filters.count)

        setResultItems([...resultItems, {
            question: itemDetails.character,
            answer: inputRef.current?.value,
            correctAnswer: itemDetails.sound,
            isCorrect: isCorrect
        }]);

        inputRef.current.value = ''
        inputRef.current.focus()

        if (currentIndex >= filters.count) {
            console.log(resultItems)
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }
        
    useEffect(() => {
        
    }, [resultItems])

     useEffect(() => {
        const handlePopulate = () => {
            setCharacters(data);
        }

        handlePopulate();
    }, [data])

    return (
        <div>
            <div className='md:w-2/5 bg-red-200 mx-auto min-h-screen p-2'>
                <button className='bg-blue-600 text-white rounded px-3 py-1' onClick={() => setShowMenu(true)}>Take a quiz</button>

                <div className='text-center mt-5'>
                    <h1 className='text-8xl'>
                        { quizItems.length > 0 && currentIndex < filters.count && quizItems[currentIndex].character }
                    </h1>

                    {
                        quizItems.length > 0 && currentIndex != filters.count &&
                        <div>
                            <input type="text" className='text-center p-2 m-3' ref={inputRef} />
                            <br />
                            <button onClick={() => handleNext(quizItems[currentIndex]) }>Next</button>
                        </div>
                    }
                    
                    {
                        currentIndex == filters.count &&
                        <div>
                            <div className='grid grid-cols-4 gap-1'>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold'>character</div>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold'>correct</div>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold'>answer</div>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold'>result</div>
                            </div>

                            { resultItems.map((result, index) => (
                                <div key={index} className='grid grid-cols-4 gap-1'>
                                    <div className='text-2xl bg-white m-0.5 p-2'>{ result.question }</div>
                                    <div className='text-2xl bg-white m-0.5 p-2'>{ result.correctAnswer.join(' or ') }</div>
                                    <div className='text-2xl bg-white m-0.5 p-2'>{ result.answer }</div>
                                    <div className='text-2xl bg-white m-0.5 p-2'>{ result.isCorrect ? '✅' : '❌' }</div>
                                </div>
                            ))}

                            <div className='grid grid-cols-4 gap-1'>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold'>Score</div>
                                <div className='text-xl bg-white m-0.5 p-2 font-bold col-span-3'>{resultItems.filter(result => result.isCorrect === true).length }</div>
                            </div>
                        </div>
                    }
                </div>
                
            </div>

            <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showMenu ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <div className='w-96 bg-white p-4 rounded grid grid-cols-1 gap-2'>
                    <h1 className='text-center text-xl'>Take a quiz</h1>
                    <select name='count' value={filters.count} onChange={handleChange}
                        className='bg-white p-2 border border-2 border-black rounded'>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <select name='type' value={filters.type} onChange={handleChange}
                        className='bg-white p-2 border border-2 border-black rounded'>
                        <option value={0}>All</option>
                        <option value={1}>Consonants</option>
                        <option value={2}>Vowels</option>
                    </select>
                    <button className='bg-blue-600 text-white rounded p-2' onClick={ () => {
                        generateQuizItems()
                    }}>Start quiz</button>
                    <button className='p-2' onClick={ () => setShowMenu(false) }>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Quiz

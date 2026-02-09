export interface Character {
    character: string,
    group: number,
    sound: string[]
}

export interface QuizFilter {
    count: number,
    type: number
}

export interface QuizItems {
    question: string,
    answer: string,
    correctAnswer: string[],
    isCorrect: boolean
}

import { Answer } from "./interfaces/answer";
"Task-7/task-7-nested-data-GaelLucero/src/interfaces/answer.ts"
import { Question, QuestionType } from "./interfaces/question";
import { addOption, duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let published = questions.filter((question: Question) => question.published)
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let newQuestions = questions.filter((question: Question): boolean => ((question.body !== "") || (question.expected !== "") || (question.options.length !== 0)))
    return newQuestions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    let newQuestion = questions.filter((question: Question) => question.id === id)
    return newQuestion.length !== 0 ? newQuestion[0] : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let newQuestions = questions.filter((question: Question) => question.id !== id)
    return newQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let newNames = questions.map((question: Question) => question.name)
    return newNames;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let sum = questions.reduce((sum: number, question: Question) => sum + question.points, 0)
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let sum = questions.reduce((sum: number, question: Question) => question.published ? sum + question.points : sum, 0)
    return sum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let header = "id,name,options,points,published"
    let data = questions.reduce((message: string, question: Question) => message + "\n" + question.id.toString() + "," + question.name + "," + question.options.length.toString() + "," + question.points.toString() + "," + question.published, "")
    return header + data;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let newAnswer: Answer[] = questions.map((question: Question) => ({questionId: question.id, text: "", submitted: false, correct:false}))
    return newAnswer;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let pubQuestion = questions.map((question: Question) => ({...question, published: true}))
    return pubQuestion;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let isSame = questions.reduce((counter: number, question: Question) => (question.type === "multiple_choice_question") ? counter +1 : counter -1, 0)
    
    if (isSame === questions.length || isSame === (-1 * questions.length)) {
        return true
    }
    return false
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    let newQuestion = makeBlankQuestion(id, name,type);
    let copyQuestion: Question[] = [...questions, newQuestion]
    return copyQuestion;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    let renameQuestion: Question[] = questions.map((question: Question) => ({...question, name: targetId === question.id ? newName : question.name}))
    return renameQuestion;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    let changedQuestion = questions.map((question : Question) => ({...question, options: ((targetId === question.id) && (question.type === "multiple_choice_question") ? [] : question.options) , type: (targetId === question.id) ? newQuestionType : question.type}))
    return changedQuestion;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    // create variable to return
    let optionQuestion: Question[];
    
    // if targetOption is -1, I will add the newOption to the end. Using the unpacking way
    if (targetOptionIndex === -1) {
        // map through all the questions and unpack them, I will only modify the option if the targetId === question.id using unpacking meathod
        optionQuestion = questions.map((question : Question) => ({...question, options: targetId === question.id ? [...question.options, newOption] : question.options}))
    }else{
        // else I will add the newOption anywhere within the option array. By mapping the option array, I can pass in an option and index, when index === targetOptionIndex I can then change the option to newOption
         optionQuestion = questions.map((question : Question) => ({...question, options: targetId === question.id ? question.options.map((option, index) => index === targetOptionIndex ? newOption : option) : question.options}))
    }
    return optionQuestion;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    let findQuestion = questions.filter((question : Question) => targetId === question.id)
    let findQuestionIndex = questions.findIndex((question : Question) => targetId === question.id)
    let newQuestion = duplicateQuestion(newId, findQuestion[0])
    let newQuestions = questions.map((question : Question) => ({...question}))
    newQuestions.splice(findQuestionIndex+1, 0, newQuestion)
    return newQuestions;
}

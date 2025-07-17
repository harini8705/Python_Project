import Question from "../models/questions.model.js";

export const questionstore = async (req, res) => {
    const { name, question } = req.body;
    console.log(name , question)
    if (!name || !question) {
        return res.status(400).json({ message: 'Please fill the fields' });
    }
    try {
        
        const newquestion = new Question({name, question });
        console.log(newquestion);
        await newquestion.save();
        res.status(201).json({ message: 'New Question is added' });
    } catch (error) {
        res.status(500).json({ message: 'Error in creating new question', error });
    }
}

export const questions = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name required" });
    }
    try {
        // Query the database for questions with the given name
        const questions = await Question.find({ name });

        res.status(200).json(questions);  // Return both question and answers
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions', error });
    }
}

export const allquestions = async (req, res) => {
    try {
        const allquestions = await Question.find({});
        res.status(200).json(allquestions);

    } catch (error) {
        res.status(500).json({ message: 'Error in retrieving all questions', error });
    }
}

export const addAnswer = async(req, res) => {
    const { answertext } = req.body;
    const { id } = req.params;
    if (!answertext) {
        return res.status(400).json({ message: 'Id should be given' });
    }
    try{
        const question = await Question.findById( id );
        if (!question) {
            return res.status(404).send("Question not found");
        }
        question.answers.push({ answertext });
        await question.save();
        return res.status(200).json({ message: 'Answer Added' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in adding answer', error });
    }
}
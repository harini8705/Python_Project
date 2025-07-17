import mongoose from 'mongoose';
//import Counter from './counter.model.js';

const QuestionSchema = mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
            trim: true
        },
        question: {
            type: String,
            required: true,
            trim: true
        },
        answers: [{
            answertext: {
                type: String,
                trim: true,
                default: null
            }
        }]
    },
    { timestamps: true }
);

// QuestionSchema.pre('save', async function (next) {
//     console.log('this.isNew:', this.isNew);
//     if (this.isNew) {
//         console.log('hi')
//         try {
//             console.log("hi")
//             const counter = await Counter.findOneAndUpdate(
//                 { name: 'qid' },
//                 { $inc: { sequenceValue: 1 } },
//                 { new: true, upsert: true }
//             );
//             console.log("Counter updated:", counter);
//             this.qid = counter.sequenceValue;
//         } catch (error) {
//             console.error("Error while setting qid:", error.message);
//             return next(error);
//         }
//     }
//     next();
// });

const Question = mongoose.model("questions", QuestionSchema);

export default Question;
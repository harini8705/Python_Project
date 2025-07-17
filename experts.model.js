import mongoose from 'mongoose';

const ExpertSchema = mongoose.Schema(
    {

        fname: {
            type: String,
            required: true,
            unique: true,
        },
        femail: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        pass: {
            type: String,
            required: true
        }
    }
);

const Expert = mongoose.model("experts", ExpertSchema);

export default Expert;
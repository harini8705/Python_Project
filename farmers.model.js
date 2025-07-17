import mongoose from 'mongoose';

const FarmerSchema = mongoose.Schema(
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

const Farmer = mongoose.model("farmers", FarmerSchema);

export default Farmer;
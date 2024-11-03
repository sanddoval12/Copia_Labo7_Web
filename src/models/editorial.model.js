import { Schema, model } from 'mongoose';

const editorialSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    creationDate: { type: Date, default: Date.now() }
});

const Editorial = model('Editorial', editorialSchema);

export { Editorial };

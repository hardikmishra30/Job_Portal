import mongoose , {Schema} from 'mongoose'

const userSchema = new Schema({
name: {
    _id: String,
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
resume: {
    type: String,
},
image: {
    type: String,
    required: true,
}
})

const User = mongoose.model("user", userSchema)

export default User
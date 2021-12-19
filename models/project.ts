const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
    },
    company_name: {
        type: String,
    },
    contact_email: {
        type: String,
    },
}, {
    timestamps: true,
})

const Project = mongoose.model('Task', projectSchema)
export { Project }
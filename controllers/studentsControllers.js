import { body, validationResult } from 'express-validator'

async function getAllStudents(req, res) {
    res.status(200).json({
        message:"get all student success",
        data:   [
            {
            id: 1,
            name: 'John Doe',
            email: 'upchh@example.com'
            },
            {
                id: 3,
                name: 'John Doe1',
                email: 'upchh@example.com'
                },
                {
                    id: 2,
                    name: 'John Doe2',
                    email: 'upchh@example.com'
                    }
        ]
    })
}
async function getStudentById(req, res) {
    res.send('GET student by id')

}
async function updateStudent(req, res) {
    res.send('UPDATE student')

}

export default {
    getAllStudents,
    getStudentById,
    updateStudent
};

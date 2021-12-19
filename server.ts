import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import { Project } from './models/project'
const PORT = 8000;
// rest of the code remains same

const app = express();
const router = express.Router();
app.use(express.json())
app.use(cors())
app.use(router)

//add project
router.post('/project', async function (req, res) {
    try {
        const parse = JSON.parse(req.body.data)
        const data = await new Project({ ...parse })
        await data.save();
        return res.send({ success: true, data })
    } catch (error) {
        res.send({ msg: 'could not add data', success: false })
    }
})

// get all projects
router.get('/projects', async function (req, res) {
    try {
        const data = await Project.find();
        console.log('getall.........', data)
        res.send(data)
    } catch (error) {
        res.send('Something wnet wrong')
    }
})

//get projetc by id
router.get('/project/:id', async function (req, res) {
    const { id } = req.params
    try {
        const data = await Project.findById({ _id: id });
        res.send(data)
    } catch (error) {
        console.log('err46,', error)
        res.send('Something wnet wrong')
    }
})

//update projetc
router.put('/project-update/:id', async function (req, res) {
    const { id } = req.params
    const parse = JSON.parse(req.body.data)
    const updates = Object.keys(parse)
    try {
        const task = await Project.findById({ _id: id })
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach(update => task[update] = parse[update])
        await task.save()
        res.send(task)
    } catch (error) {
        console.log('err60,', error)
        res.send('Something wnet wrong')
    }
})
const uri = 'mongodb://localhost:27017/tasks'
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}
mongoose.connect(uri, mongoOptions as ConnectOptions,
    res => { console.log('mongo db connectes', res) })
// .then(() => { console.log('connected') }).catch(() => {
//     console.log('err ro commect')
// })

// mongoose.Promise = global.Promise;
// mongoose.connect(uri, mongoOptions as ConnectOptions);
// mongoose.connection.on('error', (err) => {
//     console.log('err...', err)
//     console.error(`MongoDB connection error: ${err}`);
//     process.exit(1);
// })

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
}); 
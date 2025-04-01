import {Router} from 'express';
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
import errorMiddleware from "../middleware/error.middleware.js";

const userRouter = Router();

userRouter.get('/',authorize, getUsers);

userRouter.get('/:id',authorize, errorMiddleware, getUser);

userRouter.post('/', (req, res) => {res.send({message: 'create a user'});});

userRouter.put('/:id', (req, res) => {res.send({message: 'update user details'});});

userRouter.delete('/:id', (req, res) => {res.send({message: 'deleting user'});});


export default userRouter;
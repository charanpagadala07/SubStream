import express from 'express';
import {sendreminders} from "../controllers/workflow.controller.js";

const workflow = express.Router();
workflow.use(express.json());


workflow.get("/subscription/reminder", sendreminders );

export default workflow;
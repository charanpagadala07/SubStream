import { Router } from 'express';
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getUserSubscription,
    getSubscriptionDetails,
    updateSubscription,
    deleteSubscription,
    cancelSubscription
} from "../controllers/subscription.controller.js";

const subscriptionRouter = new Router();

// GET all subscriptions
subscriptionRouter.get('/', authorize, getAllSubscriptions);
// GET subscription details by ID
subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

// User-specific routes
// POST a new subscription ( by - USER )
subscriptionRouter.post('/', authorize, createSubscription);
// fetching subscriptions by user ID (personal subscriptions)
subscriptionRouter.get('/user/:id', authorize, getUserSubscription);
// updating a subscription - POST
subscriptionRouter.put('/:id', authorize, updateSubscription);
// DELETE a subscription
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
// cancel a subscription
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);
export default subscriptionRouter;

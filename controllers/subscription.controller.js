import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/Upstash.js";
import {SERVER_URL} from "../config/env.js";

// Create a new subscription
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    } catch (error) {
        next(error);
    }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Get user subscriptions
export const getUserSubscription = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error('User ID doesn’t match');
            error.status = 404;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
        throw error;
    }
};

// Get subscription details
export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;

        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
        throw error;
    }
};

// Update a subscription
export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;

        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;

        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        next(error);
        throw error;
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;

        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;

        }

        await subscription.remove();
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (error) {
        next(error);
        throw error;
    }
};

// Cancel a subscription
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, message: 'Subscription cancelled successfully', data: subscription });
    } catch (error) {
        next(error);
        throw error;
    }
};



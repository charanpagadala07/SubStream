import Subscription from "../models/subscription.model.js";

// Create a new subscription
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json({ success: true, data: subscription });
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
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Get subscription details
export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

// Update a subscription
export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        next(error);
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;
            throw error;
        }

        await subscription.remove();
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Cancel a subscription
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;
            throw error;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, message: 'Subscription cancelled successfully', data: subscription });
    } catch (error) {
        next(error);
    }
};



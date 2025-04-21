import { createRequire} from "module";
import Subscription from "../models/subscription.model.js";
import dayjs  from "dayjs";

const require = createRequire(import.meta.url);

const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1];

export const sendreminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewaldate = dayjs(subscription.renewalDate);

    if(renewaldate.isBefore(dayjs())) {
        console.log("Renewal date has passed away of this subscription. Stopping workflow");
        return
    }

    for(const daysbefore of REMINDERS) {
        const reminderdate = renewaldate.substract(daysbefore, 'day');

        if(reminderdate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysbefore} days before`, reminderdate);
        }

        await triggerReminder(context,`Reminder ${daysbefore} days before` );
    }

});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name mail');
    });
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`sleeping until ${label}ms reminder date: ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`trigger reminder date: ${label}`);
        //send email, sms, notifications.....
    })
}
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price is required'],
    },
    currency:{
        type: Number,
        required: [true, 'Currency is required'],
        enum: ['USD', 'EUR', 'INR'],
        default: 'INR',
    },
    frequency:{
        type: String,
        enum:['monthly', 'quarterly', 'semi-annual', 'yearly']
    },
    category:{
        type: String,
        enum: ['sports', 'news' ,'entertainments','technology','education','devotion'],
        required: [true, 'Category is required'],
    },
    paymentmethod:{
        type: String,
        trim:true,
        required: [true, 'Payment is required'],
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Invalid start date',
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: 'Invalid renewal date',
        }
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, { timestamps: true });


subscriptionSchema.pre('save', async function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            monthly: 30,
            quarterly: 90,
            semi_annual: 180,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
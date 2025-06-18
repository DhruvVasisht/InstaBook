import { Inngest } from "inngest";
import User from "../models/user-model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "instabook" });

//Ingest Function to save user data to database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {id, email_addresses, image_url, first_name, last_name} = event.data.object;
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            image: image_url,
        }

        await User.create(userData);

    }
)

const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        const {id} = event.data.object;
        await User.findByIdAndDelete({_id: id});
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
];


import { checkbox, timestamp } from "@keystone-6/core/fields";

export const paymentFields = {
    paid: checkbox({
        defaultValue: false,
        ui: {
            description: "Has the user paid for premium access?",
        },
    }),
    expirationDate: timestamp({
        ui: {
            description: "When the premium access expires",
        },
    }),
};

export const isPremium = ({ session, item }: { session?: any; item?: any }) => {
    // Check if user is admin or if they have a valid payment
    if (session?.data?.role?.name === "Admin") return true;

    // If checking specific item (User), check their paid status
    if (item) {
        if (item.paid) {
            if (!item.expirationDate) return true; // Lifetime? Or handle as needed. Assuming true for now.
            return new Date(item.expirationDate) > new Date();
        }
        return false;
    }

    // If checking session user
    if (session?.data?.paid) {
        if (!session.data.expirationDate) return true;
        return new Date(session.data.expirationDate) > new Date();
    }

    return false;
};

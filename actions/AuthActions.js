'use server';

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};

    // Validate email
    if (!email || !email.includes('@')) {
        errors.email = "Please enter a valid email address using the @ symbol.";
    }

    // Validate password
    if (!password || password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }

    // Return if errors exist
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    try {
        const hashedPassword = await hashUserPassword(password);
        await createUser(email, hashedPassword);

        return { success: true };
    } catch (error) {
        console.error("Signup error:", error);

        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'It seems like an account for the chosen email already exists.'
                }
            };
        }

        return {
            errors: {
                general: 'Something went wrong. Please try again later.'
            }
        };
    }

    redirect('/training'); 
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { signup } from '@/actions/AuthActions';

export default function AuthForm() {
  const [formState, formAction] = useFormState(signup, { errors: {} });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src="/images/auth-icon.jpg" alt="A lock icon" width={64} height={64} />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </p>

      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((key) => (
            <li key={key}>{formState.errors[key]}</li>
          ))}
        </ul>
      )}

      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account</Link>
      </p>
    </form>
  );
}

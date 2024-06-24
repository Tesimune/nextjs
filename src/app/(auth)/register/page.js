'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { register } = useAuth()

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_code, setPhoneCode] = useState('+234');
    const [phone_number, setPhoneNumber] = useState('8067988642');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault()

        register({
          first_name,
          last_name,
          email,
          phone_code,
          phone_number,
          password,
          password_confirmation: passwordConfirmation,
          setErrors,
          setStatus,
        });
    }

    return (
      <form onSubmit={submitForm}>
        {/* first_name */}
        <div>
          <Label htmlFor="first_name">First Name</Label>

          <Input
            id="first_name"
            type="text"
            value={first_name}
            className="block mt-1 w-full"
            onChange={(event) => setFirstName(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.first_name} className="mt-2" />
        </div>

        {/* last_name */}
        <div>
          <Label htmlFor="last_name">Last Name</Label>

          <Input
            id="last_name"
            type="text"
            value={last_name}
            className="block mt-1 w-full"
            onChange={(event) => setLastName(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.last_name} className="mt-2" />
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/login"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Already registered?
          </Link>

          <Button className="ml-4">Register</Button>
        </div>

        {/* Status Message */}
        {status && <div className="mt-4 text-sm text-green-600">{status}</div>}
      </form>
    );
}

export default Page

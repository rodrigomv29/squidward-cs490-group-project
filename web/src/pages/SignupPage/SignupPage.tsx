// Importing necessary libraries and components
import { useState } from 'react' // useState is a Hook that lets you add React state to function components
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  Link,
  Center
} from "@chakra-ui/react" // Chakra UI components for UI design

// trying to get this to work
import { useAuth } from '@redwoodjs/auth' // Redwood's auth hook for authentication

// Defining the SignupPage component
const SignupPage = () => {
  // useState hooks for holding form inputs and error messages
  // const { signUp } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)

  // Validation function for username
  const validateUsername = (username) => {
    const trimmedUsername = username.trim();
    const isValid = trimmedUsername.length >= 8 && !trimmedUsername.includes(" ");
    setUsernameError(isValid ? null : "The username must be at least 8 characters long and not include spaces.");
    return isValid;
  }

  // Validation function for password
  const validatePassword = (password) => {
    const trimmedPassword = password.trim();
    const hasUpperCase = /[A-Z]/.test(trimmedPassword);
    const hasLowerCase = /[a-z]/.test(trimmedPassword);
    const hasNonAlpha = /[^a-zA-Z]/.test(trimmedPassword);
    const isValid = trimmedPassword.length >= 8 &&
                   !trimmedPassword.includes(" ") &&
                   hasUpperCase &&
                   hasLowerCase &&
                   hasNonAlpha;
    setPasswordError(isValid ? null : "Password must be at least 8 characters long, not include spaces, and must contain at least one uppercase letter, one lowercase letter, and one non-letter character.");
    return isValid;
  }

  // Validation function for confirmation password
  const validateConfirmPassword = (password, confirmPassword) => {
    const isValid = password === confirmPassword;
    setConfirmPasswordError(isValid ? null : "The confirmation password must match the original password.");
    return isValid;
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validation checks before sign up
    if (!usernameError && !passwordError && !confirmPasswordError) {
      try {
        await signUp({ username, password }) // calls the signUp function from useAuth
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    // A Stack is a layout component from Chakra UI.
    //This can be changed depending on what the team wants.
    <VStack
      direction="column"
      spacing={6}
      width="300px"
      margin="auto"
      mt={12}
      p={4}
      boxShadow="md"
      borderRadius="md"
      bg="white"
    >
      <Center>
        <Heading as="h2" size="lg">Squidward News</Heading>
      </Center>

      {/* FormControls for username, password, and confirmation password.
      Each FormControl consists of a label, an input field, and an error message */}

      <FormControl id="username" isRequired isInvalid={!!usernameError}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            validateUsername(e.target.value);
          }}
        />
        <FormErrorMessage>{usernameError}</FormErrorMessage>
      </FormControl>

      <FormControl id="password" isRequired isInvalid={!!passwordError}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>

      <FormControl id="confirmPassword" isRequired isInvalid={!!confirmPasswordError}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(password, e.target.value);
          }}
        />
        <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
      </FormControl>

      {/* Sign Up Button */}
      <Button onClick={handleSubmit} width="full" colorScheme="blue" variant="outline">
        Sign Up
      </Button>

      {/* Link to forgot password page */}
      <Center>
        <Link href="#">Forgot password?</Link>
      </Center>
    </VStack>
  )
}

// export the SignupPage component so it can be used elsewhere
export default SignupPage

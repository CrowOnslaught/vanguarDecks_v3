import { Button as ChackraButton } from '@chakra-ui/react'

interface ButtonProps {
  children: React.ReactNode;
  size?: string;
}

export const Button = ({ children, size }:ButtonProps) => {
  return (
    <ChackraButton color="gray.100" bg="purple.600" size={size ? size : 'md'}>
      {children}
    </ChackraButton>
  )
}

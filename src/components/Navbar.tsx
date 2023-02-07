import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { Outlet, Link as RouterLink } from "react-router-dom"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue("teal.800", "gray.900")
  return (
    <div>
      <Box
        w='full'
        bg={bg}
        p='5'
        display={"flex"}
        justifyContent='space-between'
      >
        <HStack gap={10}>
          <Heading
            as={RouterLink}
            bgGradient='linear(to-tr, cyan.600, teal.300)'
            bgClip={"text"}
            to='/'
          >
            Quizler
          </Heading>
          <Link as={RouterLink} color='gray.300' fontSize={20} to='/editor'>
            Editor
          </Link>
          <Link as={RouterLink} color='gray.300' fontSize={20} to='/about'>
            About
          </Link>
        </HStack>
        <IconButton
          onClick={toggleColorMode}
          aria-label='change current color theme'
          colorScheme={"teal"}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
      </Box>
      <Outlet />
    </div>
  )
}

export default Navbar

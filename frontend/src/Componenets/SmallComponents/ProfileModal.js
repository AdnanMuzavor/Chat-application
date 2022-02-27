import React from 'react'
import { IconButton, useDisclosure ,Modal,ModalOverlay,ModalHeader,ModalCloseButton,ModalBody,ModalConten,Button,ModalContent} from '@chakra-ui/react'
import {ViewIcon} from '@chakra-ui/icons'
import {ModalFooter} from '@chakra-ui/react'
const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return children?<span onClick={onOpen}>{children}</span>:
  (<>
      <IconButton
          d={{base:"flex"}}
          icon={<ViewIcon/>}
          onClick={onOpen}
          >
      </IconButton>
       <Button onClick={onOpen}>Open Modal</Button>

       <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Modal Title</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
             modal here
           </ModalBody>
 
          <ModalFooter>
             <Button colorScheme='blue' mr={3} onClick={onClose}>
               Close
             </Button>
             <Button variant='ghost'>Secondary Action</Button>
           </ModalFooter>
         </ModalContent>
       </Modal></>
  )
        
  
}

export default ProfileModal
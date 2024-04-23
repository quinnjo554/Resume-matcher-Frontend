import { useUpdateUser } from '@/hooks/user/user-hooks';
import User from '@/models/user/User'
import UserRequest from '@/models/user/UserRequest';
import { IconButton, Input, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, useTheme, InputLeftAddon, Button, Text, ModalOverlay, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiX, FiUser, FiMail, FiImage } from 'react-icons/fi'

function EditUserModal({ user, isOpen, onClose }: { user: User, isOpen: boolean, onClose: () => void }) {
  const [pfpValue, setPfpValue] = useState(user.pfp);
  const [userNameValue, setUserNameValue] = useState(user.username);

  const handleChangePfp = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setPfpValue(value);
  };

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setUserNameValue(value);
  };

  const handleSubmit = async () => {
    const userToUpdate: UserRequest = {
      userName: userNameValue,
      pfp: pfpValue,
      email: user.email
    }
    await useUpdateUser(Number(user.id), userToUpdate)
  };



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent bg='white' shadow='xl' rounded='lg' border='0'>
          <ModalHeader fontSize='lg' fontWeight='bold' color='black' roundedTop='lg'>
            Edit User
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody p={6}>
            <VStack spacing={4} align='stretch'>
              <Text fontSize='md' fontWeight='semibold'>Username</Text>
              <Input placeholder='Username' value={userNameValue} variant='filled' _focus={{ bg: 'blue.100' }} />

              <Text fontSize='md' fontWeight='semibold'>Profile Picture URL</Text>
              <Input onChange={handleChangePfp} placeholder='Profile Picture URL' value={pfpValue} variant='filled' _focus={{ bg: 'blue.100' }} />
            </VStack>
          </ModalBody>
          <ModalFooter bg='gray.100' roundedBottom='lg'>
            <Button colorScheme='blue' onClick={handleSubmit} shadow='md' _hover={{ bg: 'blue.600' }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default EditUserModal

import { Box, Center, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import AwardGif from '../../../public/AwardAnimation.json'
import Lottie from "lottie-react";
import Candidate from '@/models/candidates/Candidates';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FiX } from 'react-icons/fi';
import Job from '@/models/job/job';
import { useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks';
function CandidateAwardModal({ job }: { job: Job }) {

  const { onClose } = useDisclosure()
  const [isNewJob, setIsNewJob] = useState(JSON.parse(localStorage.getItem('isNewJob') || "false")); //using this
  const [isConfetti, setIsConfetti] = useState(JSON.parse(localStorage.getItem('isNewJob') || "false")); //using this

  const { data: candidates, isError } = useCandidatesByJobId(Number(job.id));

  const sortedCandidates = candidates ? [...candidates].sort((a, b) => b.resume_score - a.resume_score) : [];
  const candidate = sortedCandidates[0];

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  };

  setTimeout(() => {
    setIsConfetti(false);
  }, 5000);

  function handleClose() {
    setIsNewJob(localStorage.setItem('isNewJob', JSON.stringify(false)));
    onClose();
  }
  return (candidate && (
    <Modal isOpen={isNewJob} onClose={onClose} >
      {isConfetti && <Confetti />}
      <motion.div
        className="bg-gradient-to-r from-purple-500 absolute top-[10%] left-[40%] to-pink-500 rounded-lg text-center p-8 shadow-2xl transform transition-all sm:max-w-lg sm:w-full"
        initial="hidden"
        animate="visible"
        variants={modalVariants}
        transition={{ duration: 1.5 }}
      >
        <IconButton onClick={() => handleClose()} aria-label='modal-close-button' icon={<FiX />} />
        <ModalHeader className="text-3xl font-bold mb-4 text-white">🏆 And the Top Candidate is...</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center">
            <Lottie height="200" animationData={AwardGif} />
            <Text className="text-2xl font-bold mt-4 text-white">{candidate.name}</Text>
            <Text className="text-md mt-2 text-gray-200">{candidate.resume_score_description}</Text>
            {candidate.contact && <Text className="text-sm mt-2 text-gray-400">{candidate.contact}</Text>}
          </div>
          <Box
            className="flex justify-center items-center rounded-lg p-4 shadow-lg mt-4"
          >
            <Text className="text-lg font-bold text-white">This might take a few seconds. Thank you for your patience.</Text>
          </Box>
        </ModalBody>
      </motion.div>
    </Modal>
  ))
}

export default CandidateAwardModal

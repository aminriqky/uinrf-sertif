import React, { useState, useEffect } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl,
  ModalBody, ModalFooter, Button, Text, Flex, Icon, useMediaQuery, Link
} from "@chakra-ui/react";
import { FcImageFile } from 'react-icons/fc';

function Detail(props) {
  const [data, setData] = useState(null);
  const [saveFile, setSaveFile] = useState(null);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

  useEffect(() => {
    setData(props.sendData);
    if (data !== null) {
      linkUnduh();
    }
  }, [props.sendData, data]);

  async function linkUnduh() {
    const unduh = await fetch(`api/prodi/${data.id}`);
    const jsonData = await unduh.json();
    setSaveFile(`storage/${jsonData[0].download_link}`);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.open} onClose={props.close}>
        <ModalOverlay />
        {
          data !== null &&
          <React.Fragment>
            {
              isLargerThan1280 ?
                <ModalContent maxW="550px" h="260px" alignSelf="center">
                  <ModalHeader>
                    Detail Sertifikat
                  </ModalHeader>
                  <ModalCloseButton mt="2" mr="4" />
                  <ModalBody>
                    <Flex flexDir="row" my="2">
                      <Icon mr="5" boxSize="90" as={FcImageFile} />
                      <Flex flexDir="column">
                        <Text mb="2" fontWeight="semibold" mr="2">Nama Dokumen</Text>
                        <Text mb="2" fontWeight="semibold" mr="2">Akreditasi</Text>
                        <Text mb="2" fontWeight="semibold" mr="2">Masa Berlaku</Text>
                      </Flex>
                      <Flex flexDir="column">
                        <Text mb="2" fontWeight="normal" maxW="200" isTruncated>: {data.nama}</Text>
                        <Text mb="2" fontWeight="normal" maxW="200" isTruncated>: {data.akreditasi}</Text>
                        <Flex flexDir="row">
                          <Text mb="2" fontWeight="normal">: {data.awal_berlaku}</Text>
                          <Text mb="2" mx="2" fontWeight="normal">s/d</Text>
                          <Text mb="2" fontWeight="normal">{data.akhir_berlaku}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button flex="1" colorScheme="teal">
                      <Link _focus={{ textDecor: "none" }} flex="1" _hover={{ textTransform: "none" }} href={saveFile} download >
                        Unduh
                      </Link>
                    </Button>
                  </ModalFooter>
                </ModalContent>
                :
                <ModalContent h="450px" alignSelf="center">
                  <ModalHeader>
                    Detail Sertifikat
                  </ModalHeader>
                  <ModalCloseButton mt="2" mr="4" />
                  <ModalBody>
                    <Flex flexDir="column">
                      <Flex justifyContent="center">
                        <Icon mr="5" mb="5" boxSize="90" as={FcImageFile} />
                      </Flex>
                      <Flex flexDir="column">
                        <Text mb="2" fontWeight="semibold" mr="2">Nama Dokumen :</Text>
                        <Text mb="2" fontWeight="normal" maxW="400" isTruncated>{data.nama}</Text>
                        <Text mb="2" fontWeight="semibold" mr="2">Akreditasi :</Text>
                        <Text mb="2" fontWeight="normal" maxW="400" isTruncated>{data.akreditasi}</Text>
                        <Text mb="2" fontWeight="semibold" mr="2">Masa Berlaku :</Text>
                        <Flex flexDir="row">
                          <Text mb="2" fontWeight="normal">{data.awal_berlaku}</Text>
                          <Text mb="2" mx="2" fontWeight="normal">s/d</Text>
                          <Text mb="2" fontWeight="normal">{data.akhir_berlaku}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button flex="1" colorScheme="teal">
                      Unduh
                    </Button>
                  </ModalFooter>
                </ModalContent>
            }
          </React.Fragment>
        }
      </Modal>
    </React.Fragment>
  );
}

export default Detail;
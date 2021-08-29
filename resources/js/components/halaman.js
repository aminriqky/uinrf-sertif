import React, { useState, useEffect } from "react";
import {
  chakra, Flex, useColorModeValue, Icon, Image, Tab, AccordionButton, AccordionItem, useDisclosure, Alert, AlertTitle,
  Tabs, TabList, TabPanel, TabPanels, Text, Link, Accordion, AccordionPanel, AccordionIcon, AlertIcon, AlertDescription
} from "@chakra-ui/react";
import { FcClock } from "react-icons/fc";
import { FaBookmark, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import Detail from "./detail";
import Survey from "./survey";

const date = new Date();

function Halaman() {
  const bg = useColorModeValue("green.300", "grey.100");
  const [dateTime, setDateTime] = useState({
    date: date.toDateString("id-ID"),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });
  const [dataUniv, setDataUniv] = useState(null);
  const { isOpen: isFirstModalOpen, onOpen: onFirstModalOpen, onClose: onFirstModalClose } = useDisclosure();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataUniv === null) {
      axios.get(`api/prodi/all`)
        .then(res => {
          const univ = res.data;
          setDataUniv(univ);
        })
    }
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime({
        date: date.toDateString(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <React.Fragment>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a href="/" title="Sertif Home Page" display="flex" alignItems="center">
              <Image
                bg="transparent" pos={{ base: "relative", xl: "absolute" }} ml={{ base: 3, xl: 9 }}
                objectFit="fill" maxW={{ base: 70, xl: 35 }} src={require('./uinrf.png')}
              />
              <chakra.h1
                ml={{ base: 5, xl: "85px" }} color="white" letterSpacing="wider"
                alignSelf="center" fontWeight="semibold"
              >
                <Flex flexDir="row" flexWrap="wrap">
                  <Text fontWeight="md" color="blue.700">
                    E-MANAJEMEN
                  </Text>
                  &thinsp;
                  <Text fontWeight="normal">
                    SERTIFIKAT AKREDITASI
                  </Text>
                </Flex>
              </chakra.h1>
            </chakra.a>
          </Flex>
          <Flex color="white" mr={{ base: 2, xl: 8 }}>
            <Text textAlign="right" fontWeight="thin" >
              {dateTime.date}
              <Icon color="black" as={FcClock} mx={{ base: 3, xl: 2 }} alignSelf="center" />
              {dateTime.hours.toLocaleString('id-ID', { minimumIntegerDigits: 2, useGrouping: false })}:
              {dateTime.minutes.toLocaleString('id-ID', { minimumIntegerDigits: 2, useGrouping: false })}:
              {dateTime.seconds.toLocaleString('id-ID', { minimumIntegerDigits: 2, useGrouping: false })} WIB
            </Text>
          </Flex>
        </Flex>
      </chakra.header>
      <Alert flexDir="column" status="info">
        <AlertIcon />
        <AlertTitle mr={2}>Assalamualaikum</AlertTitle>
        <AlertDescription>
          Selamat Datang di Website E-Manajemen Sertifikat Akreditasi - UIN Raden Fatah Palembang
        </AlertDescription>
      </Alert>
      <chakra.section my="50" justifyContent="center">
        <Tabs borderRadius="10" p="5" mx={{ base: 3, xl: 10 }} variant="soft-rounded" colorScheme="green" bg="white">
          <TabList>
            <Tab>Universitas</Tab>
            <Tab>Program Studi</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex bg="green.100" color="green.100" border="1px" borderTopRadius="5px" mt="2%">
                <Icon ml="2%" color="teal" as={FaBookmark} w="20px" h="auto" mr="20px" />
                <Text textColor="teal" my="10px" fontSize="xl" fontWeight="thin">
                  Sertifikat Akreditasi Universitas
                </Text>
              </Flex>
              {
                dataUniv !== null && dataUniv.map((item) => {
                  if (item.fakultas === "option1") {
                    return (
                      <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                        <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)} color="green.100" borderX="1px" borderBottom="1px">
                          <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                          <Text textColor="black" my="2.5px" fontWeight="thin">
                            {item.nama}
                          </Text>
                          <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                        </Flex>
                      </Link>
                    )
                  }
                })
              }
              <Flex h="5px" bg="green.100" borderBottomRadius="5px" />
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Ilmu Sosial & Politik
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Komunikasi
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu komunikasi") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Politik
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu politik") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Sains & Teknologi
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Sistem Informasi
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "sistem informasi") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Biologi
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "biologi") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Kimia
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "kimia") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Adab & Humaniora
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Sejarah Peradaban Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "sejarah peradaban islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Perpustakaan
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu perpustakaan") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        D2 Ilmu Perpustakaan
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "d2 ilmu perpustakaan") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Bahasa dan Sastra Inggris
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "bahasa dan sastra inggris") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Bahasa dan Sastra Arab
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "bahasa dan sastra arab") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Ilmu Tarbiyah & Keguruan
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Keguruan & Pendidikan
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "keguruan & pendidikan") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Agama Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu agama islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Bahasa Inggris
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan bahasa inggris") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Matematika
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan matematika") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Biologi
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan biologi") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Kimia
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan kimia") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Fisika
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan fisika") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Ushuludin & Pemikiran Islam
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Studi Agama-Agama
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "studi agama-agama") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Aqidah & Filsafat Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "aqidah & filsafat islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Al-Quran & Tafsir
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu al-quran & tafsir") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ilmu Hadis
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ilmu hadis") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Tasawuf & Psikoterapi
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "tasawuf & psikoterapi") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Magister Ilmu Al-Quran & Tafsir
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "magister ilmu al-quran & tafsir") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Ekonomi & Bisnis Islam
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Perbankan Syariah
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "perbankan syariah") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Ekonomi Syariah
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "ekonomi syariah") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Manajemen Zakat dan Wakaf
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "manajemen zakat dan wakaf") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Fakultas Dakwah & Komunikasi
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Komunikasi Penyiar Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "komunikasi penyiar islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Jurnalistik
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "jurnalistik") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Bimbingan Penyuluhan Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "bimbingan penyuluhan islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex flexDir="column" p="5">
                <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
                  Program Pasca Sarjana
                </Text>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Pendidikan Agama Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "pendidikan agama islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Peradaban Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "peradaban islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Flex flex="1" textAlign="left" color="teal">
                        Studi Islam
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} flexWrap="wrap">
                      {
                        dataUniv !== null && dataUniv.map((item) => {
                          if (item.program_studi.toLowerCase() === "studi islam") {
                            return (
                              <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onFirstModalOpen}>
                                <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => setData(item)}>
                                  <Icon ml="2%" color="teal" as={FaFileAlt} w="17px" h="auto" mr="17px" />
                                  <Text textColor="black" my="2.5px" fontWeight="thin">
                                    {item.nama}
                                  </Text>
                                  <Icon ml="auto" color="teal" as={FaExternalLinkAlt} w="17px" mr="2%" h="auto" />
                                </Flex>
                              </Link>
                            )
                          }
                        })
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </chakra.section>
      <Detail sendData={data} open={isFirstModalOpen} close={onFirstModalClose} />
      <Survey />
    </React.Fragment>
  );
}

export default Halaman;
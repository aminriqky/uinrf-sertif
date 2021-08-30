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

function Prodi(props) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex flex="1" textAlign="left" color="teal">
          {props.nama}
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} flexWrap="wrap">
        {
          props.dataUniv !== null && props.dataUniv.map(item => {
            if (item.program_studi.toLowerCase() === props.nama.toLowerCase()) {
              return (
                <Link key={item.id} _hover={{ textDecor: "none" }} onClick={props.onOpen}>
                  <Flex _hover={{ bg: "green.50" }} py="5px" onClick={() => props.setData(item)}>
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
  );
}

function Fakultas(props) {
  return (
    <Flex flexDir="column" p="5">
      <Text textColor="black" my="2.5px" fontWeight="semibold" mb="3">
        {props.nama}
      </Text>
      <Accordion allowToggle>
        {props.children}
      </Accordion>
    </Flex>
  );
}

function Halaman() {
  const bg = useColorModeValue("green.300", "grey.100");
  const [dateTime, setDateTime] = useState({
    date: date.toDateString("id-ID"),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });
  const [dataUniv, setDataUniv] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                  if (item.fakultas === "UIN Raden Fatah") {
                    return (
                      <Link key={item.id} _hover={{ textDecor: "none" }} onClick={onOpen}>
                        <Flex _hover={{ bg: "green.50" }} onClick={() => setData(item)}
                          color="green.100" borderX="1px" borderBottom="1px" py="5px">
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
              <Fakultas nama="Fakultas Ilmu Sosial & Ilmu Politik">
                <Prodi nama="Ilmu Komunikasi" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ilmu Politik" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Sains & Teknologi">
                <Prodi nama="Sistem Informasi" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Biologi" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Kimia" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Adab & Humaniora">
                <Prodi nama="Sejarah Peradaban Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ilmu Perpustakaan" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="D2 Ilmu Perpustakaan" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Bahasa dan Sastra Inggris" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Bahasa dan Sastra Arab" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Ilmu Tarbiyah & Keguruan">
                <Prodi nama="Keguruan & Pendidikan" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ilmu Agama Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Pendidikan Bahasa Inggris" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Pendidikan Matematika" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Pendidikan Biologi" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Pendidikan Kimia" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Pendidikan Fisika" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Ushuludin & Pemikiran Islam">
                <Prodi nama="Studi Agama-Agama" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Aqidah & Filsafat Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ilmu Al-Quran & Tafsir" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ilmu Hadis" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Tasawuf & Psikoterapi" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Magister Ilmu Al-Quran & Tafsir" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Ekonomi & Bisnis Islam">
                <Prodi nama="Perbankan Syariah" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Ekonomi Syariah" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Manajemen Zakat dan Wakaf" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Fakultas Dakwah & Komunikasi">
                <Prodi nama="Komunikasi Penyiar Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Jurnalistik" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Bimbingan Penyuluhan Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
              <Fakultas nama="Program Pasca Sarjana">
                <Prodi nama="Pendidikan Agama Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Peradaban Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
                <Prodi nama="Studi Islam" dataUniv={dataUniv} onOpen={onOpen} setData={setData} />
              </Fakultas>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </chakra.section>
      <Detail sendData={data} open={isOpen} close={onClose} />
      <Survey />
    </React.Fragment>
  );
}

export default Halaman;
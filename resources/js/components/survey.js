import React, { useState, useEffect } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, FormControl, Textarea,
  ModalBody, ModalFooter, Button, Input, FormLabel, Text, Select,
  NumberInputField, NumberInput, useDisclosure, useToast
} from "@chakra-ui/react";
import { useFormFields } from './hooksLib';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Survey() {
  const [fields, handleFieldChange] = useFormFields({
    nama: "",
    pekerjaan: "",
    fakultas: "",
    prodi: "",
    ipk: null,
    lama_studi: null,
    angkatan: null,
    keperluan_sertif: ""
  });
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();
  const [state, setState] = useState(false);
  const toast = useToast();

  useEffect(() => {
    onSecondModalOpen();
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    setState(true);
    if (fields.pekerjaan !== "Dosen") {
      if (
        fields.nama === "" || fields.angkatan === null ||
        fields.fakultas === "" || fields.prodi === "" ||
        fields.ipk === null || fields.lama_studi === null ||
        fields.keperluan_sertif === "" || fields.ipk > 4 ||
        fields.lama_studi > 20
      ) {
        wait(1000).then(() => {
          setState(false);
          toast({
            title: "Error Input",
            description: "Pastikan Input Sesuai",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          })
        });
      }
      else {
        axios.post(`api/soal/post`,
          {
            nama: fields.nama, pekerjaan: fields.pekerjaan, fakultas: fields.fakultas, prodi: fields.prodi, ipk: fields.ipk,
            lama_studi: fields.lama_studi, angkatan: fields.angkatan, keperluan_sertif: fields.keperluan_sertif
          }
        ).then(() => {
          onSecondModalClose()
          toast({
            title: "Data Berhasil Di-Input",
            description: "Silahkan Unduh File Anda",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          })
        });
      }
    }
    else if (fields.pekerjaan === "Dosen") {
      if (
        fields.nama === "" || fields.fakultas === "" ||
        fields.prodi === "" || fields.keperluan_sertif === ""

      ) {
        wait(1000).then(() => {
          setState(false);
          toast({
            title: "Error Input",
            description: "Pastikan Input Sesuai",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          })
        });
      }
      else {
        axios.post(`api/soal/post`,
          {
            nama: fields.nama, pekerjaan: fields.pekerjaan, fakultas: fields.fakultas, prodi: fields.prodi, ipk: fields.ipk,
            lama_studi: fields.lama_studi, angkatan: fields.angkatan, keperluan_sertif: fields.keperluan_sertif
          }
        ).then(() => {
          onSecondModalClose()
          toast({
            title: "Data Berhasil Di-Input",
            description: "Silahkan Unduh File Anda",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          })
        });
      }
    }
  }

  return (
    <React.Fragment>
      <Modal scrollBehavior="inside" closeOnOverlayClick={false} isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
        <ModalOverlay />
        <ModalContent alignSelf="center">
          <ModalHeader>
            <Text>Form Survei</Text>
            <Text mt="2" fontSize="sm" fontWeight="normal">
              Silahkan isi form dahulu sesuai dengan data diri anda.
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="nama" onChange={handleFieldChange}>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input placeholder="Nama Lengkap" />
            </FormControl>
            <FormControl mt={4} id="fakultas" onChange={handleFieldChange}>
              <FormLabel>Fakultas</FormLabel>
              <Select placeholder="Fakultas">
                <option value="Ilmu Sosial & Politik">Ilmu Sosial & Politik</option>
                <option value="Ilmu Tarbiyah & Keguruan">Ilmu Tarbiyah & Keguruan</option>
                <option value="Sains & Teknologi">Sains & Teknologi</option>
                <option value="Ushuluddin & Pemikiran Islam">Ushuluddin & Pemikiran Islam</option>
                <option value="Adab & Humaniora">Adab & Humaniora</option>
                <option value="Ekonomi & Bisnis Islam">Ekonomi & Bisnis Islam</option>
                <option value="Dakwah & Komuikasi">Dakwah & Komuikasi</option>
                <option value="Pasca Sarjana">Pasca Sarjana</option>
              </Select>
            </FormControl>
            <FormControl mt={4} id="prodi" onChange={handleFieldChange}>
              <FormLabel>Program Studi</FormLabel>
              <Input placeholder="Program Studi" />
            </FormControl>
            <FormControl mt={4} id="pekerjaan" onChange={handleFieldChange}>
              <FormLabel>Pekerjaan</FormLabel>
              <Select placeholder="Pekerjaan">
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Alumni">Alumni</option>
                <option value="Dosen">Dosen</option>
              </Select>
            </FormControl>
            {
              fields.pekerjaan !== "Dosen" &&
              <React.Fragment>
                <FormControl mt={4} id="ipk" onChange={handleFieldChange}>
                  <FormLabel>IPK</FormLabel>
                  <NumberInput precision={2}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl mt={4} id="lama_studi" onChange={handleFieldChange}>
                  <FormLabel>Lama Studi / Semester</FormLabel>
                  <NumberInput>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl mt={4} id="angkatan" onChange={handleFieldChange}>
                  <FormLabel>Angkatan</FormLabel>
                  <NumberInput>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </React.Fragment>
            }
            <FormControl mt={4} id="keperluan_sertif" onChange={handleFieldChange}>
              <FormLabel>Keperluan Sertifikat</FormLabel>
              <Textarea placeholder="Keperluan Sertifikat" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={state} onClick={handleSubmit} flex="1" colorScheme="teal">
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default Survey;
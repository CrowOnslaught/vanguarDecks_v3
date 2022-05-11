import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Select,
  Stack,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Box,
  Grid,
} from "@chakra-ui/react";
import { APIFilters } from "helpers/filters";

interface FiltersModalProps {
  filters: APIFilters;
  setFilter: (key: string, value: string) => void;
  types: string[];
  clans: string[];
}

export const FiltersModal = ({
  filters,
  setFilter,
  types,
  clans,
}: FiltersModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(filters);

  return (
    <>
      <Button onClick={onOpen}>Filters</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        scrollBehavior="inside"
        isCentered>
        <ModalOverlay />
        <ModalContent minHeight={["100vh", "auto"]}>
          <ModalCloseButton />
          <ModalHeader>Filters</ModalHeader>
          <ModalBody>
            <FormControl as="fieldset">
              <FormLabel as="legend">Order by</FormLabel>
              <Flex gap="4">
                <Select
                  placeholder="Order by"
                  onChange={e => {
                    setFilter("sort", e.target.value);
                  }}>
                  <option value="name" selected>
                    Name
                  </option>
                  <option value="card_id">Card Id</option>
                  <option value="power">Power</option>
                  <option value="shield">Shield</option>
                </Select>
                <Stack direction="row" spacing={2}>
                  <Button
                    disabled={!!(filters.sort && filters.sort.includes("asc"))}
                    leftIcon={<ChevronUpIcon />}
                    bg="purple.600"
                    onClick={() => {
                      setFilter(
                        "sort",
                        `${filters.sort?.split(",")[0] || "name"},asc`
                      );
                    }}>
                    Asc.
                  </Button>
                  <Button
                    disabled={!!(filters.sort && filters.sort.includes("desc"))}
                    leftIcon={<ChevronDownIcon />}
                    bg="purple.600"
                    onClick={() => {
                      setFilter(
                        "sort",
                        `${filters.sort?.split(",")[0] || "name"},desc`
                      );
                    }}>
                    Desc.
                  </Button>
                </Stack>
              </Flex>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Types</FormLabel>
              <Grid templateColumns="1fr 1fr">
                {types.map((type, index) => (
                  <Checkbox key={index}>{type}</Checkbox>
                ))}
              </Grid>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Clans</FormLabel>
              <Grid templateColumns="1fr 1fr">
                {clans.map((clan, index) => (
                  <Checkbox key={index}>{clan}</Checkbox>
                ))}
              </Grid>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button size="lg" variant="outline">
                Reset filters
              </Button>
              <Button size="lg" bg="purple.600" mr={3} onClick={onClose}>
                Apply filters
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

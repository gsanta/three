import React, { useEffect } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '../../../common/components/Dialog';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { setCanvasSize } from '../state/settingsSlice';
import { useForm } from 'react-hook-form';

const ResizeCanvasDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const canvasSize = useAppSelector((state) => state.settings.canvasSize);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      width: String(canvasSize.width),
      height: String(canvasSize.height),
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ width: String(canvasSize.width), height: String(canvasSize.height) });
    }
  }, [isOpen, canvasSize, reset]);

  const onSubmit = handleSubmit((values) => {
    dispatch(setCanvasSize({ width: Number(values.width), height: Number(values.height) }));
    onClose();
  });

  return (
    <Dialog as="form" isOpen={isOpen} onClose={onClose} title="Resize canvas" onSubmit={onSubmit}>
      <DialogBody paddingInline="5">
        <FormControl display="flex" flexDirection="column" marginTop="4">
          <FormLabel size="xs">width</FormLabel>
          <InputGroup size="sm">
            <Input {...register('width')} autoFocus size="sm" paddingRight="20px" type="number" />
            <InputRightAddon pointerEvents="none" color="gray.300">
              tiles
            </InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl display="flex" flexDirection="column" marginTop="4">
          <FormLabel size="xs">height</FormLabel>
          <InputGroup size="sm">
            <Input {...register('height')} size="sm" paddingRight="20px" type="number" />
            <InputRightAddon pointerEvents="none" color="gray.300">
              tiles
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" colorScheme="orange" type="submit">
          Resize
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ResizeCanvasDialog;

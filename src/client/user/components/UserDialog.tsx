import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

const UserDialog = () => {
  const closeDialog = () => {
    const dialog = document.getElementById('user-dialog') as HTMLDialogElement;
    dialog.close();
  };

  const { data } = useSession();

  const {
    mutateAsync: mutateDeleteUser,
    isError: isDeleteUserError,
    isPending: isDeleteUserLoading,
  } = useMutation<unknown, AxiosError<unknown>, unknown>({
    mutationFn: async () => {
      const resp = await api.delete(usersPath);

      return resp;
    },
    onSuccess: () => {
      closeDialog();
    },
  });

  return (
    <dialog id="user-dialog" className="modal">
      <div className="modal-box bg-base-200">
        <h3 className="text-lg font-bold">User</h3>
        <div className="divider" />

        <div className="flex justify-center items-center gap-4">
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              <span>{data?.user?.email}</span>
            </div>
          </div>
          <p className="max-w-[200px]">{data?.user?.email}</p>
        </div>
        <fieldset className="fieldset">
          <button className={`btn btn-primary`} onClick={mutateDeleteUser}>
            {isDeleteUserLoading ? <span className="loading loading-spinner" /> : `Sign up`}
          </button>
          {isDeleteUserError && <p className="fieldset-label text-error">Failed to delete user</p>}
        </fieldset>
      </div>
    </dialog>
  );
};

export default UserDialog;

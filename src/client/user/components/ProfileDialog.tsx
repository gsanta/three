import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const ProfileDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const { data: session } = useSession();

  const {
    mutateAsync: mutateDeleteUser,
    error: deleteUserError,
    isPending: isDeleteUserLoading,
  } = useMutation<unknown, AxiosError<ServerError>, unknown>({
    mutationFn: async () => {
      const resp = await api.delete(usersPath(session?.user.id || ''));

      return resp;
    },
    onSuccess: async () => {
      await signOut({ redirect: false });
      props.onClose?.();
    },
  });

  return (
    <Dialog
      {...props}
      id="profile-dialog"
      error={deleteUserError}
      errorMessageFallback="Failed to delete user profile. "
      leftAction={
        <button className="btn btn-warning max-w-[8rem]" onClick={mutateDeleteUser}>
          {isDeleteUserLoading ? <span className="loading loading-spinner" /> : `Delete profile`}
        </button>
      }
      title="Profile"
    >
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table table-fixed">
          <tbody>
            <tr>
              <th className="w-[30%]">Email</th>
              <td className="text-ellipsis whitespace-nowrap overflow-hidden">{session?.user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;

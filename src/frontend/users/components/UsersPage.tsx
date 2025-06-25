"use client";

import { CreateUserModal } from "@/frontend/users/components/modals/CreateUserModal";
import { useGetUsers } from "@/frontend/users/hooks/useGetUsers";
import { usePagination } from "@/frontend/hooks/usePagination";
import { LoadingBox } from "@/frontend/components/ui/LoadingBox";
import { ErrorBox } from "@/frontend/components/ui/ErrorBox";
import { UsersList } from "@/frontend/users/components/UsersList";

export const UsersPage = () => {
  const { pageIndex, pageSize, setPagination } = usePagination({
    initialPageSize: 10,
  });
  const { data, isLoading, isError, error } = useGetUsers({
    page: pageIndex + 1,
    pageSize,
  });

  if (isError) {
    return <ErrorBox message={error?.message} />;
  }

  if (isLoading || !data) {
    return <LoadingBox />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <CreateUserModal />
      </div>
      <UsersList
        initialData={data}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
      />
    </div>
  );
};

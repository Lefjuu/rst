"use client";

import { DataTable, TableColumn } from "@/frontend/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { User } from "@prisma/client";
import { PaginatedResult } from "@/backend/utils/pagination";
import { UserActions } from "@/frontend/users/components/UserActions";

interface UsersListProps {
  initialData: PaginatedResult<User>;
  pageIndex: number;
  pageSize: number;
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

export const UsersList = ({
  initialData,
  pageIndex,
  pageSize,
  setPagination,
}: UsersListProps) => {
  const router = useRouter();

  const columns: TableColumn<User>[] = [
    { id: "id", label: "ID" },
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
  ];

  const handleUserDeleted = useCallback(() => {}, []);

  return (
    <DataTable<User>
      columns={columns}
      data={initialData.data}
      page={pageIndex + 1}
      rowsPerPage={pageSize}
      totalCount={initialData.total}
      onPageChange={(newPage) =>
        setPagination((prev: { pageIndex: number; pageSize: number }) => ({
          ...prev,
          pageIndex: newPage - 1,
        }))
      }
      onRowsPerPageChange={(newPageSize) =>
        setPagination((prev: { pageIndex: number; pageSize: number }) => ({
          ...prev,
          pageSize: newPageSize,
        }))
      }
      renderActions={(row) => (
        <UserActions user={row} onDeleted={handleUserDeleted} />
      )}
      onRowClick={(row) => router.push(`/users/${row.id}/addresses`)}
    />
  );
};

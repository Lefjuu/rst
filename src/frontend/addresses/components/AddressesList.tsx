"use client";

import { useParams } from "next/navigation";
import { useGetAddresses } from "@/frontend/addresses/hooks/useGetAddresses";
import { DataTable, TableColumn } from "@/frontend/components/ui/DataTable";
import { UserAddress } from "@prisma/client";
import { AddressActions } from "@/frontend/addresses/components/AddressActions";
import { usePagination } from "@/frontend/hooks/usePagination";

const AddressesList = () => {
  const params = useParams();
  const user_id = parseInt(params.userId as string);

  const { pageIndex, pageSize, setPagination } = usePagination({
    initialPageSize: 10,
  });

  const { data } = useGetAddresses({
    user_id,
    page: pageIndex + 1,
    pageSize,
  });

  const columns: TableColumn<UserAddress>[] = [
    { id: "address_type", label: "Type" },
    { id: "street", label: "Street" },
    { id: "building_number", label: "Building" },
    { id: "city", label: "City" },
    { id: "post_code", label: "Postal Code" },
    { id: "country_code", label: "Country" },
    {
      id: "valid_from",
      label: "Valid From",
      render: (value: string | number | Date) => {
        if (value instanceof Date) {
          return value.toLocaleDateString();
        }
        if (typeof value === "string") {
          return new Date(value).toLocaleDateString();
        }
        return value as React.ReactNode;
      },
    },
  ];

  return (
    <DataTable<UserAddress>
      columns={columns}
      data={data?.data || []}
      page={pageIndex + 1}
      rowsPerPage={pageSize}
      totalCount={data?.total || 0}
      onPageChange={(newPage) =>
        setPagination((prev) => ({
          ...prev,
          pageIndex: newPage - 1,
        }))
      }
      onRowsPerPageChange={(newPageSize) =>
        setPagination((prev) => ({
          ...prev,
          pageSize: newPageSize,
          pageIndex: 0,
        }))
      }
      renderActions={(address) => (
        <AddressActions address={address} user_id={user_id} />
      )}
    />
  );
};

export default AddressesList;

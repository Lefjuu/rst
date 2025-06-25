import { AddressPreviewProps } from "@/frontend/addresses/types";

export const AddressPreview = ({
  street,
  building_number,
  post_code,
  city,
  country_code,
}: AddressPreviewProps) => {
  return (
    <div className="bg-gray-100 p-3 rounded mt-4">
      <pre className="text-sm text-gray-800">
        {street} {building_number}
        {"\n"}
        {post_code} {city}
        {"\n"}
        {country_code}
      </pre>
    </div>
  );
};

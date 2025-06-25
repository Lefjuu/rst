import AddressesList from "@/frontend/addresses/components/AddressesList";
import { CreateAddressModal } from "@/frontend/addresses/components/modals/CreateAddressModal";

export default function AddressesPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <CreateAddressModal />
      </div>
      <AddressesList />
    </div>
  );
}

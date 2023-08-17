interface PaymentInformationProps {
  handleUserDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function DeliveryAddress({ handleUserDetailsChange }: PaymentInformationProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">DELIVERY ADDRESS</h1>
      <div className="flex flex-row">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="FIRST NAME"
          className="border p-2 w-full mb-4 mr-6"
          onChange={handleUserDetailsChange}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="LAST NAME"
          className="border p-2 w-full mb-4"
          onChange={handleUserDetailsChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="ADDRESS"
          className="border p-2 w-full mb-4"
          onChange={handleUserDetailsChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="CITY"
          className="border p-2 w-full mb-4"
          onChange={handleUserDetailsChange}
        />
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          name="country"
          id="country"
          placeholder="COUNTRY"
          className="border p-2 w-full mb-4 mr-6"
          onChange={handleUserDetailsChange}
        />
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          placeholder="ZIPCODE"
          className="border p-2 w-full mb-4"
          onChange={handleUserDetailsChange}
        />
      </div>
    </>
  )
}

export default DeliveryAddress

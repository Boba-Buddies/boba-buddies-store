interface PaymentInformationProps {
  handleUserDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function PaymentInformation({
  handleUserDetailsChange,
}: PaymentInformationProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mb-4">PAYMENT INFORMATION</h1>
      </div>
      <div>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="PHONE"
          className="border p-2 w-full mb-4"
          onChange={handleUserDetailsChange}
        />
      </div>
    </>
  )
}

export default PaymentInformation
